import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';import katex from 'katex';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const ctx={};vm.createContext(ctx);for(const file of ['curriculum.js','concepts.js','labs.js','state.js'])vm.runInContext(await read('docs/'+file),ctx,{filename:file});
const {CURRICULUM:C,CONCEPTS:G,LabMath:F,StudyState:S}=ctx;
assert.deepEqual(Array.from(C,l=>l.id),Array.from({length:18},(_,i)=>i+1));assert.equal(new Set(G.map(g=>g.slug)).size,G.length);
const slugs=new Set(G.map(g=>g.slug));let formulas=0,topics=0;
for(const g of G)for(const key of ['slug','title','en','category','definition','example','pitfall'])assert.ok(typeof g[key]==='string'&&g[key].length>0,`Missing ${key}: ${g.slug}`);
const url=u=>assert.equal(new URL(u).protocol,'https:');
for(const l of C){assert.ok(l.summary&&l.objectives.length>=3&&l.topics.length>=3);url(l.sourceUrl);url(l.videoUrl);assert.ok(l.durationSeconds>3000&&l.durationSeconds<6000);assert.ok(l.quiz.options.length===3&&l.quiz.answer>=0&&l.quiz.answer<3);assert.ok(l.quiz.explanation);for(const s of l.prereqs)assert.ok(slugs.has(s),s);for(const t of l.topics){topics++;assert.ok(t.title&&t.body.length>=3&&t.body.join('').length>=250);assert.ok(t.example&&t.pitfall&&t.exercise.question&&t.exercise.answer);for(const s of t.concepts)assert.ok(slugs.has(s),s);if(t.formula){assert.ok(!t.formula.expression.includes('\\\\'),'Double-escaped command');katex.renderToString(t.formula.expression,{throwOnError:true,strict:'error',trust:false});formulas++}}for(const x of l.further)url(x.url)}
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
close(F.softmax([0,0,0])[0],1/3);close(F.softmax([1000,1001,1002])[2],F.softmax([0,1,2])[2]);close(F.crossEntropy([0,0,0],1),Math.log(3));assert.throws(()=>F.softmax([1],0));
for(const text of ['aaaaa','a😀a😀','low low lower','中中文中中文']){const r=F.bpe(text,20);assert.equal(r.tokens.join(''),text);assert.ok(r.tokens.length<=Array.from(text).length);assert.equal(JSON.stringify(r),JSON.stringify(F.bpe(text,20)))}
const r=F.bpe('aaaaa',1);assert.equal(r.tokens.length,3);assert.equal(r.history[0].count,4);
for(let i=0;i<3;i++){const a=F.attention(i,true);close(a.weights.reduce((a,b)=>a+b,0),1);for(let j=i+1;j<3;j++)close(a.weights[j],0)}close(F.attention(0).output[0],2);close(F.attention(0).output[1],0);
assert.equal(F.kvBytes(24,1,8192,8,128,2),768*2**20);assert.equal(F.kvBytes(24,8,8192,8,128,2),6*2**30);
assert.equal(F.budget(1e9,20e9,true).total,16e9);assert.equal(F.budget(1e9,20e9,false).total,12e9);assert.equal(F.budget(1e9,20e9,true).flops,120e18);
assert.equal(F.roofline(100,2,10).bound,20);assert.equal(F.roofline(100,2,100).bound,100);assert.equal(F.roofline(100,2,10).balance,50);
assert.equal(JSON.stringify(S.validate(S.empty())),JSON.stringify(S.empty()));assert.throws(()=>S.validate({}));assert.throws(()=>S.validate({...S.empty(),done:[19]}));assert.throws(()=>S.validate({...S.empty(),notes:{1:'a'.repeat(20001)}}));assert.throws(()=>S.validate({...S.empty(),quiz:{1:4}}));assert.throws(()=>S.validate(JSON.parse('{"version":1,"done":[],"bookmarks":[],"notes":{"__proto__":"bad"},"quiz":{}}')));
assert.equal(S.validate({...S.empty(),notes:{1:'<script>alert(1)</script>'}}).notes[1],'<script>alert(1)</script>');
const source=JSON.parse(await read('content/course.json'));assert.equal(JSON.stringify(C),JSON.stringify(source.lectures));assert.equal(JSON.stringify(G),JSON.stringify(JSON.parse(await read('content/concepts.json'))));
console.log(`PASS: ${C.length} lectures, ${topics} topics, ${G.length} resolved concepts, ${formulas} strict KaTeX formulas; numerical labs and progress import invariants.`);

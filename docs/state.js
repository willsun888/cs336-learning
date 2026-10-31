(function(root){
const empty=()=>({version:1,done:[],bookmarks:[],notes:{},quiz:{},last:1});
function validate(value){
 if(!value||value.version!==1||!Array.isArray(value.done)||!Array.isArray(value.bookmarks)||typeof value.notes!=='object'||!value.notes||typeof value.quiz!=='object'||!value.quiz)throw Error('这不是有效的学习记录文件。');
 const validId=n=>Number.isInteger(n)&&n>=1&&n<=18,ids=a=>{if(a.some(x=>!validId(x)))throw Error('课程编号不正确。');return [...new Set(a)]};
 const out=empty();out.done=ids(value.done);out.bookmarks=ids(value.bookmarks);
 for(const [key,note] of Object.entries(value.notes)){if(!validId(Number(key))||typeof note!=='string'||note.length>20000)throw Error('笔记格式或长度不正确。');out.notes[String(Number(key))]=note}
 for(const [key,answer] of Object.entries(value.quiz)){if(!validId(Number(key))||!Number.isInteger(answer)||answer<0||answer>2)throw Error('自测记录格式不正确。');out.quiz[String(Number(key))]=answer}
 if(validId(value.last))out.last=value.last;return out;
}
root.StudyState={empty,validate};
})(globalThis);

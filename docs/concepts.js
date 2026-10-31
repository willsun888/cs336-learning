// Supplemental explanations authored for this learning guide.
globalThis.CONCEPTS = [
  {
    "slug": "tokenization",
    "title": "分词",
    "en": "Tokenization",
    "category": "模型基础",
    "definition": "把文本编码成离散 token ID 序列。token 可以是字节、字符或常见子串，不必对应完整单词。词表和切分规则共同决定序列长度；模型学习的是 ID 对应的向量，而不是直接读取字符串。",
    "example": "同一句中文在不同 tokenizer 下 token 数可能不同，因此上下文长度和按 token 计费都依赖分词器。",
    "pitfall": "不能把一个 token 固定理解成一个汉字或一个英文单词。"
  },
  {
    "slug": "bpe",
    "title": "字节对编码",
    "en": "Byte Pair Encoding",
    "category": "模型基础",
    "definition": "BPE 从初始符号集合开始，反复统计相邻符号对，合并最常见的一对并记录顺序。训练得到词表与合并规则，编码新文本时按规则应用。现代 byte-level 实现通常还包含预分词与特殊 token。",
    "example": "在 low low lower 中，l 与 o 的多次相邻可能促使它们合并为 lo。",
    "pitfall": "训练合并规则与对新文本编码是两件事，不能每来一个请求就重新统计词表。"
  },
  {
    "slug": "unicode",
    "title": "Unicode 与字节",
    "en": "Unicode / UTF-8",
    "category": "模型基础",
    "definition": "Unicode 为字符分配码点，UTF-8 把码点编码为字节。字符、码点、字节和可见字形不是同一个单位。字节级分词可以用固定的 256 个基础字节表示有效 UTF-8 文本。",
    "example": "一个常用汉字在 UTF-8 中通常占 3 字节，但不代表恰好是 3 个模型 token。",
    "pitfall": "字符串长度在不同语言中可能按码点或编码单元计算。"
  },
  {
    "slug": "autoregressive-model",
    "title": "自回归语言模型",
    "en": "Autoregressive LM",
    "category": "模型基础",
    "definition": "按顺序预测下一个 token，将序列概率分解为一系列条件概率的乘积。训练时可借助因果掩码并行计算各位置损失，生成时通常需要逐 token 反馈先前输出。",
    "example": "已知“今天的天气”，模型预测下一个 token，再把生成结果接回上下文。",
    "pitfall": "训练能并行处理序列位置，不代表普通自回归生成可以一次并行生成所有未来 token。"
  },
  {
    "slug": "tensor",
    "title": "张量与形状",
    "en": "Tensor / Shape",
    "category": "数学地基",
    "definition": "张量是带有形状、类型和存储布局的多维数组。维度的含义通常由程序约定，例如 batch、序列长度、隐藏维度。理解运算先写出输入输出形状，可避免广播与转置造成的静默错误。",
    "example": "形状 [B,T,D] 可表示 B 条序列、每条 T 个 token、每个 D 维表示。",
    "pitfall": "维度大小相同不意味着语义相同；把 batch 轴当序列轴也可能让代码运行。"
  },
  {
    "slug": "matrix-multiplication",
    "title": "矩阵乘法",
    "en": "Matrix Multiplication",
    "category": "数学地基",
    "definition": "矩阵乘积按行与列做内积。[m,k] 乘 [k,n] 得到 [m,n]，共享维度 k 被求和消去。密集乘法通常约需 2mkn FLOPs；矩阵大小和数据复用决定 GPU 利用率。",
    "example": "[32,128] × [128,64] → [32,64]，约 524,288 FLOPs。",
    "pitfall": "逐元素乘法与矩阵乘法不同；估算时要声明乘加按 2 FLOPs 计。"
  },
  {
    "slug": "softmax",
    "title": "Softmax 概率归一化",
    "en": "Softmax",
    "category": "数学地基",
    "definition": "对一组分数取指数并归一化，得到非负且和为 1 的概率。减去同一个常数不改变结果，因此常减最大值以避免溢出。温度控制分布尖锐程度，但不能增加模型已经学到的信息。",
    "example": "[0,0,0] 对应均匀概率 [1/3,1/3,1/3]。",
    "pitfall": "softmax 的归一化轴必须正确：注意力通常对可访问的 key 位置归一化。"
  },
  {
    "slug": "cross-entropy",
    "title": "交叉熵",
    "en": "Cross Entropy",
    "category": "数学地基",
    "definition": "衡量预测分布对目标分布的平均负对数似然。目标为 one-hot 时，单个位置的损失就是正确 token 概率的负对数。模型通过提高真实续文的概率来降低损失。",
    "example": "正确 token 概率为 0.5 时，−ln(0.5)≈0.693 nats。",
    "pitfall": "损失下降不必然意味着所有任务能力都提高；要结合数据分布与任务评测。"
  },
  {
    "slug": "perplexity",
    "title": "困惑度",
    "en": "Perplexity",
    "category": "数学地基",
    "definition": "使用自然对数时，困惑度是每 token 平均交叉熵的指数。可直观理解为模型面对的不确定程度，但比较必须使用相同测试分布、分词方式和损失口径。",
    "example": "平均损失 ln 4 对应困惑度 4。",
    "pitfall": "不同 tokenizer 下每 token 的信息量不同，困惑度不能直接横向比较。"
  },
  {
    "slug": "gradient",
    "title": "梯度与反向传播",
    "en": "Gradient / Backpropagation",
    "category": "数学地基",
    "definition": "梯度描述损失对各参数的局部变化率。反向传播利用链式法则沿计算图复用中间结果，高效求出这些梯度；优化器再依据梯度更新参数。这两个步骤在概念上分开。",
    "example": "对 L=(w−3)²，梯度是 2(w−3)，小步沿负梯度方向会靠近 3。",
    "pitfall": "梯度累积需要正确缩放损失与清零；多做几次 backward 不会自动等同正确的大 batch。"
  },
  {
    "slug": "optimizer",
    "title": "优化器",
    "en": "Optimizer / AdamW",
    "category": "训练对齐",
    "definition": "优化器根据梯度与历史状态更新参数。Adam 保存一阶、二阶矩估计，AdamW 将权重衰减与梯度自适应缩放解耦。优化器状态会显著增加训练内存。",
    "example": "十亿参数若各存两个 FP32 状态，仅状态就需要约 8 GB 十进制容量。",
    "pitfall": "不同精度配置和实现的字节数不同，不能把固定的“每参数内存”当普遍规律。"
  },
  {
    "slug": "learning-rate",
    "title": "学习率",
    "en": "Learning Rate",
    "category": "训练对齐",
    "definition": "学习率控制每次更新的步长尺度。其有效大小依赖优化器、参数化、batch 与调度。过大可能不稳定，过小可能在预算内收敛不足，通常需要受控小实验选择。",
    "example": "一次只调整学习率，固定数据和 token 预算，比较验证损失轨迹。",
    "pitfall": "单步损失波动不等于失败；不同预算下最优学习率也不一定相同。"
  },
  {
    "slug": "learning-rate-schedule",
    "title": "学习率调度",
    "en": "Learning Rate Schedule",
    "category": "训练对齐",
    "definition": "训练过程中按步数或 token 数改变学习率。预热帮助早期稳定，后期衰减促使参数收敛。比较实验要统一调度长度，否则截断长训练与完整短训练不可直接对比。",
    "example": "一个简化方案先用前 1% token 预热，再按余弦曲线下降。",
    "pitfall": "1% 只是示例；调度应随模型、数据与预算验证。"
  },
  {
    "slug": "initialization",
    "title": "参数初始化",
    "en": "Initialization",
    "category": "训练对齐",
    "definition": "训练开始前设置参数分布与尺度，使信号和梯度通过网络时保持合适量级。深度、宽度、残差结构与归一化都会影响初始化选择。它与参数化、学习率联合决定稳定性。",
    "example": "线性层常根据输入宽度缩放随机权重，避免输出方差随宽度无控制增长。",
    "pitfall": "所有参数设为同一个值可能使不同单元无法打破对称性。"
  },
  {
    "slug": "embedding",
    "title": "嵌入向量",
    "en": "Embedding",
    "category": "模型基础",
    "definition": "把离散 token ID 映射成可训练的连续向量，相当于查一张词表大小乘隐藏维度的参数表。经过多层模型后，表示会结合上下文，不再只是静态词表行。",
    "example": "词表 32,000、维度 1,024 的嵌入表有 32,768,000 个参数。",
    "pitfall": "向量某一维通常没有固定可读语义；也不能把相似向量直接等同事实相同。"
  },
  {
    "slug": "attention",
    "title": "注意力机制",
    "en": "Scaled Dot-Product Attention",
    "category": "模型基础",
    "definition": "用 query 与各 key 的相似度得到权重，再加权汇总 value。标准缩放点积注意力除以 √d，因果模型屏蔽未来位置。Q、K、V 是表示的可训练投影。",
    "example": "一个位置可以按 0.2、0.8 的权重读取两个历史位置的 value。",
    "pitfall": "注意力权重是内部计算系数，不是可靠的因果解释或事实置信度。"
  },
  {
    "slug": "causal-mask",
    "title": "因果掩码",
    "en": "Causal Mask",
    "category": "模型基础",
    "definition": "限制某个位置只能读取自身与更早位置的信息。训练时所有位置可同时计算，但未来 key 的分数被屏蔽；这样训练目标不会看到它应预测的答案。",
    "example": "位置 3 可看位置 1–3，不能看位置 4。",
    "pitfall": "标签需要正确右移；只加掩码但标签对齐错误仍可能泄漏目标。"
  },
  {
    "slug": "transformer",
    "title": "Transformer 块",
    "en": "Transformer Block",
    "category": "模型基础",
    "definition": "通常由注意力、逐位置前馈网络、归一化与残差连接构成。注意力在位置间交换信息，前馈层对每个位置的特征做非线性变换，堆叠多层形成上下文表示。",
    "example": "输入 [B,T,D]，标准块输出仍为 [B,T,D]，内部前馈维度常更宽。",
    "pitfall": "不同架构的归一化位置、位置编码和前馈激活可能不同。"
  },
  {
    "slug": "rmsnorm",
    "title": "均方根归一化",
    "en": "RMSNorm",
    "category": "模型基础",
    "definition": "按特征向量的均方根缩放，再施加可学习尺度；通常不执行 LayerNorm 的均值中心化。它帮助控制特征幅度，具体稳定性仍受模型结构与训练配置影响。",
    "example": "除以 sqrt(mean(x²)+ε) 后，再逐维乘可训练权重。",
    "pitfall": "RMSNorm 不是将每个 token 向量变成概率，也不保证其均值为零。"
  },
  {
    "slug": "rope",
    "title": "旋转位置编码",
    "en": "Rotary Position Embedding",
    "category": "模型基础",
    "definition": "按位置对 query/key 的成对维度进行旋转，使点积带有相对位置信息。模型因此可以区分顺序。超出训练长度时的行为还取决于频率设置、扩展方式与训练。",
    "example": "相隔相同距离的位置之间，旋转相位差具有相应关系。",
    "pitfall": "能在更长张量上运行不代表长距离检索质量自然保持。"
  },
  {
    "slug": "swiglu",
    "title": "门控前馈层",
    "en": "SwiGLU",
    "category": "模型基础",
    "definition": "用一个带 SiLU 激活的投影作为门控，与另一投影逐元素相乘，再映射回隐藏维度。它改变前馈层的表达能力与参数计算，因此比较需匹配总参数或 FLOPs。",
    "example": "门控分支和内容分支的输出形状必须一致，才能逐元素相乘。",
    "pitfall": "多一个投影会改变参数量；不能只比较相同的中间宽度。"
  },
  {
    "slug": "grouped-query-attention",
    "title": "分组查询注意力",
    "en": "Grouped-Query Attention",
    "category": "模型基础",
    "definition": "多个 query 头共享较少的 key/value 头。在保留多查询表示的同时减少 KV 缓存和读取量。MHA 各头独立 KV，MQA 只有一组 KV，GQA 位于两者之间。",
    "example": "32 个 query 头、8 个 KV 头表示每 4 个 query 头共享一组 KV。",
    "pitfall": "缓存估算使用 KV 头数，不能误用 query 头数。"
  },
  {
    "slug": "mixture-of-experts",
    "title": "混合专家",
    "en": "Mixture of Experts",
    "category": "模型基础",
    "definition": "通过路由器为每个 token 选择部分专家网络计算，使总参数容量大于每 token 激活参数。收益伴随负载均衡、跨设备通信与路由稳定性等成本。",
    "example": "有 8 个专家、每 token 选 2 个时，专家部分通常只激活部分参数。",
    "pitfall": "总参数少算不代表总内存少占；所有专家仍需存储或调度。"
  },
  {
    "slug": "state-space-model",
    "title": "状态空间模型",
    "en": "State Space Model",
    "category": "模型基础",
    "definition": "用递推状态压缩历史信息，状态随输入更新并产生输出。相比保存全部历史 KV，状态大小可以固定；代价是历史信息需要通过有限状态传递。现代变体可使用输入依赖的更新。",
    "example": "hₜ=A hₜ₋₁+B xₜ 是最简单的线性递推形式。",
    "pitfall": "线性例子不能概括所有选择性状态空间架构，也不保证任何任务都优于注意力。"
  },
  {
    "slug": "linear-attention",
    "title": "线性注意力",
    "en": "Linear Attention",
    "category": "模型基础",
    "definition": "利用特征映射或其他重写方式，避免显式形成完整的 T×T 注意力矩阵，有些形式可递推维护状态。通常改变了标准 softmax 注意力的表达与数值特性。",
    "example": "把部分历史统计量聚合成固定形状状态，生成时逐步更新。",
    "pitfall": "线性复杂度描述的是特定维度下的增长率，不代表任意长度都更快或质量等价。"
  },
  {
    "slug": "flops",
    "title": "计算量与计算速度",
    "en": "FLOPs / FLOP/s",
    "category": "系统工程",
    "definition": "FLOPs 表示浮点运算次数；FLOP/s 表示每秒可完成的运算量。估算训练成本要声明乘加口径、数值精度与包含的算子，硬件峰值只是速度上界。",
    "example": "2×10¹⁵ FLOPs 的任务在有效 10¹⁴ FLOP/s 下，理想计算时间为 20 秒。",
    "pitfall": "峰值算力不等于有效训练吞吐，通信与访存还会消耗时间。"
  },
  {
    "slug": "compute-budget",
    "title": "计算预算",
    "en": "Compute Budget",
    "category": "系统工程",
    "definition": "固定预算通常以训练 FLOPs、GPU 时间或金额衡量。把预算转换为可执行计划时，需要考虑模型规模、token 数、有效算力以及试验失败与评估开销。",
    "example": "稠密 Transformer 粗估训练计算为 6ND，但长上下文注意力开销可能不可忽略。",
    "pitfall": "GPU 小时不是跨硬件、跨精度通用的计算量单位。"
  },
  {
    "slug": "mixed-precision",
    "title": "混合精度",
    "en": "Mixed Precision",
    "category": "系统工程",
    "definition": "在权重、激活、累积、梯度与优化器状态上采用不同精度，在速度、内存与数值稳定之间取舍。BF16 指数范围接近 FP32，但有效精度更低。",
    "example": "矩阵乘输入用低精度，部分累积或优化器状态用 FP32。",
    "pitfall": "“使用 BF16”不意味着所有张量都只有 2 字节。"
  },
  {
    "slug": "roofline",
    "title": "Roofline 性能模型",
    "en": "Roofline Model",
    "category": "系统工程",
    "definition": "用计算峰值与内存带宽共同估算算子吞吐上界：min(峰值算力，带宽×算术强度)。它帮助识别优化应提高数据复用还是提高计算利用率。",
    "example": "100 TFLOP/s、2 TB/s 的设备，转折点为 50 FLOP/byte。",
    "pitfall": "这是上界模型，不包含所有启动、同步、占用率与访问不连续的影响。"
  },
  {
    "slug": "flash-attention",
    "title": "FlashAttention",
    "en": "IO-Aware Attention",
    "category": "系统工程",
    "definition": "通过分块与在线 softmax，把注意力计算组织为更少的高带宽内存读写，避免把完整注意力矩阵写回显存。通常保留标准注意力的数学形式，但数值舍入可能有差异。",
    "example": "长序列时 T×T 中间矩阵很大，分块计算可显著降低中间存储。",
    "pitfall": "FlashAttention 不把密集注意力的算术复杂度普遍降为线性。"
  },
  {
    "slug": "triton",
    "title": "Triton 内核语言",
    "en": "Triton",
    "category": "系统工程",
    "definition": "用接近 Python 的表示编写 GPU 块级程序。开发者需要设计数据分块、访存、掩码与并行布局；编译器负责部分底层映射。正确性验证与性能测试缺一不可。",
    "example": "处理长度非块大小整数倍的向量时，边缘块需显式掩码。",
    "pitfall": "写成 Triton 不自动更快；输入规模与硬件会改变最佳配置。"
  },
  {
    "slug": "data-parallelism",
    "title": "数据并行",
    "en": "Data Parallelism",
    "category": "系统工程",
    "definition": "各设备维护模型副本，处理不同数据，并同步梯度，使更新对应组合 batch。它主要扩展数据吞吐，单个完整模型仍需能在每个副本上运行，除非进一步分片。",
    "example": "4 张卡各处理 8 条样本，一次同步更新的全局 batch 为 32。",
    "pitfall": "不同 rank 梯度平均和 loss 缩放必须与单设备参考语义对齐。"
  },
  {
    "slug": "all-reduce",
    "title": "集合通信",
    "en": "All-Reduce / Collectives",
    "category": "系统工程",
    "definition": "All-reduce 将多个设备的数据按指定操作归约，并把结果送回所有参与者。分布式训练常用它同步梯度；reduce-scatter 与 all-gather 则配合分片存储。",
    "example": "各卡梯度求和后再按数据量正确归一化，可构成全局梯度。",
    "pitfall": "所有参与者必须按兼容顺序调用，错序可能挂起；通信与计算重叠也需依赖正确。"
  },
  {
    "slug": "zero",
    "title": "优化器与参数分片",
    "en": "ZeRO / FSDP",
    "category": "系统工程",
    "definition": "把优化器状态、梯度或参数分散到不同设备，减少每卡冗余。更深分片通常节省更多常驻内存，同时增加聚合参数与通信管理的复杂度。",
    "example": "参数在层计算前临时聚合，计算后释放，可降低每卡长期持有量。",
    "pitfall": "分片后的理论平均内存不等于运行峰值，还存在聚合与预取缓冲。"
  },
  {
    "slug": "tensor-parallelism",
    "title": "张量并行",
    "en": "Tensor Parallelism",
    "category": "系统工程",
    "definition": "把单层的大矩阵运算沿特定维度切到多设备，联合生成该层输出。它让单层也能跨卡，但通常要求频繁通信，因此对互联带宽和拓扑敏感。",
    "example": "把线性层输出列分给各卡，再按后续层的需求聚合或归约。",
    "pitfall": "任意切分矩阵并不能保持相同计算；需要跟踪张量形状与通信语义。"
  },
  {
    "slug": "pipeline-parallelism",
    "title": "流水线并行",
    "en": "Pipeline Parallelism",
    "category": "系统工程",
    "definition": "把不同模型层放在不同设备，分成微批依次穿过各阶段，以并行执行不同微批的计算。启动与排空造成空泡，调度还影响激活内存。",
    "example": "4 个阶段若只有 1 个微批，许多设备会等待；增加微批可提高利用率。",
    "pitfall": "微批越多不总越快，小矩阵效率与通信也会变化。"
  },
  {
    "slug": "activation-checkpointing",
    "title": "激活重计算",
    "en": "Activation Checkpointing",
    "category": "系统工程",
    "definition": "训练时仅保存部分中间激活，反向传播需要其他激活时重新执行前向。它用额外计算换显存，使更大 batch 或更长序列可行。",
    "example": "对每个块保存输入，反向时重算该块内部结果。",
    "pitfall": "这是训练计算图的内存策略，与保存模型到磁盘的 checkpoint 不同。"
  },
  {
    "slug": "scaling-laws",
    "title": "规模规律",
    "en": "Scaling Laws",
    "category": "训练对齐",
    "definition": "用经验函数描述损失如何随模型参数、训练数据与计算预算变化。可用于在有限预算下做选型，但拟合只在观测范围及相近设置中具有依据。",
    "example": "训练几组小模型后拟合趋势，预测更大预算下参数与 token 的分配。",
    "pitfall": "经验幂律不是自然定律；数据、架构、调度变化会改变拟合关系。"
  },
  {
    "slug": "power-law",
    "title": "幂律",
    "en": "Power Law",
    "category": "数学地基",
    "definition": "变量按另一个变量的固定幂次缩放，例如误差项 A/N^α。在双对数坐标下纯幂律呈直线，但多个误差项与不可约下限会使实际曲线弯曲。",
    "example": "N 翻倍时 A/N^α 缩小为原来的 2^−α。",
    "pitfall": "不能对含常数下限的总损失直接假定 log-log 全程线性。"
  },
  {
    "slug": "compute-optimal",
    "title": "计算最优配比",
    "en": "Compute-Optimal Scaling",
    "category": "训练对齐",
    "definition": "在固定训练计算预算下，选择模型规模和训练 token 数，使目标损失尽可能低。加入推理成本、延迟或内存约束后，最优点可能发生变化。",
    "example": "同样 FLOPs，可训练更大的模型较少 token，也可训练较小模型更多 token。",
    "pitfall": "训练计算最优不等于服务生命周期成本最优。"
  },
  {
    "slug": "isoflops",
    "title": "等计算量实验",
    "en": "IsoFLOPs",
    "category": "训练对齐",
    "definition": "在相同计算量预算下比较多组参数量与数据量组合，寻找损失最低的点。多条预算曲线的最优点帮助拟合规模分配规律。",
    "example": "按 6ND 粗估，让 N 增加一倍、D 减半，训练计算量大致保持。",
    "pitfall": "不同实验仍需对齐数据与训练调度，否则比较混入其他变量。"
  },
  {
    "slug": "data-repetition",
    "title": "数据重复训练",
    "en": "Data Repetition",
    "category": "训练对齐",
    "definition": "当高质量独立样本有限时，会多轮使用同一数据。重复 token 的收益与新 token 不完全相同，受模型容量、重复次数、数据质量和过拟合影响。",
    "example": "一亿独立 token 训练四轮得到四亿处理 token，不等于四亿独立 token。",
    "pitfall": "报告数据规模要区分独立语料量与实际训练处理量。"
  },
  {
    "slug": "critical-batch-size",
    "title": "临界批量",
    "en": "Critical Batch Size",
    "category": "训练对齐",
    "definition": "增大 batch 最初可减少并行训练步数，但超过某一区间后，新增样本带来的步数收益逐渐减弱。有效临界点依赖训练阶段、优化器与噪声结构。",
    "example": "把 batch 翻倍而达到相同损失所需步数几乎不减时，总 token 消耗可能上升。",
    "pitfall": "不是所有模型共享一个固定最佳 batch。"
  },
  {
    "slug": "experiment-design",
    "title": "受控实验",
    "en": "Experiment Design",
    "category": "训练对齐",
    "definition": "明确要检验的假设，控制非目标变量，记录数据、随机种子、预算和配置，并用重复或不确定性分析支持结论。训练曲线、最终损失与资源成本应联合比较。",
    "example": "比较两种架构时同时报告匹配参数量和匹配计算预算的结果。",
    "pitfall": "一次最佳运行可能只是随机波动或选择偏差。"
  },
  {
    "slug": "throughput",
    "title": "吞吐与延迟",
    "en": "Throughput / Latency",
    "category": "系统工程",
    "definition": "吞吐衡量单位时间完成的工作，延迟衡量单个请求等待多久。提高并发可能提高总 token/s，同时增加排队和尾部延迟，需要按服务目标取舍。",
    "example": "同一服务可能总吞吐很高，但 p99 首 token 等待仍超出要求。",
    "pitfall": "总吞吐、单用户输出速度和请求成功数不能混为一个指标。"
  },
  {
    "slug": "lifetime-cost",
    "title": "模型全生命周期成本",
    "en": "Lifetime Cost",
    "category": "系统工程",
    "definition": "综合训练、部署、推理调用、存储与运维成本。用户量大时，推理成本可能超过一次训练成本，从而使较小、训练更久的模型具有优势。",
    "example": "多花训练成本换更低每次请求开销，能否划算取决于未来总调用量。",
    "pitfall": "仅按模型训练一次的成本决定部署选型会忽略长期负担。"
  },
  {
    "slug": "prefill-decode",
    "title": "预填充与解码",
    "en": "Prefill / Decode",
    "category": "系统工程",
    "definition": "Prefill 并行处理已有输入并建立各层 KV；decode 逐步生成新 token，复用历史 KV。两阶段计算规模与访存形态不同，服务系统可采取不同调度或设备配置。",
    "example": "长提示、短输出主要压 prefill；短提示、长输出更多消耗 decode 时间。",
    "pitfall": "二者的瓶颈不是绝对固定，还受 batch、长度和硬件影响。"
  },
  {
    "slug": "kv-cache",
    "title": "键值缓存",
    "en": "KV Cache",
    "category": "系统工程",
    "definition": "自回归推理时保存每层历史 token 的 key/value，避免每一步重复计算这些投影。每个新 token 的 query 读取历史 KV，缓存随序列长度与并发增长。",
    "example": "缓存大小粗估为 2×层数×并发×长度×KV 头数×头维度×字节数。",
    "pitfall": "缓存不是模型知识库；删除缓存不会改变模型权重，但需要重新处理上下文。"
  },
  {
    "slug": "paged-attention",
    "title": "分页 KV 管理",
    "en": "PagedAttention",
    "category": "系统工程",
    "definition": "把逻辑连续的 KV 序列映射到可分散分配的固定大小物理块，并让注意力内核按映射读取。它缓解预留与碎片问题，也支持按规则共享前缀块。",
    "example": "长度不同的请求按需增长缓存页，避免为每条序列预留最大长度。",
    "pitfall": "分页节约管理浪费，不让任意长上下文的实际 KV 数据消失。"
  },
  {
    "slug": "quantization",
    "title": "量化",
    "en": "Quantization",
    "category": "系统工程",
    "definition": "以较低位宽表示权重、激活或缓存，通常配合缩放因子和分组。它降低数据量，但引入误差与解量化成本，需验证任务质量和目标硬件支持。",
    "example": "8-bit 权重本体约为 BF16 的一半字节，另有缩放参数开销。",
    "pitfall": "低位宽不保证更快；内核与硬件不匹配可能反而减速。"
  },
  {
    "slug": "distillation",
    "title": "知识蒸馏",
    "en": "Distillation",
    "category": "训练对齐",
    "definition": "用教师模型的输出、概率分布或中间信号训练学生模型，使较小模型学到有用行为。收益依赖教师质量、数据覆盖与训练目标。",
    "example": "教师生成解题过程，经检查后作为学生的监督训练样本。",
    "pitfall": "学生不会自动继承教师所有能力，教师错误也可能被复制。"
  },
  {
    "slug": "pruning",
    "title": "剪枝",
    "en": "Pruning",
    "category": "系统工程",
    "definition": "删除或屏蔽部分权重、通道、头或层，减少模型有效规模。结构化剪枝更容易映射为常规硬件加速，非结构稀疏则依赖专用支持。",
    "example": "移除整个前馈通道可以减少矩阵的维度。",
    "pitfall": "零权重更多不必然意味着密集矩阵内核更快。"
  },
  {
    "slug": "speculative-decoding",
    "title": "推测解码",
    "en": "Speculative Decoding",
    "category": "系统工程",
    "definition": "由较快的草稿模型提出多个 token，再由目标模型批量验证，并在拒绝时用正确修正分布采样。满足算法条件时可保持目标采样分布，同时减少串行验证轮次。",
    "example": "草稿提出 4 个 token，目标一次计算验证其条件概率。",
    "pitfall": "简单接受目标概率更高的 token 不是正确的分布保持算法。"
  },
  {
    "slug": "rejection-sampling",
    "title": "拒绝采样",
    "en": "Rejection Sampling",
    "category": "数学地基",
    "definition": "从易采样的提议分布产生候选，按接受概率保留，并按算法处理拒绝，最终得到目标分布。推测解码使用相关概率比与修正机制。",
    "example": "提议模型 q 与目标模型 p 的概率差决定接受概率。",
    "pitfall": "不能只按排名是否一致决定接受并声称保留了原采样分布。"
  },
  {
    "slug": "evaluation",
    "title": "模型评估",
    "en": "Evaluation",
    "category": "数据评估",
    "definition": "用明确任务、数据划分、推理设置和评分规则检验模型能力。既看平均成绩，也看任务分组、成本、稳定性与失败案例，并保留配置以便复现。",
    "example": "同一模型使用不同提示和工具预算，结果可能显著不同。",
    "pitfall": "一个排行榜总分不能完整代表你的线上业务效果。"
  },
  {
    "slug": "confidence-interval",
    "title": "置信区间",
    "en": "Confidence Interval",
    "category": "数学地基",
    "definition": "按某种统计方法构造的区间，在重复采样下以规定频率覆盖真实参数。它表达有限样本带来的估计不确定性；还需满足样本独立等方法假设。",
    "example": "100 道题的准确率波动通常大于 10,000 道题；可用合适的二项区间或 bootstrap。",
    "pitfall": "95% 置信区间不直接表示这次固定区间有 95% 概率含真值，也不消除数据偏差。"
  },
  {
    "slug": "llm-as-judge",
    "title": "模型裁判",
    "en": "LLM-as-a-Judge",
    "category": "数据评估",
    "definition": "让另一个模型按照评分标准评价输出，适用于难以规则判定的开放任务。需校准与人类判断的一致性，并检测位置、长度、风格与模型偏好偏差。",
    "example": "交换两个答案的位置再评分，可检查位置偏差。",
    "pitfall": "裁判给出的分数不是事实本身，尤其不能跳过业务验证集。"
  },
  {
    "slug": "preference-data",
    "title": "偏好数据",
    "en": "Preference Data",
    "category": "训练对齐",
    "definition": "记录同一提示下两个或多个回答的相对偏好，可用于奖励模型或直接偏好优化。偏好依赖标注者、规则和场景，可能与事实正确性不完全一致。",
    "example": "同一问题的一对回答被标为 chosen 和 rejected。",
    "pitfall": "更流畅、更长或更礼貌不必然更正确。"
  },
  {
    "slug": "agent-scaffold",
    "title": "智能体执行框架",
    "en": "Agent Scaffold",
    "category": "数据评估",
    "definition": "模型外部负责工具调用、记忆、上下文构造、重试和停止规则的运行流程。它会明显影响任务成功率，评测时应与模型版本一起记录。",
    "example": "同一模型获得代码执行器与多次修复机会后，编程题成绩可能提高。",
    "pitfall": "不能把框架、工具和预算变化造成的提升全部归为模型能力提升。"
  },
  {
    "slug": "benchmark-contamination",
    "title": "测试污染",
    "en": "Benchmark Contamination",
    "category": "数据评估",
    "definition": "测试题、答案或高度相近材料进入训练数据，使评测可能测到记忆而非泛化。需做去污染检查、保留数据来源，并用更新或隔离的测试集补充。",
    "example": "网页语料中可能包含公开 benchmark 的题目和解析。",
    "pitfall": "字符串不完全一致也可能泄漏，改写或答案讨论仍会污染。"
  },
  {
    "slug": "data-provenance",
    "title": "数据来源链",
    "en": "Data Provenance",
    "category": "数据评估",
    "definition": "记录数据来自哪里、何时获取、经过哪些过滤与转换、许可和版本是什么。它支撑复现、质量定位、去重与合规判断，类似数据流水线的可追踪血缘。",
    "example": "为每个样本保留来源域、抓取批次、处理版本与过滤标签。",
    "pitfall": "仅知道数据集名称不足以重建精确训练输入。"
  },
  {
    "slug": "common-crawl",
    "title": "网页爬取语料",
    "en": "Common Crawl",
    "category": "数据评估",
    "definition": "公开的大规模网页抓取档案，是许多预训练流水线的上游来源。它包含异质页面与噪声，需要抽取正文、识别语言、过滤、去重并审查使用条件。",
    "example": "从网页归档中抽取正文，再剔除导航模板与重复内容。",
    "pitfall": "可公开访问不等于内容都高质量或都具有相同再利用许可。"
  },
  {
    "slug": "license",
    "title": "数据许可",
    "en": "Data License",
    "category": "数据评估",
    "definition": "规定材料可如何使用、再分发和修改的条件。采集、训练、发布数据与发布模型可能涉及不同义务，应记录各来源的许可和适用约束。",
    "example": "来源网页、整理后的数据集和代码仓库可能分别采用不同许可。",
    "pitfall": "不能因文件能下载，就推断可任意再发布全文。"
  },
  {
    "slug": "data-mixture",
    "title": "训练数据配比",
    "en": "Data Mixture",
    "category": "数据评估",
    "definition": "为不同领域或来源分配采样权重，决定训练实际看到的数据分布。配比会影响能力侧重，需与去重、质量和重复次数联合考虑。",
    "example": "代码只占原始语料 5%，但采样占比可以设为 15%，这会增加重复。",
    "pitfall": "数据量占比与训练采样占比不是同一个数。"
  },
  {
    "slug": "data-filtering",
    "title": "数据过滤",
    "en": "Data Filtering",
    "category": "数据评估",
    "definition": "用规则或模型排除噪声、乱码、低信息与不适合目标的数据。每个过滤器都在改变分布，应评估误杀、召回和下游效果，而不是只看保留率。",
    "example": "删除导航文本后，正文质量可能提高；激进语言过滤也可能误删多语言材料。",
    "pitfall": "低语言模型困惑度不一定等于高知识价值，也可能只是模板重复。"
  },
  {
    "slug": "deduplication",
    "title": "精确与近似去重",
    "en": "Deduplication",
    "category": "数据评估",
    "definition": "识别完全相同或高度相似的样本，减少重复权重、评测泄漏和存储浪费。不同粒度的去重会影响数据覆盖，应保存可解释的聚类与代表项策略。",
    "example": "文档 hash 能做精确去重；近似改写通常需要分片相似度等方法。",
    "pitfall": "去重阈值越严格不一定越好，可能误删有意义的版本差异。"
  },
  {
    "slug": "jaccard",
    "title": "Jaccard 相似度",
    "en": "Jaccard Similarity",
    "category": "数学地基",
    "definition": "两个集合交集大小除以并集大小。文本可先切成字符或词的 n-gram 集合，再计算重叠，用于近似重复检测。集合表示通常不保留词序与重复频次的全部信息。",
    "example": "A={a,b,c}、B={b,c,d}，Jaccard=2/4=0.5。",
    "pitfall": "不同 n-gram 粒度和预处理会显著影响数值。"
  },
  {
    "slug": "minhash",
    "title": "最小哈希签名",
    "en": "MinHash",
    "category": "数据评估",
    "definition": "用一组随机化哈希产生较短签名，估计集合 Jaccard 相似度。理想随机排列下，两个集合最小元素相同的概率等于 Jaccard；多次重复降低估计方差。",
    "example": "用 128 个签名分量近似表示大文档的 n-gram 集合。",
    "pitfall": "有限签名有误差，不能把相同率当精确真实相似度。"
  },
  {
    "slug": "lsh",
    "title": "局部敏感哈希",
    "en": "Locality-Sensitive Hashing",
    "category": "数据评估",
    "definition": "通过构造哈希桶，让相似对象更可能成为同桶候选，减少近似相似搜索的成对比较量。MinHash banding 是集合去重中的常见方式，候选还需进一步验证。",
    "example": "把签名分为多段，任一段相同则生成候选文档对。",
    "pitfall": "候选召回概率与分段参数相关；不会保证所有相似对都被找到。"
  },
  {
    "slug": "synthetic-data",
    "title": "合成数据",
    "en": "Synthetic Data",
    "category": "数据评估",
    "definition": "用模型或程序生成训练样本，可扩展特定任务覆盖。高价值来自筛选、验证与多样性管理；未经检验的生成样本会引入错误、重复和分布偏差。",
    "example": "程序生成算术题并用确定性求解器核对答案。",
    "pitfall": "生成得更多不等于信息更多，也不能用自身偏好筛选后就宣称真实质量提高。"
  },
  {
    "slug": "sft",
    "title": "监督微调",
    "en": "Supervised Fine-Tuning",
    "category": "训练对齐",
    "definition": "在任务或对话示例上继续做监督学习，使预训练模型学会目标格式和行为。对话训练常只对助手回答计算损失，需正确处理模板、角色和结束标记。",
    "example": "输入问题与示范答案，用答案各 token 的交叉熵更新模型。",
    "pitfall": "SFT 不是直接写入规则表，少量样本也不能保证覆盖所有边界。"
  },
  {
    "slug": "loss-masking",
    "title": "损失掩码",
    "en": "Loss Masking",
    "category": "训练对齐",
    "definition": "控制哪些 token 参与损失汇总。对话训练通常屏蔽用户提示和 padding，只监督目标回答；还需按有效 token 数正确归一化。",
    "example": "一个样本有 100 个提示 token 与 20 个答案 token，只平均这 20 个有效位置。",
    "pitfall": "损失掩码与注意力掩码不同：前者控制监督，后者控制信息可见性。"
  },
  {
    "slug": "mid-training",
    "title": "中期训练",
    "en": "Mid-Training",
    "category": "训练对齐",
    "definition": "在通用预训练和最终行为对齐之间，加入领域、长上下文、代码或其他目标数据的继续训练阶段。边界并无统一标准，关键是明确数据、目标与能力变化。",
    "example": "通用模型先强化代码与长文，再进行对话监督训练。",
    "pitfall": "阶段名称不能替代对数据分布和训练目标的描述。"
  },
  {
    "slug": "catastrophic-forgetting",
    "title": "灾难性遗忘",
    "en": "Catastrophic Forgetting",
    "category": "训练对齐",
    "definition": "模型在新任务上更新后，原有任务性能显著下降。原因与新数据分布、更新强度和参数共享有关，可通过混合旧数据、约束更新与多维评估缓解。",
    "example": "只用单一领域样本继续训练后，通用问答退化。",
    "pitfall": "新任务变好不意味着整体更好，应保留原能力回归测试。"
  },
  {
    "slug": "rlhf",
    "title": "人类反馈强化学习",
    "en": "RLHF",
    "category": "训练对齐",
    "definition": "利用人类反馈构造奖励或偏好信号，并优化语言模型行为。典型流程含 SFT、偏好数据、奖励模型和策略优化，但实际系统有多种变体。",
    "example": "奖励模型为回答评分，策略更新倾向于产生高分回答，并限制偏离参考模型。",
    "pitfall": "奖励高可能只是在迎合评分器，不保证事实正确或真实有用。"
  },
  {
    "slug": "reward-model",
    "title": "奖励模型",
    "en": "Reward Model",
    "category": "训练对齐",
    "definition": "把提示与回答映射为偏好或质量分数，通常从成对偏好训练。它是目标的近似代理，存在泛化与校准误差，优化过强可能利用这些缺陷。",
    "example": "训练时让被偏好的回答得分高于被拒绝的回答。",
    "pitfall": "奖励分数通常不是可跨模型直接比较的绝对质量刻度。"
  },
  {
    "slug": "policy-gradient",
    "title": "策略梯度",
    "en": "Policy Gradient",
    "category": "训练对齐",
    "definition": "通过对采样输出的对数概率求梯度，并按奖励或优势加权，提升高回报行为概率。语言模型的动作是 token，整个回答可以形成一条轨迹。",
    "example": "获得正优势的回答，其采样 token 的对数概率梯度获得正向权重。",
    "pitfall": "直接对不可微奖励反向传播通常不成立；策略梯度使用采样估计。"
  },
  {
    "slug": "ppo",
    "title": "近端策略优化",
    "en": "Proximal Policy Optimization",
    "category": "训练对齐",
    "definition": "用新旧策略概率比和裁剪目标控制更新幅度，配合价值估计与优势，降低大步策略更新的不稳定性。在语言模型训练中还常加入参考策略约束。",
    "example": "概率比超过裁剪区间后，部分方向上的收益不再继续增长。",
    "pitfall": "裁剪不是严格的全局信赖域保证，仍需监测 KL 与奖励。"
  },
  {
    "slug": "kl-divergence",
    "title": "KL 散度",
    "en": "KL Divergence",
    "category": "数学地基",
    "definition": "衡量分布 p 相对于 q 的差异，定义为 p 下 log(p/q) 的期望。它非负但不对称；对齐训练可用它惩罚偏离参考策略，具体方向与估计方式影响行为。",
    "example": "两分布完全相同时 KL 为 0；交换 p、q 一般得到不同结果。",
    "pitfall": "不能将它当满足对称性和三角不等式的普通距离。"
  },
  {
    "slug": "dpo",
    "title": "直接偏好优化",
    "en": "Direct Preference Optimization",
    "category": "训练对齐",
    "definition": "根据偏好对和参考模型，把偏好学习写成对策略对数概率比的分类目标，省去显式奖励模型与在线强化学习循环。理论关系依赖对应目标与假设。",
    "example": "提升 chosen 相对 rejected 的参考校正对数概率差。",
    "pitfall": "省去显式奖励模型不等于不需要高质量偏好数据，也不保证避免偏好偏差。"
  },
  {
    "slug": "reward-hacking",
    "title": "奖励投机",
    "en": "Reward Hacking",
    "category": "训练对齐",
    "definition": "优化系统找到提高评分但不符合真实意图的行为。发生在奖励指标不完整、判题器漏洞或裁判偏差可被利用时，需要独立评估与针对性修正。",
    "example": "答案添加讨好裁判的句子提高分数，却没有改善正确性。",
    "pitfall": "训练奖励持续上升不一定是能力持续提升。"
  },
  {
    "slug": "rlvr",
    "title": "可验证奖励强化学习",
    "en": "Reinforcement Learning with Verifiable Rewards",
    "category": "训练对齐",
    "definition": "用程序可验证的结果产生奖励，例如数学答案校验和代码测试。它减少部分人工标注成本，但奖励覆盖面与验证器可靠性决定训练方向。",
    "example": "运行单元测试，按通过结果为代码回答提供反馈。",
    "pitfall": "通过有限测试不等于程序完全正确；验证器也可能被利用。"
  },
  {
    "slug": "grpo",
    "title": "组相对策略优化",
    "en": "Group Relative Policy Optimization",
    "category": "训练对齐",
    "definition": "为同一问题采样一组回答，以组内奖励比较构造优势，减少对独立价值模型的依赖。实际实现还涉及概率比、裁剪、KL 和长度归一化的选择。",
    "example": "一组回答奖励为 [0,0,1,1]，正确回答相对组均值获得正优势。",
    "pitfall": "若所有回答奖励相同，标准组内相对信号可能为零；数值稳定项仍需处理。"
  },
  {
    "slug": "advantage",
    "title": "优势估计",
    "en": "Advantage",
    "category": "训练对齐",
    "definition": "衡量某个动作或输出的回报比基准高多少。减去不依赖当前动作的合适基线可以降低策略梯度方差；不同算法使用不同估计方法。",
    "example": "奖励 1、基准 0.4，优势为 0.6；但真实训练可能还做标准化。",
    "pitfall": "优势不是奖励本身，同样奖励在不同基准下会产生不同信号。"
  },
  {
    "slug": "on-policy",
    "title": "同策略数据",
    "en": "On-Policy",
    "category": "训练对齐",
    "definition": "训练样本由当前策略或足够接近它的策略采样。策略更新后旧样本变得离策略，复用时需要考虑概率比与分布变化，不能任意多轮当作新数据。",
    "example": "每轮先用当前模型生成回答，再计算奖励和更新。",
    "pitfall": "异步生成速度与训练速度不一致会增加策略陈旧度。"
  },
  {
    "slug": "rollout",
    "title": "采样轨迹",
    "en": "Rollout",
    "category": "训练对齐",
    "definition": "让策略与环境或提示交互，记录生成动作、观察和结果。语言模型可是一段回答，也可包含多次工具调用；生成开销可能占强化学习流程的大部分。",
    "example": "一道题采样 8 个解答并运行验证器，形成一组训练数据。",
    "pitfall": "采样条数、最大长度与工具预算都影响成本和奖励分布。"
  },
  {
    "slug": "contrastive-learning",
    "title": "对比学习",
    "en": "Contrastive Learning",
    "category": "模型基础",
    "definition": "提高匹配样本表示之间的相似度，并区分不匹配样本。图文对比学习把图像和文本映射到可比较的向量空间，用配对关系作为监督。",
    "example": "同一图片与其描述为正对，其他描述作为候选负对。",
    "pitfall": "负样本可能在语义上也成立，噪声配对会影响学习目标。"
  },
  {
    "slug": "clip",
    "title": "图文对比预训练",
    "en": "CLIP",
    "category": "模型基础",
    "definition": "用图像编码器和文本编码器学习对齐表示，通常以 batch 内图文配对进行对比分类。推理时可比较图片与候选文本的相似度，用于检索或零样本分类。",
    "example": "把“猫的照片”“狗的照片”编码，与图片向量比较。",
    "pitfall": "CLIP 本身不是自回归生成长文本的对话模型。"
  },
  {
    "slug": "siglip",
    "title": "Sigmoid 图文对齐",
    "en": "SigLIP",
    "category": "模型基础",
    "definition": "用图文对是否匹配的 sigmoid 损失学习表示，区别于依赖整批归一化的 softmax 对比目标。损失构造变化会影响负样本处理与训练扩展方式。",
    "example": "每个图文对产生匹配或不匹配的二元监督。",
    "pitfall": "目标函数更换不代表训练数据与计算预算不再重要。"
  },
  {
    "slug": "vision-transformer",
    "title": "视觉 Transformer",
    "en": "Vision Transformer",
    "category": "模型基础",
    "definition": "把图像切成 patch，将各 patch 编码为向量后交给 Transformer。输入分辨率与 patch 尺寸决定视觉 token 数，影响计算和细节保留。",
    "example": "224×224 图片用 16×16 patch 得到 14×14=196 个 patch，不计额外 token。",
    "pitfall": "分辨率提高会增加 token 和注意力成本，不只是图像显示更清楚。"
  },
  {
    "slug": "vision-language-model",
    "title": "视觉语言模型",
    "en": "Vision-Language Model",
    "category": "模型基础",
    "definition": "把视觉编码与语言建模结合，使模型能基于图像理解或生成文本。常见结构包括视觉编码器、连接模块与语言模型，训练分阶段或联合进行。",
    "example": "图片经过编码和连接模块，作为语言模型可利用的上下文表示。",
    "pitfall": "能描述图像不意味着具备准确测量或无误 OCR 能力。"
  },
  {
    "slug": "projector",
    "title": "模态连接模块",
    "en": "Multimodal Projector",
    "category": "模型基础",
    "definition": "把视觉编码器输出转换到语言模型可接收的维度与表示空间。可以是线性层、MLP 或更复杂的重采样模块，是不同模态接口的一部分。",
    "example": "视觉维度 1024 的 token 被映射为语言模型的 4096 维表示。",
    "pitfall": "匹配张量维度只是必要条件，语义对齐仍需训练。"
  },
  {
    "slug": "vq-vae",
    "title": "向量量化自编码器",
    "en": "VQ-VAE",
    "category": "模型基础",
    "definition": "把连续编码表示映射到有限码本中的离散向量，再由解码器重建输入。离散码可作为图像等模态的 token，量化、码本利用与重建损失共同影响质量。",
    "example": "每个局部视觉表示选择最近的码本项 ID。",
    "pitfall": "离散视觉 token 的意义与文本 token 不同，也不保证无损重建。"
  },
  {
    "slug": "diffusion",
    "title": "扩散生成模型",
    "en": "Diffusion Model",
    "category": "模型基础",
    "definition": "训练模型从加噪样本中恢复信号，并在生成时从噪声逐步得到样本。不同噪声参数化、采样器与流匹配变体之间有联系，但具体目标和更新公式需区分。",
    "example": "逐步去噪生成图像，与逐 token 生成文本具有不同计算流程。",
    "pitfall": "不能把所有连续生成方法都理解成完全相同的扩散算法。"
  },
  {
    "slug": "continuous-batching",
    "title": "连续批处理",
    "en": "Continuous batching",
    "category": "推理服务",
    "definition": "推理引擎在每轮执行时重新安排批次：已经完成的请求退出，等待的新请求在资源允许时进入。这样不必等同一批里最慢的请求结束，才能接下一批工作。调度器仍需考虑显存中的历史状态、输入处理与生成之间的干扰，以及不同请求的延迟目标。",
    "example": "同批三个请求中，一个生成结束后，下一轮就可用空出的容量处理新请求。",
    "pitfall": "连续批处理并不等于无限加大批次；显存和延迟目标仍约束可接入的请求量。"
  },
  {
    "slug": "ttft",
    "title": "首 token 延迟",
    "en": "Time to First Token · TTFT",
    "category": "推理服务",
    "definition": "从发出或接收请求到第一个输出词元可见所经过的时间，具体起止点应在指标中写清。它可能包含网络、排队、分词、缓存查找、输入处理和首次生成的开销。这个指标刻画用户最初需要等多久，与后续生成速度和整个回答完成时间是不同的观察维度。",
    "example": "首词元等了零点八秒，后续每词元只需二十毫秒，仍可能让交互显得启动较慢。",
    "pitfall": "只测引擎内部计算时间，却把结果当成用户端到端首词元延迟。"
  },
  {
    "slug": "prefix-caching",
    "title": "前缀缓存",
    "en": "Prefix caching",
    "category": "推理服务",
    "definition": "保存已处理输入前缀对应的注意力键和值状态，让后续具有相同词元前缀的请求复用。复用要求模型权重、位置处理等配置兼容，具体系统还要检查缓存作用域。它减少相同前缀的重复计算，但新输入仍需处理，新增词元的注意力仍可能读取历史状态。",
    "example": "相同系统提示和会话历史后追加一个问题，可以复用有效历史前缀对应的状态。",
    "pitfall": "语义相近不代表词元前缀相同；前缀缓存也不是直接复用旧问题的答案。"
  },
  {
    "slug": "amdahl-law",
    "title": "阿姆达尔定律",
    "en": "Amdahl’s law",
    "category": "性能分析",
    "definition": "用来估计局部优化对整体耗时的上限。先把原耗时拆成可优化部分和保持不变的部分，再计算加速后的总时间。即使某一部分快到不再耗时，剩余工作仍会限制整体速度。它适合固定工作量、其余开销近似不变的分析，实际重叠或调度变化需要另行建模。",
    "example": "一项工作只有两成时间可优化，哪怕这部分完全消失，整体最多加速一点二五倍。",
    "pitfall": "把某个内核快两倍，直接写成整个模型或服务也快两倍。"
  },
  {
    "slug": "looped-transformer",
    "title": "循环 Transformer",
    "en": "Looped Transformer",
    "category": "模型架构",
    "definition": "让内部隐藏状态多次经过共享参数的层或层组，以复用参数的方式增加计算深度。循环次数可以变化，而独立参数量不必随次数同比增加。它带来参数、计算和质量之间的新取舍，也带来状态放大、训练稳定性和推理延迟问题，需要专门训练与验证。",
    "example": "同一组四亿参数的层执行四次，独立参数仍是四亿，但这组层的执行工作增加了。",
    "pitfall": "内部循环不是多生成几段思考文本，也不保证直接给现成模型加循环就有效。"
  },
  {
    "slug": "spectral-radius",
    "title": "谱半径",
    "en": "Spectral radius",
    "category": "数学基础",
    "definition": "一个方阵所有特征值绝对值中的最大值。它帮助分析同一个线性变换反复作用时，初始状态会怎样变化：有限维离散线性系统中，谱半径小于一可保证矩阵的幂最终趋于零。它与一般矩阵的谱范数并非同一概念，也不能单独证明含非线性的完整网络稳定。",
    "example": "标量负二反复相乘会放大，因为绝对值为二；正零点八反复相乘则会衰减。",
    "pitfall": "只看特征值是否为负；离散系统关心绝对值是否小于一，连续系统的条件不同。"
  },
  {
    "slug": "residual-connection",
    "title": "残差连接",
    "en": "Residual connection",
    "category": "模型架构",
    "definition": "让一层的输入通过捷径与该层计算出的变换相加，基本形式是输出等于输入加上变换结果。网络因此能逐步修正已有表示，反向传播也多了一条直接路径。实际模型通常配合归一化与缩放安排，帮助深层训练，但并不自动消除梯度或激活的不稳定。",
    "example": "原状态为向量 x，注意力分支算出修正量后，与 x 相加再交给后续网络。",
    "pitfall": "残差连接保留了信息路径，并不表示经过它的隐藏状态永远不会增长或失真。"
  },
  {
    "slug": "memory-bandwidth",
    "title": "内存带宽",
    "en": "Memory bandwidth",
    "category": "硬件与性能",
    "definition": "单位时间内能够从某一级存储搬运多少字节，必须说明测量的是显存、主存还是设备互连。它不同于存储容量，也不同于一次访问的延迟。当计算单元等待权重或缓存数据时，带宽会限制速度；实际可用带宽还受访问模式、并发程度和系统开销影响。",
    "example": "只考虑搬运，读取两吉字节数据且有效带宽为每秒一千吉字节，至少需要两毫秒。",
    "pitfall": "用显卡有多少吉字节显存判断它每秒能传多少数据，或把峰值带宽当成实测带宽。"
  },
  {
    "slug": "kernel-fusion",
    "title": "内核融合",
    "en": "Kernel fusion",
    "category": "硬件与性能",
    "definition": "把原本分开执行的多个设备操作组合到同一个内核或更紧密的执行计划中，以减少启动、同步和中间数据写回的成本。融合可以增加数据复用或重叠加载，但必须保留必要依赖，并管理寄存器、共享内存等资源。资源压力增加时，融合也可能让性能变差。",
    "example": "矩阵乘法得到中间结果后，直接在设备内完成偏置和激活，减少一次中间结果往返。",
    "pitfall": "融合不是越多越好；过大的内核可能降低并发能力，也会提高适配与验证成本。"
  },
  {
    "slug": "arithmetic-intensity",
    "title": "算术强度",
    "en": "Arithmetic intensity",
    "category": "性能分析",
    "definition": "完成一项计算所执行的浮点运算数，除以跨越指定存储层级搬运的字节数。它描述每搬一个字节能做多少计算，是判断计算受限还是带宽受限的重要线索。分析时必须指定数据移动边界，并结合硬件算力与带宽；缓存复用和批处理都会改变它的数值。",
    "example": "执行一百万次浮点运算、从显存搬运十万字节，对应每字节十次浮点运算。",
    "pitfall": "只数模型参数就推断算术强度，忽略中间激活、缓存访问和数据复用。"
  },
  {
    "slug": "maximal-update-parametrization",
    "title": "最大更新参数化 μP",
    "en": "Maximal Update Parametrization · μP",
    "category": "训练优化",
    "definition": "一套随网络宽度调整初始化、学习率及相关缩放的规则，使逐坐标激活及训练更新对它的影响维持合适量级。它希望在小模型调好的部分超参数能迁移到更宽模型，从而减少昂贵试验。规则取决于参数所在层和优化器，不能把所有矩阵统一套一个缩放因子。",
    "example": "先在较窄网络选择学习率，再按相应参数化规则映射到更宽网络并检查训练行为。",
    "pitfall": "μP 不承诺任意深度、数据分布或训练设置变化后都无需重新验证超参数。"
  },
  {
    "slug": "muon",
    "title": "Muon 优化器",
    "en": "Muon optimizer",
    "category": "训练优化",
    "definition": "主要面向矩阵参数的优化方法：先累积带动量的梯度更新，再通过矩阵运算近似调整其奇异值结构，之后更新权重。常用实现借助牛顿舒尔茨迭代近似正交化。向量参数等通常仍配合其他优化器处理；缩放、权重衰减和数值实现也会影响最终训练表现。",
    "example": "注意力投影矩阵可使用 Muon，而归一化层的向量参数采用适合它的其他更新方法。",
    "pitfall": "Muon 处理的是更新矩阵，并不要求把模型所有权重永久变成正交矩阵。"
  },
  {
    "slug": "wsd",
    "title": "预热—稳定—衰减学习率",
    "en": "Warmup–Stable–Decay · WSD",
    "category": "训练优化",
    "definition": "把学习率计划分成逐步升高的预热段、保持相对稳定的训练段，以及结束前降低学习率的衰减段。它便于从稳定段的不同检查点分叉，分别执行收尾衰减，比较不同训练预算的结果。阶段长度和下降形状需要选择，稳定段损失不代表完成衰减后的最终水平。",
    "example": "同一稳定段检查点可以继续训练，也可以开始收尾衰减，用于评估不同总训练长度。",
    "pitfall": "把 WSD 当作新优化器，或直接比较未做衰减的中途检查点和已充分收尾的模型。"
  },
  {
    "slug": "dynamic-resolution",
    "title": "动态分辨率",
    "en": "Dynamic resolution",
    "category": "多模态",
    "definition": "视觉模型根据输入尺寸、长宽比和预算选择处理分辨率或切块方式，使图像对应的视觉词元数量不必固定。这样可以保留文档小字或局部细节，同时对简单输入节省计算。具体方法可能重缩放、切片或合并图块，因此需要同时考虑细节损失与上下文成本。",
    "example": "阅读一页密集表格时使用更多视觉词元，识别简单图标时采用较少的词元。",
    "pitfall": "动态分辨率不表示无限保留原图像素；实际仍受视觉词元预算和预处理规则约束。"
  },
  {
    "slug": "multimodal-position",
    "title": "多模态位置编码",
    "en": "Multimodal positional encoding",
    "category": "多模态",
    "definition": "给不同模态的表示补充位置结构：文本有顺序，图像有高宽坐标，视频还包含时间。多模态旋转位置编码可为这些轴安排旋转维度，使注意力利用空间和时间关系。具体轴分配、频率组织及时间戳处理因模型而异，不能把所有视觉输入只理解为普通一维文本。",
    "example": "视频中的两个图块即使位于相同高宽坐标，也能通过不同时间坐标区分所属帧。",
    "pitfall": "仅把图像切块后排成一行，并不能自动保留原来的二维邻近关系和视频时间信息。"
  },
  {
    "slug": "all-gather",
    "title": "全收集",
    "en": "All-gather",
    "category": "系统工程",
    "definition": "把通信组中每个成员持有的数据分片收集起来，使每个成员都获得按约定顺序组织的完整结果。它用于恢复分片参数或拼接激活，与把对应元素相加的归约不同。调用时需要满足接口对大小、类型和顺序的约束，结果的额外存储也会提高内存峰值。",
    "example": "两张卡分别持有向量 [1,2] 和 [3,4]，全收集后双方都得到 [1,2,3,4]。",
    "pitfall": "全收集是收齐分片，不会自动把各卡同一位置的数值求和。"
  },
  {
    "slug": "all-to-all",
    "title": "全互换",
    "en": "All-to-all",
    "category": "系统工程",
    "definition": "通信组中每个成员把不同数据片段分别发送给其他成员，并接收来自各成员、发给自己的片段。它适合按目标重新分配数据，例如把词元发送到持有相应专家的设备。各方向流量可能不同，需要匹配发送与接收的划分，还要观察热点链路和负载倾斜。",
    "example": "每张卡把需要专家甲处理的词元发到甲所在设备，把需要专家乙处理的词元发到乙所在设备。",
    "pitfall": "全互换不是把所有数据复制给所有成员，也不保证不同专家收到相同数量的词元。"
  },
  {
    "slug": "collective",
    "title": "集合通信",
    "en": "Collective communication",
    "category": "系统工程",
    "definition": "由一个通信组中的成员共同参与、完成指定数据操作的通信方式，常见操作有广播、全收集、全归约和归约分散。名称规定结果的语义，底层可以采用环、树或分层算法。成员必须按兼容顺序参与，并满足张量约束，否则可能得到错误结果或一直等待。",
    "example": "所有数据并行进程按同一顺序调用梯度全归约，共同形成一致的更新输入。",
    "pitfall": "集合通信只描述协作语义，不意味着底层永远使用同一种网络路线或算法。"
  },
  {
    "slug": "column-parallel",
    "title": "按输出维度切分的线性层",
    "en": "Column-parallel linear layer",
    "category": "系统工程",
    "definition": "在输出等于输入矩阵乘权重矩阵的约定下，沿权重的列即输出特征维度切分，让各设备计算不同输出分片。完整输入通常需要可用，但输出可继续保持分片，交给兼容的下一层。只有后续计算需要完整输出时才收集，因此必须追踪整个计算图的布局。",
    "example": "输入有六维、输出有八维的线性层，可由两张卡各算四个输出特征。",
    "pitfall": "框架可能把权重转置存储；应按输入输出轴理解切分，而不是只看数组第几维。"
  },
  {
    "slug": "communication-overlap",
    "title": "计算与通信重叠",
    "en": "Communication–computation overlap",
    "category": "系统工程",
    "definition": "在数据依赖允许时，同时推进通信和其他计算，让部分通信等待被有用工作覆盖。常见做法是在反向产生一组梯度后就开始归约，同时继续计算更早层的梯度。它要求正确同步和足够独立的工作，通信与计算争用带宽或设备资源时，收益可能下降。",
    "example": "最后一层梯度开始传输时，设备继续计算前一层的反向传播。",
    "pitfall": "把调用设成异步不等于真正重叠；过早等待或资源竞争仍可能使时间线接近串行。"
  },
  {
    "slug": "conditional-probability",
    "title": "条件概率",
    "en": "Conditional probability",
    "category": "数学地基",
    "definition": "在某个条件已经成立时，另一个事件发生的概率。对于发生概率不为零的条件事件，计算方式是两件事共同发生的概率除以条件事件本身的概率。语言模型不断估计给定已有词元后，下一个词元的分布；条件改变，分布也会改变，不能把它当作固定词频。",
    "example": "模型看到“今天下”与“请你坐”时，对同一个后续词元会给出不同的条件概率。",
    "pitfall": "给定甲时乙的概率，一般不等于给定乙时甲的概率。"
  },
  {
    "slug": "context-parallelism",
    "title": "上下文并行",
    "en": "Context parallelism",
    "category": "系统工程",
    "definition": "把同一长序列的不同位置分给多个设备，降低每卡持有的激活与注意力工作量。每个位置仍可能需要读取其他分片的历史键和值，因此要设计交换或环式流转，并保持因果关系。不同框架的术语可能重叠，判断时应看哪些张量被切分以及注意力怎样完成。",
    "example": "两张卡分别负责一个长文档的前后半段，后半段的查询仍需正确访问前半段信息。",
    "pitfall": "直接把长文档切成互不通信的片段，会改变注意力语义，不能视为等价的上下文并行。"
  },
  {
    "slug": "expert-parallelism",
    "title": "专家并行",
    "en": "Expert parallelism",
    "category": "系统工程",
    "definition": "把混合专家模型中的不同专家放到不同设备，根据路由结果把词元激活发送到对应专家，再组合返回的输出。它扩展专家权重容量，但增加跨设备交换、动态批次和负载均衡问题。总专家数、每词元选择数和设备分组共同决定计算量及通信压力。",
    "example": "八个专家分布在四张卡上，一个词元选择的两个专家可能位于不同设备。",
    "pitfall": "增加专家所在设备数不会自动均匀分摊工作，热门专家仍可能成为瓶颈。"
  },
  {
    "slug": "global-batch-size",
    "title": "全局批次大小",
    "en": "Global batch size",
    "category": "训练对齐",
    "definition": "一次参数更新共同使用的数据总量，需要明确单位是样本、序列还是有效词元。在等大小微批的普通数据并行中，它等于每个副本的微批大小乘累积次数再乘副本数。张量并行或流水线设备处理的是同一份数据的不同部分，不能再次计入数据副本数。",
    "example": "四个数据副本各用八条序列的微批，累积三次再更新，全局批次就是九十六条序列。",
    "pitfall": "把集群总卡数直接代入数据副本数，或忽略不同序列有效词元数的差异。"
  },
  {
    "slug": "gpu-benchmarking",
    "title": "GPU 基准测试",
    "en": "GPU benchmarking",
    "category": "系统工程",
    "definition": "在明确输入形状、精度、布局、设备与执行模式后，测量一段工作在加速器上的耗时和资源表现。设备调用通常异步，需要正确同步或使用设备事件；还应预热、重复测量，并区分首次编译与稳态执行。输入传输、分配等开销是否计入，也必须说明。",
    "example": "同一矩阵乘法预热后重复测量，报告中位耗时，并说明是否包含主存到显存的传输。",
    "pitfall": "只用主机时钟包住异步函数，可能测到任务提交时间而非设备完成时间。"
  },
  {
    "slug": "gpu-memory-hierarchy",
    "title": "GPU 存储层次",
    "en": "GPU memory hierarchy",
    "category": "系统工程",
    "definition": "加速器包含寄存器、片上共享存储、缓存和设备显存等不同层级，容量、延迟、带宽与共享范围各不相同。高效程序把经常复用的数据尽量留在靠近计算单元的位置，同时控制有限资源占用。具体层级组织取决于硬件，逻辑上相同的访问也可能有不同代价。",
    "example": "矩阵乘法把一小块输入加载到片上后复用多次，减少从显存重复读取。",
    "pitfall": "片上存储更快但容量有限；占用过多可能减少同时驻留的工作量。"
  },
  {
    "slug": "gradient-accumulation",
    "title": "梯度累积",
    "en": "Gradient accumulation",
    "category": "训练对齐",
    "definition": "把一次更新的数据拆成多个微批，逐个执行前向和反向，把梯度保留并累加，最后统一更新参数。这样可降低激活峰值，但不会消除权重和优化器状态。损失缩放应与完整批次目标一致，微批有效词元数不同时，需要按相应计数加权而非直接平均均值。",
    "example": "显存一次只能放四条序列时，可连续处理四个微批，再用十六条序列的合并梯度更新。",
    "pitfall": "每个微批都执行参数更新，或忘记正确清零与归一化，就不是预期的大批次累积。"
  },
  {
    "slug": "gradient-synchronization",
    "title": "梯度同步",
    "en": "Gradient synchronization",
    "category": "训练对齐",
    "definition": "把数据并行副本算出的本地梯度按目标损失的定义组合，使各副本获得一致的更新输入。等大小、各自取均值的数据分片通常可平均梯度；有效样本或词元数不同则需要加权。同步可以按梯度桶与反向计算交错，但参数更新前必须满足相应依赖。",
    "example": "两个副本分别计算十个和三十个有效词元的平均梯度，应按一比三加权合并。",
    "pitfall": "各副本已经对不同数量词元取均值后，再不加权地平均，会改变训练目标。"
  },
  {
    "slug": "hybrid-architecture",
    "title": "混合序列架构",
    "en": "Hybrid sequence architecture",
    "category": "模型基础",
    "definition": "在一个模型中组合不同的序列处理机制，例如交错使用状态空间层、线性注意力和全注意力层。目标是在历史信息压缩、精确检索、计算成本和缓存大小之间取得合适平衡。各层比例与排列会影响质量，不能只根据某一种层的复杂度判断整个模型的表现。",
    "example": "多数层维护紧凑递推状态，少数全注意力层保留直接访问历史词元的路径。",
    "pitfall": "混合架构不是把多种组件放在一起就必然更好，需要匹配预算和任务做对照评估。"
  },
  {
    "slug": "jit-compilation",
    "title": "即时编译",
    "en": "Just-in-time compilation",
    "category": "系统工程",
    "definition": "在运行时根据程序及输入相关信息生成可执行代码，常用于针对张量形状、数据类型或设备配置优化内核。首次遇到某个配置可能需要编译，后续可以复用缓存结果。配置变化可能触发新编译，因此启动耗时、缓存命中与稳定执行性能应分别观察。",
    "example": "某个 Triton 内核第一次处理一种块大小时先编译，后续相同配置直接执行缓存版本。",
    "pitfall": "把首次编译时间混入稳态内核计时，或以为所有不同输入都能复用同一编译结果。"
  },
  {
    "slug": "kernel",
    "title": "GPU 内核",
    "en": "GPU kernel",
    "category": "系统工程",
    "definition": "提交到加速器上执行的一段程序，用于完成某个张量操作或一组融合操作。运行时会按执行网格安排并行工作，程序需要定义数据读取、计算、存储和必要同步。一次高级框架调用可能启动多个内核，一个内核也可以覆盖多个数学算子，二者并非一一对应。",
    "example": "一次按行求和可以由一个内核启动多个工作单元，每个负责一行或一组行。",
    "pitfall": "这里的内核指设备程序，与操作系统内核及核化注意力中的数学核是不同概念。"
  },
  {
    "slug": "memory-coalescing",
    "title": "合并访存",
    "en": "Memory coalescing",
    "category": "系统工程",
    "definition": "让同组线程访问邻近且适当对齐的地址，使硬件能把多个访问合并为较少的内存事务。它提高搬运效率，与把多个算子合为一个内核是不同优化。是否有效取决于真实地址、步长、元素大小和硬件事务规则，逻辑上相邻的张量元素不一定物理上连续。",
    "example": "同一组线程依次读取一行连续元素，通常比跨越很大步长读取更容易形成高效事务。",
    "pitfall": "只看张量形状便认定访问连续，忽略转置视图或切片改变后的步长。"
  },
  {
    "slug": "mfu",
    "title": "模型 FLOPs 利用率",
    "en": "Model FLOPs utilization · MFU",
    "category": "系统工程",
    "definition": "用实际完成有效模型计算的速率除以所用硬件的对应理论峰值，衡量训练系统效率。分子通常只计算模型需要的工作，不把激活重算当成额外有效收益；分母要匹配设备数量、数值精度及稠密或稀疏口径。它不能直接替代训练质量、吞吐或总成本指标。",
    "example": "有效模型计算每秒一百单位，所用设备对应峰值合计每秒二百五十单位，利用率为百分之四十。",
    "pitfall": "使用不匹配的稀疏峰值或把重计算全部算作有效模型工作，会扭曲比较。"
  },
  {
    "slug": "microbatch",
    "title": "微批次",
    "en": "Microbatch",
    "category": "训练对齐",
    "definition": "一次局部前向和反向处理的一小份数据，可以是梯度累积的基本单位，也可以是在流水线阶段间传递的数据单元。多个微批共同形成一次参数更新的批次。微批大小影响激活内存、矩阵效率和调度，设置时要与数据副本数、累积次数及损失归一化对应。",
    "example": "一个由三十二条序列组成的批次可以拆成八个各含四条序列的微批。",
    "pitfall": "微批不一定等于一次优化器更新，也不一定代表集群一次处理的数据总量。"
  },
  {
    "slug": "network-topology",
    "title": "设备互联拓扑",
    "en": "Interconnect topology",
    "category": "系统工程",
    "definition": "描述设备、节点与交换结构如何连接，以及各链路的带宽、延迟和共享竞争关系。同样数量的加速器在不同互联下，集合通信与并行切分的最佳方案可能不同。设计时应把通信频率和数据规模映射到具体链路，避免让频繁交换跨越最慢或最拥挤的连接。",
    "example": "频繁同步的张量并行组放在高速节点内，再评估哪些较低频通信适合跨节点。",
    "pitfall": "只根据总卡数设计并行度，忽略卡之间是否共享高速互联及跨节点带宽。"
  },
  {
    "slug": "numerical-tolerance",
    "title": "数值误差容限",
    "en": "Numerical tolerance",
    "category": "数学地基",
    "definition": "用绝对和相对误差阈值判断浮点结果是否在允许范围内一致。绝对误差适合控制接近零的偏差，相对误差衡量偏差占参考值的比例。阈值应结合精度、运算顺序、累积长度与任务选择；通过容限检查表示满足设定标准，并不代表算法或梯度已全面正确。",
    "example": "常见检查要求误差不超过绝对容限加上相对容限乘参考值绝对值。",
    "pitfall": "为了让错误实现通过而不断放宽阈值，或要求所有低精度归约都逐位一致。"
  },
  {
    "slug": "online-softmax",
    "title": "在线 Softmax",
    "en": "Online softmax",
    "category": "系统工程",
    "definition": "按块读取分数并维护当前最大值与缩放后的指数和，无需一次保存所有分数。新块改变最大值时，对旧累积量重新缩放后再合并。用于注意力时还同步维护加权值的累积量，最终统一归一化；这样可减少中间存储，同时保留稳定的整体计算目标。",
    "example": "当前最大值从二更新到三时，旧指数和要先乘以指数函数在负一处的值。",
    "pitfall": "直接把各块分别归一化的概率相加，会丢失跨块分母关系，通常不等于全局结果。"
  },
  {
    "slug": "outer-product",
    "title": "外积",
    "en": "Outer product",
    "category": "数学地基",
    "definition": "两个向量的每对元素相乘组成矩阵，而不是像内积那样把乘积求和得到一个数。长度分别为甲和乙的向量，外积的形状就是甲乘乙。在递推式注意力中，键与值的外积可写入汇总状态，当前查询再读取该状态，具体方向由向量和矩阵的约定决定。",
    "example": "向量 [1,2] 与 [3,4,5] 的外积是两行三列，第一行为 [3,4,5]，第二行为 [6,8,10]。",
    "pitfall": "把外积与内积混淆，或不检查键和值转置方向就套用状态更新公式。"
  },
  {
    "slug": "pipeline-bubble",
    "title": "流水线气泡",
    "en": "Pipeline bubble",
    "category": "系统工程",
    "definition": "流水线设备因为尚未收到输入、等待依赖或正在排空工作而出现的空闲时段。多个微批可以提高阶段重叠，但启动与结束以及阶段耗时不平衡仍会造成等待。分析气泡要明确调度策略和统计分母，实际比例还受通信、激活管理与前后向交错影响。",
    "example": "四个阶段只处理一个微批时，后面的阶段需要等待前面的结果，很难同时保持忙碌。",
    "pitfall": "把理想平衡调度的气泡公式当成所有训练流水线的精确运行时间。"
  },
  {
    "slug": "point-to-point",
    "title": "点对点通信",
    "en": "Point-to-point communication",
    "category": "系统工程",
    "definition": "由指定发送方把数据传给指定接收方，常用于流水线相邻阶段之间传递激活或梯度。它与整个通信组共同参与的集合操作不同，但仍要匹配通信对象、消息顺序和张量信息。异步发送通常也有缓冲区生命周期要求，接收完成前不能随意消费数据。",
    "example": "流水线第一阶段把某微批的激活发给第二阶段，反向时再接收对应输入梯度。",
    "pitfall": "发送和接收顺序不兼容可能死锁，过早复用仍在传输的缓冲区可能破坏结果。"
  },
  {
    "slug": "profiling",
    "title": "性能剖析",
    "en": "Profiling",
    "category": "系统工程",
    "definition": "记录程序的事件、调用、资源使用和时间线，用来解释总耗时发生在哪里。训练中可观察内核、数据传输、通信、同步和主机等待，从而区分计算、内存或调度瓶颈。剖析本身可能有开销，先找整体关键路径，再对相关部分做独立基准，结论会更可靠。",
    "example": "时间线发现许多短内核之间夹着主机等待，说明只优化矩阵乘法可能收益有限。",
    "pitfall": "把采样或插桩后的耗时直接当成无监控运行的准确性能，或只盯占时最大的单个函数。"
  },
  {
    "slug": "rank",
    "title": "进程编号",
    "en": "Rank",
    "category": "系统工程",
    "definition": "一个进程在指定分布式通信组中的编号，用来确定通信对象、数据分片和职责。全局组编号、节点内编号以及子通信组编号可能不同；它不是固定的物理显卡编号。理解日志或检查通信时，需要同时说明进程属于哪个组，以及该组和设备的映射关系。",
    "example": "某进程在全局组编号为五，在所在节点内可能编号为一，在张量并行子组中又有自己的编号。",
    "pitfall": "把全局进程编号直接当作本机设备序号，可能选择不存在或错误的设备。"
  },
  {
    "slug": "reduce-scatter",
    "title": "归约分散",
    "en": "Reduce-scatter",
    "category": "系统工程",
    "definition": "先按指定规则对各成员对应的数据进行归约，再把归约结果的不同分片分配给各成员。它把合并数据与分片持有结合起来，常见于梯度或状态分片训练。概念上可以看作归约后再切分，但高效实现不必在每个设备上真正构造一份完整结果。",
    "example": "两卡分别提供 [1,2,3,4] 和 [10,20,30,40]，求和后可分别得到 [11,22] 与 [33,44]。",
    "pitfall": "归约分散后的每个成员只持有结果的一部分，不能按全归约的完整输出使用。"
  },
  {
    "slug": "row-parallel",
    "title": "按输入维度切分的线性层",
    "en": "Row-parallel linear layer",
    "category": "系统工程",
    "definition": "在输出等于输入矩阵乘权重矩阵的约定下，沿权重的行即输入特征维度切分，输入也按相应维度分片。每张设备算出的是同一输出的部分贡献，需要逐元素求和得到完整输出。这种切法可承接上一层的输出分片，但非线性和偏置的应用位置必须正确。",
    "example": "六维输入分成两组三维，各自产生四维部分输出，再相加得到最终四维输出。",
    "pitfall": "部分贡献应相加而非拼接；如果每片都加入同一完整偏置，还可能把偏置重复计算。"
  },
  {
    "slug": "sequence-parallelism",
    "title": "序列并行",
    "en": "Sequence parallelism",
    "category": "系统工程",
    "definition": "在本课程常用语境中，与张量并行配合，沿序列轴分散部分激活及逐词元操作，例如归一化和随机失活，以减少重复存储。进入需要其他布局的计算前，再通过收集或归约切换分片方式。名称在不同框架中可能更宽泛，应以实际分片对象和通信为准。",
    "example": "某些逐词元归一化操作由两张卡分别处理序列的前后半段，避免双方保存完整中间激活。",
    "pitfall": "序列并行不等于把所有注意力计算变成彼此独立的短序列，历史依赖仍需正确处理。"
  },
  {
    "slug": "sparse-attention",
    "title": "稀疏注意力",
    "en": "Sparse attention",
    "category": "模型基础",
    "definition": "让每个查询只与选定的一部分位置计算注意力，而非访问所有可见位置。选择方式可以是局部窗口、固定结构或可学习策略，从而降低运算与存储成本。它改变了信息流动路径，质量依赖被保留的位置；理论稀疏也需要合适的内核布局才能转化为速度。",
    "example": "一个位置只读取最近一百二十八个词元和少量全局位置，减少直接比较的数量。",
    "pitfall": "稀疏注意力通常改变模型计算；它不同于保持密集注意力目标的 FlashAttention。"
  },
  {
    "slug": "streaming-multiprocessor",
    "title": "流式多处理器",
    "en": "Streaming Multiprocessor · SM",
    "category": "系统工程",
    "definition": "英伟达加速器中负责执行线程块和线程束的主要计算单元，包含调度及多种执行和片上存储资源。一个设备由多个这样的单元组成，可以并行处理很多工作。可驻留多少线程块取决于寄存器、共享存储等限制，不能仅按单元数量推断某个程序的并发能力。",
    "example": "设备有许多流式多处理器时，足够多且资源占用合适的线程块才能充分覆盖它们。",
    "pitfall": "流式多处理器不是一个普通 CPU 核，也不等于一个线程或一个 Tensor Core。"
  },
  {
    "slug": "tensor-core",
    "title": "张量计算单元",
    "en": "Tensor Core",
    "category": "系统工程",
    "definition": "英伟达加速器中专门加速矩阵乘加等运算的硬件单元，支持的输入格式、累积精度、矩阵形状和吞吐随架构变化。程序需要通过兼容的数据类型、布局和指令路径使用它。硬件给出的矩阵峰值不能直接代表归约、索引或不规则小算子的执行速度。",
    "example": "满足对应精度和形状要求的矩阵乘法，可以走专用矩阵乘加路径以提高吞吐。",
    "pitfall": "有 Tensor Core 不代表任意浮点代码都会自动达到规格表中的矩阵计算峰值。"
  },
  {
    "slug": "tensor-layout",
    "title": "张量存储布局",
    "en": "Tensor memory layout",
    "category": "系统工程",
    "definition": "描述逻辑索引如何映射到实际存储地址，包括维度大小、步长和偏移等信息。同样形状的张量可以采用不同布局；转置或切片可能只改视图而没有复制数据。后续算子是否支持这种布局，会影响访存效率，也可能触发隐含的数据整理或额外副本。",
    "example": "一个两行三列的行优先数组转置后可得到三行两列的视图，而底层数据顺序不变。",
    "pitfall": "形状一致不代表连续存储，也不保证两个张量具有相同的实际访问成本。"
  },
  {
    "slug": "tiling",
    "title": "分块计算",
    "en": "Tiling",
    "category": "系统工程",
    "definition": "把大的计算区域划分成较小的块，使每块的数据能在寄存器或片上存储中多次复用，再逐步完成整个结果。块形状要在复用程度、资源占用和并行数量之间折中。边界不整除时还需掩码或补齐，因此不同尺寸的实际执行代价可能出现台阶变化。",
    "example": "矩阵乘法把输出分成多个小矩形块，每块沿公共维度循环加载输入并累加。",
    "pitfall": "块越大不一定越快，过高的寄存器或共享存储占用可能减少并行驻留数量。"
  },
  {
    "slug": "warp",
    "title": "线程束",
    "en": "Warp",
    "category": "系统工程",
    "definition": "英伟达执行模型中通常由三十二个线程组成的调度与指令执行分组，各线程处理各自数据。若组内线程走不同分支，硬件通常需要分阶段执行不同路径，降低有效并行利用。现代架构的具体调度更灵活，但代码仍需使用正确同步，不能依赖未声明的执行顺序。",
    "example": "同一线程束的线程分别读取连续数组元素，通常有利于形成高效访存。",
    "pitfall": "三十二线程是英伟达线程束的常见约定，不能不加说明地套到所有加速器架构。"
  },
  {
    "slug": "wave-quantization",
    "title": "执行波次台阶",
    "en": "Wave quantization",
    "category": "系统工程",
    "definition": "当工作块数量跨过设备一波能并行执行的容量时，必须增加新的执行波次，而最后一波可能只有少量工作。于是计算规模略增，耗时却可能明显跳升。这是调度与资源粒度带来的性能现象，并非数值量化；真实波次容量取决于工作块占用和硬件资源。",
    "example": "教学简化中，一波最多处理八个等时工作块，九个块需要第二波，最后一波只有一个块。",
    "pitfall": "不能只按流式多处理器数量确定波次容量，还需考虑每个单元可同时驻留多少工作块。"
  },
  {
    "slug": "world-size",
    "title": "通信组规模",
    "en": "World size",
    "category": "系统工程",
    "definition": "一个分布式通信组中参与进程的数量。常见部署是一进程对应一张卡，但这属于部署约定；全局组与数据、张量等并行子组也可能有不同规模。计算全局批次或安排通信时，要使用对应组的成员数，不能把所有组规模都当作同一个集群总数。",
    "example": "十六个进程组成全局组，其中每四个进程还可形成一个独立的张量并行子组。",
    "pitfall": "把全局组规模当作数据并行副本数，会在组合并行中高估全局批次。"
  },
  {
    "slug": "memory-mask",
    "title": "访存边界掩码",
    "en": "Memory access mask",
    "category": "系统工程",
    "definition": "在向量化或分块内核中，用布尔条件指定哪些地址允许读取或写入，保护末尾不足一整块的数据。无效读取通常需要给定替代值，并根据后续操作选择合适中性元素。它控制地址访问有效性，无法修复错误的步长、维度含义或需要另行处理的数据竞争。",
    "example": "长度为一百、块大小为六十四时，第二块只允许前三十六个位置访问数组。",
    "pitfall": "访存边界掩码与防止读取未来词元的因果掩码目的不同，不能混为一个概念。"
  },
  {
    "slug": "recurrent-gating",
    "title": "递推状态门控",
    "en": "Recurrent state gating",
    "category": "模型基础",
    "definition": "在递推更新中通过系数控制保留多少旧状态或写入多少新信息，系数可以由当前输入计算得到。它让状态不必只做无差别累加，有助于选择性遗忘和记忆。标量门、向量门及矩阵更新表达能力不同，具体稳定性还受范围约束、归一化和训练方式影响。",
    "example": "简化更新中，旧状态乘以零点九后再加上新信息，会逐步减弱较早信息的贡献。",
    "pitfall": "状态门控控制记忆更新，不能直接等同于混合专家模型中选择专家的路由器。"
  }
];

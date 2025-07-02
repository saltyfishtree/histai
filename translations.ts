/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useAppStore } from './src/stores/appStore';

type TranslationKey = string; // Using string for flexibility, can be more structured

interface Translations {
    [key: TranslationKey]: {
        en: string;
        zh: string;
    };
}

const translations: Translations = {
    // Site & Header
    'site.title': { en: "HistAI | AI for Historical Understanding", zh: "HistAI | 人工智能促进历史理解" },
    'header.nav.home': { en: "Home", zh: "首页" },
    'header.nav.histbench': { en: "HistBench", zh: "HistBench" },
    'header.nav.histagent': { en: "HistAgent", zh: "HistAgent" },
    'header.nav.impact': { en: "Impact & Vision", zh: "影响与展望" },
    'header.nav.team': { en: "Team", zh: "团队" },
    'header.nav.submit': { en: "Submit a Question", zh: "提交问题" },
    'header.lang.en': { en: "English", zh: "English" },
    'header.lang.zh': { en: "中文", zh: "中文" },

    // Footer
    'footer.copyright': { en: "© {currentYear} HistAI Group. All Rights Reserved.", zh: "© {currentYear} HistAI Group. 版权所有。" },
    'footer.link.github': { en: "GitHub", zh: "GitHub" },
    'footer.link.paper': { en: "Read the Paper", zh: "阅读论文" },
    'footer.link.dataset': { en: "Explore HistBench Dataset", zh: "探索 HistBench 数据集" },

    // Home Page
    'home.hero.title': { en: "Unlocking History with AI", zh: "AI开启历史研究新纪元" },
    'home.hero.subtitle': { en: "The nuanced interpretation of the past presents unique challenges for Artificial Intelligence. We introduce HistBench, a pioneering benchmark meticulously engineered to evaluate AI's grasp of complex historical narratives, and HistAgent, the advanced AI agent specifically developed to master this challenge.", zh: "尽管近些年来人工智能发展势头迅猛，但是在处理历史学上的复杂问题时，仍旧常显得力不从心。实际上，探索人类的过去，给AI带来了相当独特且严峻的挑战。为此，我们推出了 HistBench——一个经过精心设计的具有开创性的基准，旨在评估AI对复杂历史事件的理解能力；同时推出了HistAgent —— 专为填补这方面空缺而打造的专业AI智能体。" },
    'home.hero.cta.explore_histbench': { en: "Explore HistBench", zh: "探索 HistBench" },
    'home.hero.cta.try_demo': { en: "Try HistAgent Demo", zh: "在线试用 HistAgent" },
    'home.hero.cta.view_github': { en: "View Project on GitHub", zh: "在 GitHub 上查看项目" },
    'home.demo_cta.title': { en: "Experience HistAgent Live", zh: "在线体验 HistAgent" },
    'home.demo_cta.description': { en: "Interact with our state-of-the-art AI for historical research. Ask questions, analyze sources, and see its capabilities in action. No setup required.", zh: "与我们先进的历史研究AI进行实时互动。提出问题、分析史料，亲眼见证它的强大功能。无需任何配置，即刻体验。" },
    'home.highlights.histbench.title': { en: "HistBench: A Benchmark for Historical Reasoning in AI", zh: "HistBench：AI历史推理能力基准" },
    'home.highlights.histbench.text': { en: "HistBench is a rigorously curated benchmark of 414 high-quality, expert-authored questions that evaluate historical reasoning across modalities, languages, and interpretive tasks. Covering 29 ancient and modern languages and more than 36 historical subfields, it enables fine-grained assessment of AI capabilities in source analysis, interdisciplinary synthesis, and temporal inference—reflecting the complexity of real-world historical research.", zh: "HistBench是一个专为历史领域打造的基准，包含414道由研究助理、历史学专业研究生和专业学者编写的高质量题目，旨在评估AI在多模态、多语言及多类型推理任务中的能力。它涵盖29种古今语言，以及超过36个历史学细分领域，能够对AI在史料分析、跨学科综合及时序推理等关键方面表现出的能力进行精确评估——实现这一点的方式是模拟真实世界历史研究的复杂性。" },
    'home.highlights.histagent.title': { en: "HistAgent: A Domain-Specific AI for Historical Research", zh: "HistAgent：历史研究领域专用人工智能" },
    'home.highlights.histagent.text': { en: "HistAgent is a GPT-4o-based intelligent agent, purpose-built for historical inquiry. It integrates specialized tools—including OCR for manuscripts, image provenance analysis, multilingual translation, and academic literature search—within a coordinated architecture that mirrors the interpretive workflow of professional historians. On historical benchmarks, HistAgent significantly outperforms generalist agents while maintaining robust performance on general AI tasks.", zh: "HistAgent是一款专为历史领域而打造的，基于GPT-4o构建的智能体，在遵循一套明确的中央决策程序的前提下，集成了一系列的专业工具，包括各类手稿的OCR识别、图像溯源分析、多种语言翻译及学术文献检索等。这样的运行流程高度再现了历史学家的工作方式。难能可贵的是，不但在历史领域的基准测试中，HistAgent的表现大幅领先于通用型智能体，同时，它在通用型基准的测试中也表现优异。" },
    'home.highlights.advancing.title': { en: "Advancing AI for Historical Scholarship", zh: "推动AI赋能历史学术研究" },
    'home.highlights.advancing.text': { en: "Our research offers a critical analysis of Large Language Model capabilities through HistBench, charting a course for future advancements in AI-driven historical inquiry and enriching our understanding of the past.", zh: "我们的研究通过HistBench对大语言模型（LLM）在历史学术领域的能力进行了批判性分析，为未来AI驱动的历史探究提供了新的可能，实质上，这拓展了人类探索历史的路径。" },
    'home.dive_deeper.title': { en: "Dive Deeper", zh: "深入探索" },
    'home.dive_deeper.cta.read_paper': { en: "Read the Full Paper", zh: "阅读完整论文" },
    'home.dive_deeper.cta.access_dataset': { en: "Access HistBench Dataset", zh: "访问 HistBench 数据集" },
    'home.icon.histbench_alt': { en: "HistBench Icon", zh: "HistBench 图标" },
    'home.icon.histagent_alt': { en: "HistAgent Icon", zh: "HistAgent 图标" },
    'home.icon.research_alt': { en: "Research Insights Icon", zh: "研究洞察图标" },
    'home.contribute.title': { en: "Help Us Push the Boundaries of AI", zh: "帮助我们推动人工智能的边界" },
    'home.contribute.subtitle': { en: "Your expertise is invaluable. Contribute a challenging question to HistBench and help us build a more robust and nuanced evaluation for historical AI.", zh: "您的专业知识是无价的。为 HistBench 贡献一个具有挑战性的问题，帮助我们为历史 AI 构建更强大、更细致的评估。" },
    'home.contribute.cta': { en: "Contribute a Question", zh: "贡献一个问题" },

    // HistBench Page
    'histbench.title': { en: "HistBench: A Specialized Benchmark for Historical AI", zh: "HistBench：历史推理能力评估基准" },
    'histbench.overview.title': { en: "HistBench Overview", zh: "HistBench 概述" },
    'histbench.overview.p_all': { en: "HistBench is the first benchmark specifically designed to evaluate the capabilities of LLMs in historical reasoning. It includes 414 questions authored by over 40 contributors (Ph.D. students, researchers, and historians), spanning 29 languages and at least 36 subfields. Each question is grounded in real historical sources and annotated with difficulty levels, source types, reasoning dimensions, and answer explanations. Questions are categorized into three levels (Basic, Intermediate, Challenging), and evaluated through a rigorous three-stage review pipeline: format/semantic check, LLM-based pre-evaluation, and expert historical validation. Questions include both exact match (e.g., names, dates, terms) and multiple choice formats. They cover diverse modalities (text, manuscripts, audio, video, images) and domains (classics, social history, science/medicine history, etc.), making HistBench a comprehensive tool for evaluating historical reasoning in AI.", zh: "HistBench 是全球首个针对大语言模型历史推理能力设计的专项评估基准，弥补了该领域缺少系统性评估工具与标准的缺憾。\n本基准集包含了 414 道由 40 余位研究助理、历史学研究生与专业学者所贡献的题目，覆盖了29 种古今语言及 36 个以上的历史学细分领域；采用了三级难度分级体系（基础/进阶/挑战），并附有材料出处、考察能力与答案解析等栏目，确保了评估过程的科学性与可追溯性。所有题目均根据真实历史材料或专业学术文献撰写，由此起到了再现真实学术语境的效果。\n在题目质量保障方面，HistBench 实施了严格的三重审核机制：第一阶段，对各题目的格式与语义进行校验；第二阶段，通过各主流LLM的作答情况，检测题目对于AI的挑战性；第三阶段，历史学专家针对题目内容的准确性和专业性进行最终审核。题型设计包含两种样式：侧重知识检索（答案为如人物、时间、术语等要素）的精确匹配题和侧重逻辑推演的选择题（包括单选和多选）。评估的范围，涵盖了多类型的史料处理，包括文本、手稿、音频、视频及图像等材料，以及多个细分领域，包括古典学、社会史、科技与医学史等重要方向。\n通过系统性地整合多语言、多类型史料与覆盖广阔的细分领域，HistBench 建立起了AI历史研究能力的评判标准，为AI驱动的史学研究范式革新提供了方法论上的支撑。" },
    'histbench.deep_dive.title': { en: "Deep Dive: Expert-Curated Subset Highlighting Core Strengths", zh: "深度聚焦：专家精选子集彰显核心优势" },
    'histbench.deep_dive.p1': { en: "To further illustrate HistBench's depth and capabilities, a significant portion includes <strong>414 meticulously questions, curated by domain experts and students</strong>. This subset particularly showcases the benchmark's sophistication by evaluating a wide range of historical reasoning skills and incorporating diverse data characteristics, all validated through a rigorous quality assurance process. Key aspects include:", zh: "为充分展现HistBench的学术深度与评估能力，该基准集包含由研究助理、历史学专业研究生与专业学者所精心编写的414道题目。该基准集兼具多维历史推理能力评估及多元化史料覆盖两大核心特征，在设计上保证了学术严谨性，所有内容均经严格的质量验证。其核心优势可主要分为以下两大方面：" },
    'histbench.reasoning_dimensions.title': { en: "1. Diverse Reasoning Dimensions", zh: "一、多维度推理能力评估" },
    'histbench.reasoning_dimensions.p1': { en: "The expert-curated questions are designed to evaluate a comprehensive range of historical reasoning skills, categorized into six key dimensions:", zh: "我们所构建的基准覆盖以下六大历史推理维度：" },
    'histbench.reasoning_dimensions.li.bibliographic': { en: "<strong>Bibliographic Retrieval:</strong> Locating and citing relevant historical sources.", zh: "<strong>文献检索能力：</strong>定位与标注史料来源" },
    'histbench.reasoning_dimensions.li.source_id': { en: "<strong>Source Identification:</strong> Recognizing the origin, nature, and context of historical materials.", zh: "<strong>史料甄别能力：</strong>辨析史料来源、性质及背景" },
    'histbench.reasoning_dimensions.li.source_proc': { en: "<strong>Source Processing:</strong> Interpreting and extracting information from diverse historical sources.", zh: "<strong>史料解析能力：</strong>提取与阐释多模态史料中的信息" },
    'histbench.reasoning_dimensions.li.hist_analysis': { en: "<strong>Historical Analysis:</strong> Examining patterns, causality, and significance in historical events.", zh: "<strong>历史分析能力：</strong>探析历史事件的类型、因果与意义" },
    'histbench.reasoning_dimensions.li.interdisciplinary': { en: "<strong>Interdisciplinary Integration:</strong> Connecting historical knowledge with insights from other disciplines.", zh: "<strong>跨学科整合能力：</strong>整合历史学与其他学科的知识" },
    'histbench.reasoning_dimensions.li.cultural_context': { en: "<strong>Cultural Contextualization:</strong> Understanding events and perspectives within their specific cultural frameworks.", zh: "<strong>文化语境理解能力：</strong>在特定文化框架下解读历史事件" },
    'histbench.difficulty_levels.title': { en: "2. Granular Difficulty Levels", zh: "二、精细化难度分级" },
    'histbench.difficulty_levels.p1': { en: "The benchmark incorporates three distinct difficulty levels to assess AI capabilities progressively:", zh: "本基准采用渐进式的三级难度分级科学地评估AI的历史研究能力：" },
    'histbench.difficulty_levels.li.basic': { en: "<strong>Basic (Level 1):</strong> Foundational knowledge and simple recall.", zh: "<strong>基础级：</strong>史实检索与基础认知" },
    'histbench.difficulty_levels.li.intermediate': { en: "<strong>Intermediate (Level 2):</strong> More complex analysis and synthesis.", zh: "<strong>进阶级：</strong>多模态史料分析与综合" },
    'histbench.difficulty_levels.li.challenging': { en: "<strong>Challenging (Level 3):</strong> Deep reasoning and nuanced understanding.", zh: "<strong>挑战级：</strong>深层推理与语境的精微理解" },
    'histbench.difficulty_levels.img_alt': { en: "Illustration of HistBench difficulty levels", zh: "HistBench 难度级别图示" },
    'histbench.difficulty_levels.caption': { en: "Figure 1. Visualization of HistBench's multi-level difficulty structure.", zh: "图 1. HistBench 多级难度结构可视化。" },
    'histbench.linguistic_diversity.title': { en: "3. Extensive Linguistic and Geographic Diversity", zh: "三、语言与地域覆盖广度" },
    'histbench.linguistic_diversity.p1': { en: "HistBench embraces the global nature of history, featuring content in <strong>29 languages</strong>:", zh: "考虑到历史研究的地域和文化广度，HistBench涉及了 <strong>29</strong> 种古今语言的史料：" },
    'histbench.linguistic_diversity.li.languages': { en: "Including English, Classical Chinese, Latin, Sanskrit, Old Uyghur, and many more, reflecting a wide range of historical scripts and linguistic contexts.", zh: "包括英语、中文（古文与现代文）、拉丁语、梵语、古回鹘语等应用范围广的或稀见小众的语言，全面呈现了不同历史时期的书写系统与文化语境，为跨文明研究提供了评估的基础。" },
    'histbench.linguistic_diversity.chart_caption': { en: "Figure 2. Distribution of languages within HistBench, highlighting its extensive linguistic coverage.", zh: "图 2. HistBench 内的语言分布，突显其广泛的语言覆盖范围。" },
    'histbench.linguistic_diversity.map_alt': { en: "Map illustrating the geographic coverage of sources in HistBench", zh: "展示 HistBench 史料地理覆盖范围的地图" },
    'histbench.linguistic_diversity.map_caption': { en: "Figure 3. Geographic coverage of historical sources referenced in HistBench.", zh: "图 3. HistBench 中引用的历史资料的地理覆盖范围。" },
    'histbench.multimodal_sources.title': { en: "4. Rich Multimodal Sources and Subfield Coverage", zh: "四、多模态史料与学科纵深" },
    'histbench.multimodal_sources.chart_caption': { en: "Figure 4. Distribution of material types within HistBench, showcasing its multimodal nature.", zh: "图 4. HistBench 内的材料类型分布，展示其多模态特性。" },
    'histbench.multimodal_sources.p1': { en: "The benchmark draws from a variety of source types and covers numerous historical disciplines:", zh: "基准涉及了多种史料类型与多个专业领域：" },
    'histbench.multimodal_sources.li.sources': { en: "<strong>Multimodal Sources:</strong> Incorporates data from manuscripts, inscriptions, images, audio, and video, challenging AI to process diverse information formats.", zh: "<strong>多模态史料体系：</strong>集成手稿、金石铭文、图像、影音等原始档案，检验AI多源信息处理能力" },
    'histbench.multimodal_sources.li.subfields': { en: "<strong>36+ Historical Subfields:</strong> Ensures broad thematic coverage, including areas like epigraphy, climate history, intellectual history, and material culture.", zh: "<strong>36+学科覆盖：</strong>囊括全球史、翻译史、生活史、气候史和物质文化史等前沿领域，构建了全景式评估框架" },
    'histbench.review_pipeline.title': { en: "5. Rigorous Multi-Stage Review Pipeline", zh: "五、三重协同审核机制" },
    'histbench.review_pipeline.p1': { en: "All questions in HistBench, especially the expert-curated subset, undergo a demanding three-stage review pipeline. This process combines human oversight with automated evaluation, designed to ensure academic rigor, task clarity, and effective model discriminability. A question is only admitted into the final release if it successfully passes all three stages:", zh: "本基准的所有题目均经严格的三重审核机制，结合了人工审查与AI预评，确保其学术严谨性、任务清晰度及对各模型的挑战性。被收入基准的问题必须完整通过以下三个阶段：" },
    'histbench.review_pipeline.li.stage1': { en: "<strong>Stage 1: Preliminary Screening (Format and Semantic Check):</strong> Initial validation for clarity, correctness, and appropriate formatting.", zh: "<strong>初筛校验：</strong>格式规范性与语义清晰度核验" },
    'histbench.review_pipeline.li.stage2': { en: "<strong>Stage 2: LLM-Based Pre-Evaluation & Filtering:</strong> AI-assisted identification of potential issues, ambiguities, or questions that may not effectively test intended reasoning skills.", zh: "<strong>智能预评：</strong>检测题目对现有主流LLM的挑战性" },
    'histbench.review_pipeline.li.stage3': { en: "<strong>Stage 3: Professional Review (Historical Rigor and Reasoning Validity):</strong> Final in-depth review and approval by domain experts to guarantee historical accuracy, scholarly soundness, and the validity of the reasoning required.", zh: "<strong>专家终审：</strong>历史学者确认史料的准确性、题目学术规范及现有LLM的推理逻辑" },
    'histbench.review_pipeline.img_alt': { en: "Diagram of the question review pipeline", zh: "问题审查流程图" },
    'histbench.review_pipeline.caption': { en: "Figure 5. The rigorous multi-stage question review pipeline for HistBench.", zh: "图 5. HistBench 严格的多阶段问题审查流程。" },
    'histbench.cta.access_dataset_hf': { en: "Access the HistBench Dataset on Hugging Face", zh: "在 Hugging Face 上访问 HistBench 数据集" },

    // HistBench Charts
    'histbench.charts.pie_chart_alt': { en: "A pie chart showing data distribution.", zh: "显示数据分布的饼图。" },
    'histbench.charts.other_label': { en: "Other Languages", zh: "其他语言" },
    'histbench.charts.table_header.category': { en: "Category", zh: "类别" },
    'histbench.charts.table_header.count': { en: "Count", zh: "数量" },
    'histbench.charts.table_header.percentage': { en: "Percentage", zh: "占比" },
    'histbench.charts.material.visual': { en: "Visual materials (illustrations, photos)", zh: "视觉材料（插图、照片）" },
    'histbench.charts.material.maps_schematics': { en: "Maps and schematics", zh: "地图与示意图" },
    'histbench.charts.material.charts_diagrams': { en: "Charts, diagrams, or tables", zh: "图表、图解或表格" },
    'histbench.charts.material.manuscripts': { en: "Manuscripts and handwritten sources", zh: "手稿与手写资料" },
    'histbench.charts.material.audio': { en: "Audio recordings", zh: "音频记录" },
    'histbench.charts.material.video': { en: "Video content", zh: "视频内容" },
    'histbench.charts.material.inscriptions': { en: "Inscriptions or stone rubbings", zh: "铭文或拓片" },
    'histbench.charts.material.text_based': { en: "Text-based questions (narrative excerpts)", zh: "基于文本的问题（叙事摘录）" },
    'histbench.charts.material.mixed_text_image': { en: "Mixed text + image sources", zh: "混合文本+图像资料" },
    'histbench.charts.material.ancient_scripts': { en: "Ancient or undeciphered scripts", zh: "古代或未破译文字" },
    'histbench.charts.language.english': { en: "English", zh: "英语" },
    'histbench.charts.language.chinese': { en: "Chinese", zh: "中文" },
    'histbench.charts.language.russian': { en: "Russian", zh: "俄语" },
    'histbench.charts.language.japanese': { en: "Japanese", zh: "日语" },
    'histbench.charts.language.french': { en: "French", zh: "法语" },
    'histbench.charts.language.latin': { en: "Latin", zh: "拉丁语" },
    'histbench.charts.language.german': { en: "German", zh: "德语" },
    'histbench.charts.language.classical_chinese': { en: "Classical Chinese", zh: "文言文" },
    'histbench.charts.language.dutch': { en: "Dutch", zh: "荷兰语" },
    'histbench.charts.language.tibetan': { en: "Tibetan", zh: "藏语" },
    'histbench.charts.language.armenian': { en: "Armenian", zh: "亚美尼亚语" },
    'histbench.charts.language.arabic': { en: "Arabic", zh: "阿拉伯语" },
    'histbench.charts.language.khitan': { en: "Khitan", zh: "契丹语" },
    'histbench.charts.language.ancient_greek': { en: "Ancient Greek", zh: "古希腊语" },
    'histbench.charts.language.khmer': { en: "Khmer", zh: "高棉语" },
    'histbench.charts.language.indonesian': { en: "Indonesian", zh: "印度尼西亚语" },
    'histbench.charts.language.old_tibetan': { en: "Old Tibetan", zh: "古藏语" },
    'histbench.charts.language.sanskrit': { en: "Sanskrit", zh: "梵语" },
    'histbench.charts.language.old_uyghur': { en: "Old Uyghur", zh: "古回鹘语" },
    'histbench.charts.language.middle_polish': { en: "Middle Polish", zh: "中古波兰语" },
    'histbench.charts.language.aramaic': { en: "Aramaic", zh: "阿拉姆语" },
    'histbench.charts.language.danish': { en: "Danish", zh: "丹麦语" },
    'histbench.charts.language.bosnian': { en: "Bosnian", zh: "波斯尼亚语" },
    'histbench.charts.language.italian': { en: "Italian", zh: "意大利语" },
    'histbench.charts.language.macedonian': { en: "Macedonian", zh: "马其顿语" },
    'histbench.charts.language.yukaghir': { en: "Yukaghir", zh: "尤卡吉尔语" },


    // HistBench Sample Questions Section
    'histbench.samples.section_title': { en: "Sample Questions by Level", zh: "按级别示例问题" },
    'histbench.samples.level1_title': { en: "Level 1 Samples (Basic)", zh: "1级示例（基础）" },
    'histbench.samples.level2_title': { en: "Level 2 Samples (Intermediate)", zh: "2级示例（进阶）" },
    'histbench.samples.level3_title': { en: "Level 3 Samples (Advanced)", zh: "3级示例（高级）" },
    'histbench.samples.prev_button': { en: "Previous", zh: "上一题" },
    'histbench.samples.next_button': { en: "Next", zh: "下一题" },
    'histbench.samples.question_counter': { en: "Question {current} of {total}", zh: "第 {current} / {total} 题" },

    'histbench.samples.difficulty_label': { en: "Difficulty Level", zh: "难度级别" },
    'histbench.samples.answer_type_label': { en: "Answer Type", zh: "答案类型" },
    'histbench.samples.question_label': { en: "Question", zh: "问题" },
    'histbench.samples.data_label': { en: "Data", zh: "数据" },
    'histbench.samples.answer_label': { en: "Answer", zh: "答案" },
    'histbench.samples.explanation_label': { en: "Explanation", zh: "解释" },
    'histbench.samples.source_reference_label': { en: "Source Reference", zh: "资料来源" },
    'histbench.samples.options_label': { en: "Options", zh: "选项" },
    'histbench.samples.correct_answer_label': { en: "Correct Answer", zh: "正确答案" },
    'histbench.samples.image_label': { en: "Illustration", zh: "插图" },

    // Level 1 - Sample 1 (Music History)
    'histbench.samples.level1.q1.title': { en: "Music History ID", zh: "音乐史识图题" },
    'histbench.samples.level1.q1.difficulty_level_display': { en: "Level 1", zh: "1级" },
    'histbench.samples.level1.q1.answer_type': { en: "Exact Match", zh: "精确匹配" },
    'histbench.samples.level1.q1.question': { en: "Which composer from which school of music in history wrote the “heart-shaped score” shown in the picture?", zh: "历史上哪所音乐学院的哪位作曲家创作了如图所示的“心形乐谱”？" },
    'histbench.samples.level1.q1.data': { en: "Illustrated musical manuscript (heart-shaped score)", zh: "图示乐谱手稿（心形乐谱）" },
    'histbench.samples.level1.q1.answer': { en: "Baude Cordier; Ars Subtilior", zh: "Baude Cordier; Ars Subtilior" },
    'histbench.samples.level1.q1.explanation': { en: "Cordier's rondeau about love, Belle, Bonne, Sage, is written in a heart shape, with red notes indicating rhythmic alterations, characteristic of the Ars Subtilior style.", zh: "科迪尔关于爱情的回旋曲《Belle, Bonne, Sage》是用心形写成的，红色的音符表示节奏的改变，这是“精细艺术”风格的特征。" },
    'histbench.samples.level1.q1.source_reference': { en: "Common knowledge; see e.g. https://en.wikipedia.org/wiki/Baude_Cordier", zh: "常识；例如参见 https://en.wikipedia.org/wiki/Baude_Cordier" },
    'histbench.samples.level1.q1.image1_alt': { en: "Heart-shaped musical score by Baude Cordier", zh: "Baude Cordier 的心形乐谱" },
    'histbench.samples.level1.q1.image1_caption': { en: "The 'Belle, Bonne, Sage' manuscript by Baude Cordier.", zh: "Baude Cordier 的《Belle, Bonne, Sage》手稿。" },

    // Level 1 - Sample 2 (Translator ID)
    'histbench.samples.level1.q2.title': { en: "Translator Identification", zh: "翻译者识别题" },
    'histbench.samples.level1.q2.difficulty_level_display': { en: "Level 1", zh: "1级" },
    'histbench.samples.level1.q2.answer_type': { en: "Exact Match", zh: "精确匹配" },
    'histbench.samples.level1.q2.question': { en: "Who are the translator of this text?\nThese poor villages, this sorry nature! Long suffering is native to you,\n land of our Russian people!...\n —Fedor Tyutchev (August 13, 1855), trans.", zh: "这段文字的翻译者是谁？\n这些贫困的村庄，这片不幸的土地！苦难与生俱来就属于你，\n我们俄罗斯人民的土地！...\n——费奥多尔·秋切夫（1855年8月13日），译。" },
    'histbench.samples.level1.q2.data': { en: "English translation of Tyutchev’s poem", zh: "秋切夫诗歌的英译本" },
    'histbench.samples.level1.q2.answer': { en: "F. Jude", zh: "F. Jude" },
    'histbench.samples.level1.q2.explanation': { en: "The translation is cited in Yegor Gaidar’s Russia: A Long View, where the translator is credited as F. Jude.", zh: "该译文引自盖达尔的《俄罗斯：长远视角》，其中译者署名为 F. Jude。" },
    'histbench.samples.level1.q2.source_reference': { en: "Yegor Gaidar. Russia: A Long View. The MIT Press, 2012, p.145", zh: "Yegor Gaidar. Russia: A Long View. The MIT Press, 2012, p.145" },

    // Level 2 - Sample 1 (Old Russian Manuscript)
    'histbench.samples.level2.q1.title': { en: "Medieval Russian Manuscript Interpretation", zh: "中古俄语手稿判读题" },
    'histbench.samples.level2.q1.difficulty_level_display': { en: "Level 2", zh: "2级" },
    'histbench.samples.level2.q1.answer_type': { en: "Multiple Choice", zh: "多项选择" },
    'histbench.samples.level2.q1.question': {
        en: "Разгадывайте этот документ и переводите берестяные грамоты на русский язык. Из этих переводов какие относительно бесспорные?\n(Interpret this document and translate the birchbark letters into Russian. Which of the following translations is relatively uncontroversial?)",
        zh: "Разгадывайте этот документ и переводите берестяные грамоты на русский язык. Из этих переводов какие относительно бесспорные?\n(解读这份文件并将桦树皮信件翻译成俄语。以下哪种翻译相对没有争议？)"
    },
    'histbench.samples.level2.q1.option_a': {
        en: "A. От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны в качестве процентов.",
        zh: "A. От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны в качестве процентов."
    },
    'histbench.samples.level2.q1.option_b': {
        en: "B. От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны на свою долю.",
        zh: "B. От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны на свою долю."
    },
    'histbench.samples.level2.q1.option_c': {
        en: "C. ѿ носъка къ мѣ‐стѧтѣ заожеричъ отрокъ лони крили соужъдалъцъ ходоу‐тиничъ възъми дъ‐вѣ гривънѣ на на‐мъ",
        zh: "C. ѿ носъка къ мѣ‐стѧтѣ заожеричъ отрокъ лони крили соужъдалъцъ ходоу‐тиничъ възъми дъ‐вѣ гривънѣ на на‐мъ"
    },
    'histbench.samples.level2.q1.option_d': {
        en: "D. От Носька к Местать. Заозерский отрок лони крили. Суздалец Ходот возьми две гривны на нам",
        zh: "D. От Носька к Местать. Заозерский отрок лони крили. Суздалец Ходот возьми две гривны на нам"
    },
    'histbench.samples.level2.q1.correct_answer': { en: "B", zh: "B" },
    'histbench.samples.level2.q1.data': { en: "Lead document found in Novgorod", zh: "诺夫哥罗德出土的铅片文书" },
    'histbench.samples.level2.q1.explanation': {
        en: "Свинцовая грамота No 1 (стратигр. кон. XI ñ 1 треть XII в., внестратигр. предпочт. первое 20-летие XII в.; Нерев. Е). Город: Новгород. Жанр: частное письмо. Содержание: От Носка к Местяте (о денежных делах). Письмо написано на свинцовой пластинке. По способу нанесения букв и по жанру оно столь сходно с берестяными грамотами, что мы считаем возможным рассматривать его в одном ряду с ними(в издании это письмо помещено после берестяной грамоты № 318 — НГБ V: 154-155). В разгадывании этой исключительно трудной грамоты участвовало много исследователей; история ее изучения подробно рассмотрена в статье Мароевич 1996. Там же предложена если и не совершенно бесспорная, то во всяком случае наиболее успешная, с нашей точки зрения, из многочисленных конкурирующих интерпретаций этой грамоты (которой мы и следуем ниже). В ней использованы наиболее надежные элементы предшествующих решений и предложена новая трактовка заключительной фразы. Перевод: ‛От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны в качестве процентов’. О других возможных интерпретациях см. указанную статью.",
        zh: "Свинцовая грамота No 1 (стратигр. кон. XI ñ 1 треть XII в., внестратигр. предпочт. первое 20-летие XII в.; Нерев. Е). Город: Новгород. Жанр: частное письмо. Содержание: От Носка к Местяте (о денежных делах). Письмо написано на свинцовой пластинке. По способу нанесения букв и по жанру оно столь сходно с берестяными грамотами, что мы считаем возможным рассматривать его в одном ряду с ними(в издании это письмо помещено после берестяной грамоты № 318 — НГБ V: 154-155). В разгадывании этой исключительно трудной грамоты участвовало много исследователей; история ее изучения подробно рассмотрена в статье Мароевич 1996. Там же предложена если и не совершенно бесспорная, то во всяком случае наиболее успешная, с нашей точки зрения, из многочисленных конкурирующих интерпретаций этой грамоты (которой мы и следуем ниже). В ней использованы наиболее надежные элементы предшествующих решений и предложена новая трактовка заключительной фразы. Перевод: ‛От Носка к Местяте. Заозерского отрока в прошлом году купили. Суздалец Ходутинич пусть возьмет две гривны в качестве процентов’. О других возможных интерпретациях см. указанную статью."
    },
    'histbench.samples.level2.q1.source_reference': { en: "●http://gramoty.ru/birchbark/document/show/novgorod/lead1/\n●http://gramoty.ru/thumbs/bibliography_file_supplement_dnd-2_a17.pdf", zh: "●http://gramoty.ru/birchbark/document/show/novgorod/lead1/\n●http://gramoty.ru/thumbs/bibliography_file_supplement_dnd-2_a17.pdf" },
    'histbench.samples.level2.q1.image1_alt': { en: "Novgorod lead document manuscript", zh: "诺夫哥罗德铅片文书手稿" },
    'histbench.samples.level2.q1.image1_caption': { en: "Lead document from Novgorod, late 11th - early 12th century.", zh: "诺夫哥罗德铅片文书，11世纪末至12世纪初。" },

    // Level 2 - Sample 2 (Han Dynasty Medicine)
    'histbench.samples.level2.q2.title': { en: "Han Dynasty Medical Text ID", zh: "汉代医学简牍识读题" },
    'histbench.samples.level2.q2.difficulty_level_display': { en: "Level 2", zh: "2级" },
    'histbench.samples.level2.q2.answer_type': { en: "Exact Match", zh: "精确匹配" },
    'histbench.samples.level2.q2.question': { en: "What kind of disease was the formula in the picture used to treat?", zh: "图中药方用于治疗何种疾病？" },
    'histbench.samples.level2.q2.data': { en: "Image of Han Dynasty medical bamboo slips", zh: "汉代医学简牍图片" },
    'histbench.samples.level2.q2.answer': { en: "Cough / Chronic Cough", zh: "咳嗽 / 久咳" },
    'histbench.samples.level2.q2.explanation': { en: "This prescription comes from the 'Han Dynasty Medical Slips' unearthed in Wuwei, Gansu, and is an ancient remedy for 'chronic cough with wheezing in the throat that sounds like a hundred insects'.", zh: "该处方出自甘肃武威出土的《汉代医简》，为治疗“久咳上气喉中如百虫鸣”之古代药方。" },
    'histbench.samples.level2.q2.source_reference': { en: "Gansu Provincial Museum and Wuwei County Cultural Center, eds., Wuwei Handai Yijian (Medical Slips of the Han Dynasty from Wuwei) (Beijing: Wenwu Chubanshe, 1975).", zh: "甘肃省博物馆、武威县文化馆编：《武威汉代医简》，文物出版社，1975年。" },
    'histbench.samples.level2.q2.image1_alt': { en: "Han Dynasty medical bamboo slips", zh: "汉代医学简牍" },
    'histbench.samples.level2.q2.image1_caption': { en: "Medical prescription from Han Dynasty bamboo slips.", zh: "汉代竹简上的药方。" },

    // Level 3 - Sample 1 (Arabic Poetry)
    'histbench.samples.level3.q1.title': { en: "Intercultural Citation ID (Arabic)", zh: "文化间引用识别题（阿拉伯文）" },
    'histbench.samples.level3.q1.difficulty_level_display': { en: "Level 3", zh: "3级" },
    'histbench.samples.level3.q1.answer_type': { en: "Exact Match", zh: "精确匹配" },
    'histbench.samples.level3.q1.question': {
        en: "هذه قصيدة للشاعر المصري حافظ إبراهيم،\n من هو الكاتب الغربي الذي ورد ذكره في هذه القصيدة؟\n(This is a poem by the Egyptian poet Hafez Ibrahim. Who is the Western writer mentioned in this poem?)",
        zh: "هذه قصيدة للشاعر المصري حافظ إبراهيم،\n من هو الكاتب الغربي الذي ورد ذكره في هذه القصيدة؟\n(这是埃及诗人哈菲兹·易卜拉欣的一首诗。这首诗中提到了哪位西方作家？)"
    },
    'histbench.samples.level3.q1.data': {
        en: "\"جاءَ وَالأحلامُ في أصفادِها\n طبعَ الظلمِ على إغلاقِها\n أمِنَ التقليدِ فيها فغدت\n إصرَ التقييدِ فيها ونُهى\n جاءَها هوجٌ بشَاوٍ دونَهُ\n وانبرى يصدَغُ من أغلالِها\"",
        zh: "\"جاءَ وَالأحلامُ في أصفادِها\n طبعَ الظلمِ على إغلاقِها\n أمِنَ التقليدِ فيها فغدت\n إصرَ التقييدِ فيها ونُهى\n جاءَها هوجٌ بشَاوٍ دونَهُ\n وانبرى يصدَغُ من أغلالِها\""
    },
    'histbench.samples.level3.q1.answer': { en: "Victor Hugo", zh: "维克多·雨果" },
    'histbench.samples.level3.q1.explanation': {
        en: "Hafez Ibrahim is a well-known Egyptian poet from the early 20th century, nicknamed the 'Poet of the Nile' and 'Poet of the People'. He translated Victor Hugo's novel Les Misérables, and this poem was titled 'Victor Hugo', as they shared a belief in liberating the poor from their shackles.",
        zh: " حافظ إبراهيم شاعر مصري معروف من أوائل القرن العشرين، لُقِّب بـ \"شاعر النيل\" و\"شاعر الشعب\". قام بترجمة رواية البؤساء لفكتور هوغو، وكانت هذه القصيدة بعنوان فكتور هوغو، حيث تشاركا الإيمان بتحرير الفقراء من قيودهم。"
    },
    'histbench.samples.level3.q1.source_reference': { en: "Victor Hugo, Hafez Ibrahim, al-Muqtaṭaf, 1 February 1906\nhttps://archive.alsharekh.org/magazineYears/107", zh: "Victor Hugo, Hafez Ibrahim, al-Muqtaṭaf, 1 February 1906\nhttps://archive.alsharekh.org/magazineYears/107" },

    // Level 3 - Sample 2 (Vedic Sanskrit)
    'histbench.samples.level3.q2.title': { en: "Religious Text ID (Vedic Sanskrit)", zh: "宗教文本识别题（吠陀梵语）" },
    'histbench.samples.level3.q2.difficulty_level_display': { en: "Level 3", zh: "3级" },
    'histbench.samples.level3.q2.answer_type': { en: "Multiple Choice", zh: "多项选择" },
    'histbench.samples.level3.q2.question': { en: "Who is the God that this Veda Hymn addresses?", zh: "这首吠陀赞美诗是写给哪位神的？" },
    'histbench.samples.level3.q2.option_a': { en: "A. Vajra", zh: "A. Vajra (伐折罗)" },
    'histbench.samples.level3.q2.option_b': { en: "B. Soma", zh: "B. Soma (苏摩)" },
    'histbench.samples.level3.q2.option_c': { en: "C. Uṣa", zh: "C. Uṣa (乌莎斯)" },
    'histbench.samples.level3.q2.option_d': { en: "D. Agni", zh: "D. Agni (阿耆尼)" },
    'histbench.samples.level3.q2.option_e': { en: "E. Indra", zh: "E. Indra (因陀罗)" },
    'histbench.samples.level3.q2.option_f': { en: "F. Marut", zh: "F. Marut (摩录多)" },
    'histbench.samples.level3.q2.option_g': { en: "G. Śiva", zh: "G. Śiva (湿婆)" },
    'histbench.samples.level3.q2.data': {
        en: "\"इ॒त्था हि सोम॒ इन्मदे॑ ब्र॒ह्मा च॒कार॒ वर्ध॑नम्\n शवि॑ष्ठ वज्रि॒न्नोज॑सा पृथि॒व्या निः श॑शा॒ अहि॒मर्च॒न्ननु॑ स्व॒राज्य॑म् \"",
        zh: "\"इ॒tha हि सोम॒ इन्मदे॑ ब्र॒ह्मा च॒कार॒ वर्ध॑नम्\n शवि॑ष्ठ वज्रि॒न्नोज॑सा पृथि॒व्या निः श॑शा॒ अहि॒मर्च॒न्ननु॑ स्व॒राज्य॑म् \""
    },
    'histbench.samples.level3.q2.correct_answer': { en: "E", zh: "E" },
    'histbench.samples.level3.q2.explanation': { en: "Several typical features are mentioned: thunder-armed, drive Dragon(Vṛtra) from the earth. Indra killed Vṛtra with his vajra.", zh: "提到了几个典型特征：手持雷霆，将巨龙（弗利多）从大地驱逐。因陀罗用他的伐折罗杀死了弗利多。" },
    'histbench.samples.level3.q2.source_reference': { en: "Rigveda 1.80.1, https://vedaweb.uni-koeln.de/rigveda/view/id/1.80.1", zh: "《梨俱吠陀》1.80.1, https://vedaweb.uni-koeln.de/rigveda/view/id/1.80.1" },

    // Level 3 - Sample 3 (Japanese Botany)
    'histbench.samples.level3.q3.title': { en: "Botanical History Comparison (Japanese)", zh: "植物学历史对比题（日文图谱）" },
    'histbench.samples.level3.q3.difficulty_level_display': { en: "Level 3", zh: "3级" },
    'histbench.samples.level3.q3.answer_type': { en: "Multiple Choice", zh: "多项选择" },
    'histbench.samples.level3.q3.question': {
        en: "以下は正倉院に所蔵されている厚朴と Engelhardia roxburghiana の顕微鏡下での構造図です。この記事の著者は、これらの2枚の画像を使ってどのような問題を説明していますか？\n(The following are microscopic structural diagrams of Magnolia obovata and Engelhardia roxburghiana preserved in Shosoin. What problem is the author of this article explaining using these two images?)",
        zh: "以下は正倉院に所蔵されている厚朴と Engelhardia roxburghiana の顕微鏡下での構造図です。この記事の著者は、これらの2枚の画像を使ってどのような問題を説明していますか？\n(以下是正仓院收藏的厚朴和 Engelhardia roxburghiana 的显微镜下结构图。本文作者使用这两张图片解释了什么问题？)"
    },
    'histbench.samples.level3.q3.option_a': { en: "A. The microscopic images are completely inconsistent, indicating they are not the same plant species.", zh: "A. 显微图像完全不一致，非同种植物" },
    'histbench.samples.level3.q3.option_b': { en: "B. The microscopic images are completely consistent, indicating they are the same plant species.", zh: "B. 显微图像完全一致，为同种植物" },
    'histbench.samples.level3.q3.option_c': { en: "C. The images are inconsistent due to different places of origin.", zh: "C. 图像不一致，因产地不同" },
    'histbench.samples.level3.q3.option_d': { en: "D. The images are inconsistent because long-term preservation has made the tissues brittle.", zh: "D. 图像不一致，因长年保存导致组织脆化" },
    'histbench.samples.level3.q3.option_e': { en: "E. The images are inconsistent due to errors in the experimental method.", zh: "E. 图像不一致，因实验方法有误" },
    'histbench.samples.level3.q3.data': { en: "Microscopic images of plant structures", zh: "植物结构显微图像" },
    'histbench.samples.level3.q3.correct_answer': { en: "D", zh: "D" },
    'histbench.samples.level3.q3.explanation': {
        en: "From the diagrams, the first image shows a difference between the two plants, while the second shows complete consistency, so B can be ruled out. Based on the text, this article considers the origin plant of the Magnolia obovata stored in the Shosoin to be Engelhardia roxburghiana. The reason for the discrepancy in the images is that the Shosoin's Magnolia obovata has been stored for a long time: 'However, the cross-section of 'Kōboku' (Magnolia obovata) has many crystal druses, whereas the cross-section of the bark of E. roxburghiana does not have many. It was found that this is because 'Kōboku' tissues became brittle from long-term storage, and the crystal druses that were lined up on the fiber surface peeled off and spread out.' Therefore, D is the correct answer.",
        zh: "図から見ると、第一の画像では二つの植物の影像に差異があり、第二の画像では二つの植物の影像が完全に一致しているため、Bは除外できます。テキストを元にすると、この記事では正倉院に所蔵されている厚朴の基原植物はEngelhardia roxburghianaであると考えています。論文に基づいて、影像に差異がある理由は、正倉院所蔵の厚朴が長期間保存されていたためです:「しかし、『厚朴』の横断面には多数の集晶が存在するのに対し、E. roxburghianaの樹皮の横断面にはあまり存在しないことが異なっている。これは『厚朴』は長期保存で組織が脆くなり、繊維の表面に並んでいた集晶が繊維面から剥がれて横に広がったためであることが分かった。」従って、Ｄはただしいこたえです。"
    },
    'histbench.samples.level3.q3.source_reference': { en: "CiNii Research Search Keywords: 正倉院 厚朴 Engelhardia roxburghiana\nPaper excerpt: “長期保存で組織が脆くなり…”\nKnowledge Domains: History of Science and Technology & Botany", zh: "CiNii Research 检索关键词: 正倉院 厚朴 Engelhardia roxburghiana\n论文原文：“長期保存で組織が脆くなり…”\n知识领域: 科学技术史与植物学" },
    'histbench.samples.level3.q3.image1_alt': { en: "Cross-section of Shosoin Magnolia obovata", zh: "正仓院厚朴横切面" },
    'histbench.samples.level3.q3.image1_caption': { en: "Microscopic cross-section of Magnolia obovata from Shosoin.", zh: "正仓院厚朴显微横切面。" },
    'histbench.samples.level3.q3.image2_alt': { en: "Longitudinal section of Shosoin Magnolia obovata", zh: "正仓院厚朴纵切面" },
    'histbench.samples.level3.q3.image2_caption': { en: "Microscopic longitudinal section of Magnolia obovata from Shosoin.", zh: "正仓院厚朴显微纵切面。" },

    // Level 3 - Sample 4 (Old Uyghur Text)
    'histbench.samples.level3.q4.title': { en: "Turkic Buddhist Translation History (Old Uyghur)", zh: "突厥文佛教翻译史题（维语转写）" },
    'histbench.samples.level3.q4.difficulty_level_display': { en: "Level 3", zh: "3级" },
    'histbench.samples.level3.q4.answer_type': { en: "Multiple Choice", zh: "多项选择" },
    'histbench.samples.level3.q4.question': { en: "Who is the samtso ačari mentioned in this Old Uighur text?", zh: "这段古维吾尔文文本中提到的 samtso ačari 是谁？" },
    'histbench.samples.level3.q4.option_a': { en: "A. Šilabaḍre", zh: "A. Šilabaḍre (戒贤)" },
    'histbench.samples.level3.q4.option_b': { en: "B. Faxian", zh: "B. Faxian (法显)" },
    'histbench.samples.level3.q4.option_c': { en: "C. Xuanzang", zh: "C. Xuanzang (玄奘)" },
    'histbench.samples.level3.q4.option_d': { en: "D. Šingqu Säli", zh: "D. Šingqu Säli (胜光法师)" },
    'histbench.samples.level3.q4.option_e': { en: "E. Aśoka", zh: "E. Aśoka (阿育王)" },
    'histbench.samples.level3.q4.data': {
        en: "šrirnalandaram-ka eltd[ilär] anta tägdökdä kamag [kuvrag] yıgılmıš ärdi, samt[so ačari] olar-nı birlä körüšü t[ükättök] dä š[ilaba]ḍre ačari bašınt[a][yegir]mi [a]čari-ka samtso ača]rig uduzturup…",
        zh: "šrirnalandaram-ka eltd[ilär] anta tägdökdä kamag [kuvrag] yıgılmıš ärdi, samt[so ačari] olar-nı birlä körüšü t[ükättök] dä š[ilaba]ḍre ačari bašınt[a][yegir]mi [a]čari-ka samtso ača]rig uduzturup…"
    },
    'histbench.samples.level3.q4.correct_answer': { en: "C", zh: "C" },
    'histbench.samples.level3.q4.explanation': {
        en: "The text mentions \"šrirnalandaram那爛陀\" and \"šilabaḍre戒賢\", which records the experience of Xuanzang in India. The translation of the text is available on VATEC: und geleiteten ihn in das śrīnālandārāma[-Kloster].(Als er dort ankam, war)(die) ganze Gemeinde (?) (versammelt). Nachdem der Tripiṭaka-Meister mit ihnen die Begrüßungs[zeremonie] vollzogen hatte, stellte man am [oberen] Ende, [wo] der Meister āryacandra (?) [saß], (einen speziellen Sitz) auf (und nötigte den Tripiṭaka-Meister) sich zu setzen ...(Dann befahl man) zwanzig ... Meistern,(den Tripiṭaka-)Meister zu geleiten, (und) ihn sich vor dem Meister (Dharmaguptaka) verneigen zu lassen. Dharmaguptaka ācārya (ist)(der [auf Chinesisch] Kaiken Lüši (genannte)śīlabhadra ācārya:",
        zh: "文本中提到了“šrirnalandaram那爛陀”和“šilabaḍre戒賢”，记录了玄奘在印度的经历。该文本的译文可在 VATEC 上找到：und geleiteten ihn in das śrīnālandārāma[-Kloster].(Als er dort ankam, war)(die) ganze Gemeinde (?) (versammelt). Nachdem der Tripiṭaka-Meister mit ihnen die Begrüßungs[zeremonie] vollzogen hatte, stellte man am [oberen] Ende, [wo] der Meister āryacandra (?) [saß], (einen speziellen Sitz) auf (und nötigte den Tripiṭaka-Meister) sich zu setzen ...(Dann befahl man) zwanzig ... Meistern,(den Tripiṭaka-)Meister zu geleiten, (und) ihn sich vor dem Meister (Dharmaguptaka) verneigen zu lassen. Dharmaguptaka ācārya (ist)(der [auf Chinesisch] Kaiken Lüši (genannte)śīlabhadra ācārya:"
    },
    'histbench.samples.level3.q4.source_reference': { en: "VATEC project Xuanzang-Biographie III\nhttps://vatec2.fkidg1.uni-frankfurt.de/vatecasp/Xuanzang-Biographie_III.htm", zh: "VATEC 项目 Xuanzang-Biographie III\nhttps://vatec2.fkidg1.uni-frankfurt.de/vatecasp/Xuanzang-Biographie_III.htm" },

    // HistAgent (About) Page
    'histagent.title': { en: "HistAgent", zh: "HistAgent" },
    'histagent.needs.title': { en: "The Need for Specialized Historical AI Evaluation", zh: "历史研究专用AI评估体系的必要性" },
    'histagent.needs.img_alt': { en: "Illustration of the complexities in historical research", zh: "历史研究复杂性图示" },
    'histagent.needs.p_all': { en: "<strong>While large language models have shown impressive results in fields like science and engineering, the humanities remain deeply underexplored.</strong> Among them, history is particularly challenging—requiring multimodal source interpretation, cross-cultural analysis, and contextual reasoning over incomplete or ambiguous evidence. Unlike factual disciplines, historical inquiry involves navigating heterogeneous data types (e.g., manuscripts, inscriptions, images), across diverse languages and time periods. It demands temporal reasoning, source criticism, and interpretation across modalities and perspectives. Generalist AI systems struggle with these demands, underscoring the need for domain-specific benchmarks and agents tailored to the epistemic and methodological features of historical research. HistBench and HistAgent together address this gap: the former provides a rigorous diagnostic framework for historical reasoning, and the latter demonstrates how specialized AI can emulate key aspects of human historical scholarship.", zh: "<strong>尽管大语言模型在科学与工程领域成就显著，人文学科仍存在深度探索不足的困境。</strong>历史学作为其中最具挑战性的学科，要求研究者具备多模态史料解读、跨文化分析及非完整证据语境推理能力，与注重事实的学科形成鲜明对比。\n历史研究的特殊性体现于三方面：\n其一，需要处理不同类型的资料，如手稿、碑刻、图像等，这些资料来自多个语言环境和历史时期，交织复杂；\n其二，研究过程中常常涉及时间顺序上的推理、对史料的分析判断，以及从多种信息形式中提取和整合观点的能力；\n其三，通用人工智能系统难以胜任这些任务，因此亟需建立贴合历史研究方法与认识特点的专门评估体系。\nHistBench与HistAgent协同破解此难题：前者建立历史推理能力的精密诊断框架，后者则通过专业化智能体，模拟人类历史研究中的核心认知过程。" },
    'histagent.tackling.title': { en: "HistAgent: Tackling the HistBench Challenge", zh: "HistAgent：攻克历史研究智能评估体系" },
    'histagent.tackling.img_alt': { en: "Conceptual representation of HistAgent", zh: "HistAgent 概念图" },
    'histagent.tackling.caption': { en: "Figure 1. The system architecture of HistAgent. A central Manager Agent coordinates OCR, web search, translation, literature retrieval, and multimodal analysis agents in a looped workflow to generate evidence-grounded, cited responses for complex historical tasks.", zh: "图 1. HistAgent 的系统架构。一个中央管理代理在循环工作流程中协调 OCR、网络搜索、翻译、文献检索和多模态分析代理，以便为复杂的历史任务生成有证据支持、有引用的响应。" },
    'histagent.tackling.p1_new': { en: "HistAgent is a domain-specific agent built to tackle the unique epistemological and technical challenges of historical research, with a design that transcends the limitations of general-purpose large model agents.", zh: "HistAgent 是面向历史研究中独特的认知与技术挑战而设计的专用智能体，其架构突破了通用大模型代理在这一领域中的能力限制。" },
    'histagent.tackling.h_arch': { en: "Core Architectural Innovations", zh: "核心架构创新" },
    'histagent.tackling.li_arch_1': { en: "<strong>Modular Tool Integration:</strong> Embeds a toolchain for manuscript OCR, reverse image search, multilingual translation, literature parsing, and document analysis.", zh: "<strong>模块化工具集成：</strong>嵌入手稿OCR、逆向图像检索、多语言翻译、文献解析与文档分析工具链" },
    'histagent.tackling.li_arch_2': { en: "<strong>Historiographical Interpretation Framework:</strong> Constructs a reasoning system by emulating the interpretive paradigms of human historians.", zh: "<strong>史学诠释框架：</strong>仿效人类史学家解读范式构建推理系统" },
    'histagent.tackling.li_arch_3': { en: "<strong>Central Coordination Mechanism:</strong> Led by a Manager Agent, it coordinates specialized agents via a Code-React loop to perform phased execution of evidence extraction → validation → synthesis.", zh: "<strong>中枢协同机制：</strong>由管理智能体（Manager Agent）主导，通过代码反应环（CodeAct）协调专业代理分阶段执行证据提取→验证→综合" },
    'histagent.tackling.h_caps': { en: "Core Capabilities Beyond Factual Recall", zh: "超越事实复现的核心能力" },
    'histagent.tackling.p_caps_intro': { en: "The agent achieves breakthroughs in three core dimensions of historiography:", zh: "智能体在三大史学核心维度实现突破：" },
    'histagent.tackling.li_caps_1': { en: "Multimodal source fusion", zh: "多模态史料融合" },
    'histagent.tackling.li_caps_2': { en: "Diachronic causal reasoning", zh: "历时性因果推理" },
    'histagent.tackling.li_caps_3': { en: "Cross-cultural contextual interpretation", zh: "跨文化语境阐释" },
    'histagent.tackling.p_caps_outro': { en: "—these key capabilities, commonly absent in current AI evaluation systems, are the very essence of historical research.", zh: "——这些当前AI评估体系普遍缺失的关键能力，正是历史研究的精髓所在。" },
    'histagent.tackling.h_perf': { en: "Empirical Performance Breakthroughs", zh: "实证性能突破" },
    'histagent.tackling.perf.accuracy.label': { en: "Historical Accuracy", zh: "历史准确性"},
    'histagent.tackling.perf.accuracy.value': { en: "Achieves Pass@1 of 27.54% and Pass@2 of 36.47% on HistBench, significantly outperforming general-purpose agents and base models.", zh: "HistBench测试中Pass@1达27.54%，Pass@2达36.47%，显著超越通用智能体及具有网络搜索能力的大模型"},
    'histagent.tackling.perf.multimodal.label': { en: "Multimodal Processing", zh: "多模态处理"},
    'histagent.tackling.perf.multimodal.value': { en: "Efficiently analyzes complex visual sources like handwritten texts, marginalia, and damaged scans.", zh: "高效解析手写文本、批注文献、损毁扫描件等复杂视觉史料"},
    'histagent.tackling.perf.context.label': { en: "Contextualized Reasoning", zh: "语境化推理"},
    'histagent.tackling.perf.context.value': { en: "Dynamically interprets sources within their socio-political, temporal, and linguistic contexts.", zh: "在社会政治、时代背景与语言情境中动态阐释史料"},
    'histagent.tackling.perf.robustness.label': { en: "Cross-Domain Robustness", zh: "跨领域泛化性"},
    'histagent.tackling.perf.robustness.value': { en: "Maintains 60% Pass@1 on the general GAIA benchmark, validating its generalizable reasoning capabilities.", zh: "在通用基准GAIA中保持60% Pass@1，验证普适推理能力"},
    'histagent.tackling.p_perf_conclusion': { en: "This achievement demonstrates that AI aligned with disciplinary methodologies can achieve performance leaps, paving a viable path for intelligent research in the humanities.", zh: "该成果证明：契合学科方法论的人工智能可实现性能跃迁，为人文学科的智能化研究开辟切实路径。" },

    // Impact Page
    'impact.title': { en: "Impact & Vision", zh: "影响与愿景" },
    'impact.advancing.title': { en: "Advancing Historical Research and Education with HistBench & HistAgent", zh: "HistBench与HistAgent：推动历史研究与教育变革" },
    'impact.advancing.img_alt': { en: "AI enhancing historical research and education", zh: "人工智能助力历史研究与教育" },
    'impact.advancing.p1': { en: "The synergistic development of HistBench as a robust evaluation standard and HistAgent as a highly capable AI model promises to transform how historical information is accessed, critically analyzed, and effectively taught:", zh: "这套以HistBench为评估基准，HistAgent为应用智能体的协同发展体系将重塑历史知识的获取、批判性分析与教育传播方式：" },
    'impact.advancing.h_researchers': { en: "Empowering Researchers", zh: "研究者赋能" },
    'impact.advancing.p_researchers': { en: "AI tools validated by HistBench can assist with:", zh: "通过HistBench验证的AI工具，可辅助：" },
    'impact.advancing.li_researchers_1': { en: "Intelligent filtering of vast archives", zh: "海量档案智能筛选" },
    'impact.advancing.li_researchers_2': { en: "In-depth excavation of historical patterns", zh: "历史规律深度挖掘" },
    'impact.advancing.h_educators': { en: "Innovating Education", zh: "教育革新" },
    'impact.advancing.p_educators': { en: "Interactive learning systems based on HistAgent provide students with:", zh: "基于HistAgent的交互式学习系统，为学生提供：" },
    'impact.advancing.li_educators_1': { en: "Personalized paths for historical exploration", zh: "个性化历史探索路径" },
    'impact.advancing.li_educators_2': { en: "Immersive experiences in source interpretation", zh: "沉浸式史料解读体验" },
    'impact.advancing.li_educators_3': { en: "A training ground for critical thinking", zh: "批判性思维训练场域" },
    'impact.advancing.h_public': { en: "Upgrading Public Cognition", zh: "公众认知升级" },
    'impact.advancing.p_public': { en: "Making historical knowledge:", zh: "让历史知识：" },
    'impact.advancing.li_public_1': { en: "More accessible", zh: "更易获取——突破专业壁垒" },
    'impact.advancing.li_public_2': { en: "More explorable", zh: "更可探索——构建时空导航" },
    'impact.advancing.li_public_3': { en: "More resonant", zh: "更具共鸣——培育集体记忆认知" },

    'impact.contributions.title': { en: "Core Innovations", zh: "核心创新贡献" },
    'impact.contributions.p_histbench': { en: "<strong>HistBench: A Domain-Specific Benchmark for Historical Reasoning</strong>", zh: "HistBench：历史推理专用评估基准" },
    'impact.contributions.p_histbench_desc': { en: "We introduce HistBench, the first benchmark explicitly designed to evaluate historical reasoning in AI. It includes 414 questions contributed by history scholars and students, spanning multiple languages, formats, and reasoning dimensions. All questions are grounded in authentic historical materials and rigorously reviewed.", zh: "• 全球首个AI历史推理能力评估体系\n• 集成414道史学者构建的权威题目，覆盖多语言/多模态/多推理维度\n• 所有问题基于原始史料，经三重学术验证（格式核验→LLM预评→专家终审）" },
    'impact.contributions.p_histagent': { en: "<strong>HistAgent: An Expert Agent for the History Domain</strong>", zh: "HistAgent：历史研究领域智能体" },
    'impact.contributions.p_histagent_desc': { en: "We present HistAgent, a history-specialized AI agent built on GPT-4o, equipped with a modular tool suite for OCR, translation, archival search, literature parsing, image provenance analysis, and more. It simulates the interpretive workflow of historians and outperforms generalist agents across historical benchmarks.", zh: "• 基于GPT-4o架构的领域专用智能体\n• 集成模块化工具链：\n手稿OCR｜多语翻译｜文献解析｜图像溯源｜档案检索\n• 仿史学家诠释工作流设计，历史基准测试性能显著超越通用模型" },
    'impact.contributions.p_empirical': { en: "<strong>Empirical Superiority</strong>", zh: "实证性能突破" },
    'impact.contributions.perf_table_html': {
        en: `
        <table class="perf-table">
            <thead>
                <tr>
                    <th>Benchmark</th>
                    <th>HistAgent Performance</th>
                    <th>Comparison Model</th>
                    <th>Relative Improvement</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="2">HistBench</td>
                    <td>Pass@1: 27.54%</td>
                    <td>GPT-4o (18.60%)</td>
                    <td>↑48%</td>
                </tr>
                <tr>
                    <td>Pass@2: 36.47%</td>
                    <td>ODR-smol (25.12%)</td>
                    <td>↑45%</td>
                </tr>
                <tr>
                    <td>HLE History Subset</td>
                    <td>28.6%</td>
                    <td>GPT-4o (8.9%)</td>
                    <td>↑221%</td>
                </tr>
                <tr>
                    <td>GAIA General Benchmark</td>
                    <td>Pass@1: 60%</td>
                    <td>-</td>
                    <td>Validates cross-domain capability</td>
                </tr>
            </tbody>
        </table>
    `,
        zh: `
        <table class="perf-table">
            <thead>
                <tr>
                    <th>评估基准</th>
                    <th>HistAgent表现</th>
                    <th>对比模型</th>
                    <th>相对提升</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="2">HistBench</td>
                    <td>Pass@1: 27.54%</td>
                    <td>GPT-4o (18.60%)</td>
                    <td>↑48%</td>
                </tr>
                <tr>
                    <td>Pass@2: 36.47%</td>
                    <td>ODR-smol(25.12%)</td>
                    <td>↑45%</td>
                </tr>
                <tr>
                    <td>HLE历史子集</td>
                    <td>28.6%</td>
                    <td>GPT-4o (8.9%)</td>
                    <td>↑221%</td>
                </tr>
                <tr>
                    <td>GAIA通用基准</td>
                    <td>Pass@1: 60%</td>
                    <td>-</td>
                    <td>验证跨域能力</td>
                </tr>
            </tbody>
        </table>
    `
     },

    'impact.pushing_frontiers.title': { en: "Pushing the Frontiers of AI through HistBench", zh: "以HistBench推动人工智能前沿发展" },
    'impact.pushing_frontiers.p1': { en: "The inherent complexities of historical data, meticulously encapsulated within HistBench, establish history as a fertile ground for advancing the frontiers of Artificial Intelligence:", zh: "历史数据独特的复杂性被精准地凝练于HistBench中，这使得历史学转变为推进人工智能前沿研究的沃土：领域专用基准HistBench的成功昭示，针对特定领域的知识开发专用基准具有不可替代的价值；攻克HistBench基准带来的时序逻辑、因果推理及矛盾信息处理等方面的挑战，可系统地训练AI的复杂推理能力；而值得警醒的是，基于历史数据的基准研究将伦理议题推向舞台中心——从数据偏差、阐释偏见到历史叙事选择，HistBench如同一面棱镜，迫使研究者直面人工智能参与文明记忆建构的责任与限度。" },

    'impact.future_outlook.title': { en: "Future Outlook", zh: "未来展望" },
    'impact.future_outlook.p_all': { en: "Our work with HistBench and HistAgent marks the beginning of an exciting journey. We envision a future where: AI agents, proven on rigorous benchmarks like HistBench, can act as sophisticated research assistants for historians. Interactive AI-driven platforms transform history education, making it more dynamic and personalized. AI contributes to the preservation and interpretation of cultural heritage on a global scale. The methodological insights and technological advancements from HistAgent and HistBench catalyze the creation of sophisticated AI tools for a wide array of complex humanities and social science disciplines. We are dedicated to advancing this pioneering research, continuously refining HistAgent, and strategically expanding HistBench, to further unlock the profound potential of AI in illuminating our collective past.", zh: "HistBench与HistAgent的研究标志着人工智能在人文社科中应用的开端，我们能够预见这样的未来：经严格基准验证的AI智能体将成为史学家专业研究的协作者；交互式AI平台将重塑历史教育，实现动态化与个性化的知识传授；人工智能将在全球范围内参与文化遗产的保存与阐释。更重要的是，HistAgent的技术突破与HistBench的框架设计将催化人文社科领域的范式革命——为哲学阐释、艺术批评和社会分析等专业领域建立专用智能评估体系。团队将矢志推进三大方向：持续优化HistAgent的功能模块、系统扩展HistBench的学科边界、深入探索AI照亮集体记忆深幽之处的实现路径。" },

    // Authors Page
    'authors.title': { en: "Meet the Team", zh: "团队介绍" },
    'authors.leadership_advisors.title': { en: "Research Leadership & Advisors", zh: "研究领导与顾问" },
    'authors.development_core_team.title': { en: "Lead Developers & Core Team", zh: "核心开发团队" },

    'authors.jiahao_qiu.name': { en: "Jiahao Qiu", zh: "裘嘉豪" },
    'authors.jiahao_qiu.role': { en: "Lead Developer, HistAgent & HistBench<br>Ph.D. Candidate, Princeton University", zh: "普林斯顿大学AI加速创新中心博士生" },
    'authors.jiahao_qiu.desc': { en: "Jiahao Qiu played a pivotal role in the conceptualization and development of the HistAgent system and the comprehensive HistBench benchmark. His work focuses on enhancing LLM capabilities for nuanced historical understanding and reasoning.", zh: "裘嘉豪在 HistAgent 系统和综合性 HistBench 基准的概念化和开发中发挥了关键作用。他的工作重点是增强大型语言模型在细致入微的历史理解和推理方面的能力。" },
    'authors.jiahao_qiu.profile_alt': { en: "Profile picture of Jiahao Qiu", zh: "裘嘉豪头像" },

    'authors.mengdi_wang.name': { en: "Mengdi Wang", zh: "王梦迪 教授" },
    'authors.mengdi_wang.role': { en: "Professor, Princeton University", zh: "普林斯顿大学" },
    'authors.mengdi_wang.desc': { en: "A leading figure at the intersection of science and artificial intelligence.Professor in the Department of Electrical and Computer Engineering and the Center for Statistics and Machine Learning at Princeton University.Co-director of the Princeton Accelerated AI Innovation Initiative.Former visiting researcher at DeepMind, the Institute for Advanced Study (IAS), and the Simons Institute for the Theory of Computing.", 
    zh: "科学与人工智能加速交叉的领军人物。普林斯顿大学电子与计算机工程系、统计与机器学习中心教授。普林斯顿大学AI加速创新中心联合主任。曾在 DeepMind、普林斯顿高等研究院（IAS）、Simons计算理论研究所担任访问研究员。" },
    'authors.mengdi_wang.profile_alt': { en: "Profile picture of Mengdi Wang", zh: "王梦迪头像" },
    'authors.xi_gao.name': { en: "Xi Gao", zh: "高晞 教授" },
    'authors.xi_gao.role': { 
        en: "Professor of History, Fudan University<br>Director, Specialized History Teaching and Research Section<br>Standing Council Member, Chinese Society for the History of Science and Technology<br>Vice Director, Medical History Committee, Chinese Society for the History of Science and Technology<br>Vice President, Shanghai Society for the History of Science and Technology", 
        zh: "复旦大学历史学系教授<br>复旦大学历史学系专门史教研室主任<br>中国科学技术史学会常务理事<br>中国科学技术史学会医学史专业委员会副主任<br>上海科学技术史学会副理事长" 
    },
    'authors.xi_gao.desc': { 
        en: "Her research centers on the history of science and technology, medical history, and Sino-foreign cultural exchange history. She has held visiting scholar positions at:Harvard-Yenching Institute (USA); University of Glasgow (UK); Universität Hamburg (Germany); Kansai University (Japan);École des Hautes Études en Sciences Sociales (France)",
        zh: "研究方向为科学技术史、医学史与中外文化交流史，曾任哈佛大学燕京学社访问学者、英国格拉斯哥大学、德国汉堡大学访问学者、日本关西大学访问学者以及法国高等社会科学院访问学者。" 
    },
    'authors.xi_gao.profile_alt': { en: "Profile picture of Xi Gao", zh: "高晞教授头像" },

    'authors.fulian_xiao.name': { en: "Fulian Xiao", zh: "肖馥莲" },
    'authors.fulian_xiao.role': { en: "Lead Developer, HistBench & HistAgent<br>Ph.D. Candidate, Fudan University; Visiting Student Research Collaborator, Princeton University", zh: "复旦大学历史学系博士生<br>普林斯顿大学访问学生研究合作者" },
    'authors.fulian_xiao.desc': { 
        en: "Fulian Xiao spearheaded the design of historical evaluation tasks and played a pivotal role in constructing the HistBench dataset while developing specialized agents under the HistAgent framework. Her work focused on innovating multimodal question formats, advancing source criticism methodology, and refining historical reasoning workflows. This initiative significantly enhanced the project’s alignment with authentic academic practices in the humanities.", 
        zh: "肖馥莲主导设计了历史评估任务，并在构建HistBench数据集与开发HistAgent框架下的专项智能体中发挥了关键作用。她的工作聚焦于创新多模态问题形式、深化史料批判方法及优化历史推理流程，推动项目紧密契合人文学科的真实学术实践。" 
    },
    'authors.fulian_xiao.profile_alt': { en: "Profile picture of Fulian Xiao", zh: "肖馥莲头像" },

    'authors.view_profile': { en: "View Profile", zh: "查看简介" },
    'authors.additional.title': { en: "Additional Contributors & Acknowledgements", zh: "其他贡献者与致谢" },
    'authors.additional.p1': { en: "The HistAgent project is the result of collaborative effort and has benefited from the insights and contributions of several other researchers and students. We extend our sincere gratitude to all team members who have dedicated their time and expertise.", zh: "HistAgent 项目是集体努力的成果，并受益于其他几位研究人员和学生的见解和贡献。我们向所有奉献时间和专业知识的团队成员表示诚挚的感谢。" },
    'authors.additional.p2_link_text': { en: "official publication on arXiv", zh: "arXiv 上的官方出版物" },
    'authors.additional.p2': { en: "For a complete list of authors and detailed acknowledgements, please refer to the <a href=\"{paperLink}\" target=\"_blank\" rel=\"noopener noreferrer\">{linkText}</a>.", zh: "有关作者的完整列表和详细致谢，请参阅 <a href=\"{paperLink}\" target=\"_blank\" rel=\"noopener noreferrer\">{linkText}</a>。" },

    // Submit Page
    'submit.page_title': { en: "Contribute to HistBench", zh: "为HistBench做贡献" },
    'submit.intro.title': { en: "Challenge the Limits of AI—With Your Historical Question", zh: "用你的历史问题挑战AI的极限" },
    'submit.intro.p1': { en: "Have you ever wondered—", zh: "你是否曾想过——" },
    'submit.intro.p2': { en: "Can AI read obscure or extinct languages?", zh: "AI能否阅读晦涩或已消亡的语言？" },
    'submit.intro.p3': { en: "Can it decode highly personal, stylized handwriting?", zh: "它能否解读高度个性化、风格化的手写体？" },
    'submit.intro.p4': { en: "Can it sense the emotion and cultural undercurrents beneath historical texts?", zh: "它能否感知历史文本下的情感和文化潜流？" },
    'submit.intro.p5': { en: "Can it reason like a scholar in handling professional historical problems?", zh: "在处理专业历史问题时，它能否像学者一样推理？" },
    'submit.intro.join_us': { en: "Join us in redefining the possibilities of AI in historical research.", zh: "加入我们，重新定义AI在历史研究中的可能性。" },

    'submit.stepper.step1': { en: "Guidelines", zh: "指南" },
    'submit.stepper.step2': { en: "Examples", zh: "示例" },
    'submit.stepper.step3': { en: "Submit", zh: "提交" },

    'submit.step1.title': { en: "Step 1: Submission Guidelines", zh: "第一步：提交指南" },
    'submit.step1.guidelines.title': { en: "Submission Guidelines", zh: "提交指南" },
    'submit.step1.types.title': { en: "Question Types", zh: "问题类型" },
    'submit.step1.types.em': { en: "<strong>Exact Match:</strong> For questions with a single, precise answer (e.g., a name, date, or term).", zh: "<strong>精确匹配：</strong>适用于具有单一、精确答案的问题（例如，姓名、日期或术语）。" },
    'submit.step1.types.mc': { en: "<strong>Multiple Choice:</strong> For questions requiring nuanced judgment where several options are provided.", zh: "<strong>多项选择：</strong>适用于需要细致判断并提供多个选项的问题。" },
    'submit.step1.dimensions.title': { en: "Reasoning Dimensions", zh: "推理维度" },
    'submit.step1.dimensions.bibliographic': { en: "Bibliographic Retrieval", zh: "文献检索" },
    'submit.step1.dimensions.source_id': { en: "Source Identification", zh: "史料甄别" },
    'submit.step1.dimensions.source_proc': { en: "Source Processing", zh: "史料解析" },
    'submit.step1.dimensions.hist_analysis': { en: "Historical Analysis", zh: "历史分析" },
    'submit.step1.dimensions.interdisciplinary': { en: "Interdisciplinary Integration", zh: "跨学科整合" },
    'submit.step1.levels.title': { en: "Difficulty Levels", zh: "难度级别" },
    'submit.step1.levels.l1': { en: "<strong>Level 1:</strong> General knowledge, printed texts, single-discipline reasoning.", zh: "<strong>1级：</strong>通用知识，印刷文本，单学科推理。" },
    'submit.step1.levels.l2': { en: "<strong>Level 2:</strong> Specialist knowledge, multimodal inputs, interdisciplinary.", zh: "<strong>2级：</strong>专业知识，多模态输入，跨学科。" },
    'submit.step1.levels.l3': { en: "<strong>Level 3:</strong> Obscure scripts/languages, handwritten documents, highly integrated multi-domain tasks.", zh: "<strong>3级：</strong>晦涩的文字/语言，手写文档，高度集成的多领域任务。" },

    'submit.step2.title': { en: "Step 2: Sample Gallery", zh: "第二步：示例展示" },
    'submit.step2.gallery_title': { en: "Sample Questions", zh: "示例问题" },
    
    'submit.step3.title': { en: "Step 3: Submit Your Question", zh: "第三步：提交您的问题" },
    'submit.step3.form.title': { en: "Submit Your Question", zh: "提交您的问题" },

    'submit.form.difficulty.label': { en: "Difficulty Level", zh: "难度级别" },
    'submit.form.difficulty.l1': { en: "Level 1", zh: "1级" },
    'submit.form.difficulty.l2': { en: "Level 2", zh: "2级" },
    'submit.form.difficulty.l3': { en: "Level 3", zh: "3级" },
    'submit.form.answer_type.label': { en: "Answer Type", zh: "答案类型" },
    'submit.form.answer_type.em': { en: "Exact Match", zh: "精确匹配" },
    'submit.form.answer_type.mc': { en: "Multiple Choice", zh: "多项选择" },
    'submit.form.question.label': { en: "Question Text", zh: "问题文本" },
    'submit.form.question.placeholder': { en: "Enter the full question text here...", zh: "在此输入完整的问题文本..." },
    'submit.form.data.label': { en: "Required Data", zh: "所需数据" },
    'submit.form.data.placeholder': { en: "Describe the source material (e.g., text excerpt, image context) or upload a file.", zh: "描述史料（例如，文本摘录、图像背景）或上传文件。" },
    'submit.form.data.upload_label': { en: "Upload File", zh: "上传文件" },
    'submit.form.answer.label': { en: "Answer", zh: "答案" },
    'submit.form.answer.placeholder': { en: "For Exact Match, enter the answer. For Multiple Choice, enter the correct option (e.g., C).", zh: "对于精确匹配，请输入答案。对于多项选择，请输入正确选项（例如，C）。" },
    'submit.form.explanation.label': { en: "Explanation", zh: "解释" },
    'submit.form.explanation.placeholder': { en: "Explain why the answer is correct and the reasoning involved.", zh: "解释为什么答案是正确的以及所涉及的推理。" },
    'submit.form.source.label': { en: "Source Reference", zh: "资料来源" },
    'submit.form.source.placeholder': { en: "Cite the book, database, URL, or other source.", zh: "引用书籍、数据库、网址或其他来源。" },
    'submit.form.thematic.label': { en: "Thematic Direction", zh: "主题方向" },
    'submit.form.thematic.placeholder': { en: "Describe the historical theme or methodology this question addresses.", zh: "描述此问题涉及的历史主题或方法论。" },
    'submit.form.name.label': { en: "Contributor Name", zh: "贡献者姓名" },
    'submit.form.name.placeholder': { en: "Your name, as you would like it to be credited.", zh: "您的姓名，以便署名。" },
    'submit.form.affiliation.label': { en: "Contributor Affiliation", zh: "贡献者单位" },
    'submit.form.affiliation.placeholder': { en: "Your university, institution, or organization.", zh: "您的大学、机构或组织。" },

    'submit.buttons.next': { en: "Next", zh: "下一步" },
    'submit.buttons.prev': { en: "Previous", zh: "上一步" },
    'submit.buttons.submit': { en: "Submit Question", zh: "提交问题" },
    'submit.buttons.submitting': { en: "Submitting...", zh: "提交中..." },

    'submit.messages.validation_error': { en: "Please fill out all required fields before submitting.", zh: "提交前请填写所有必填字段。" },
    'submit.messages.submitting_info': { en: "Submitting your question to the HistBench team for review.", zh: "正在将您的问题提交给HistBench团队进行审核。" },
    'submit.messages.success_title': { en: "Thank you for your contribution!", zh: "感谢您的贡献！" },
    'submit.messages.error_title': { en: "Submission Failed", zh: "提交失败" },
    'submit.messages.api_error': { en: "An unexpected error occurred. Please try again later.", zh: "发生意外错误。请稍后再试。" },


    // Image Modal
    'image_modal.close_aria_label': { en: "Close image viewer", zh: "关闭图片查看器" },
    'image_modal.default_alt': { en: "Enlarged image", zh: "放大图片" },
    'image_modal.enlarged_view_alt': { en: "Enlarged view", zh: "放大视图" },

    // Page Titles (for document.title)
    'page_title.home': { en: "Home | HistAI", zh: "首页 | HistAI" },
    'page_title.histbench': { en: "HistBench | HistAI", zh: "HistBench | HistAI" },
    'page_title.about': { en: "HistAgent | HistAI", zh: "HistAgent | HistAI" }, // 'about' key for HistAgent page
    'page_title.impact': { en: "Impact & Vision | HistAI", zh: "影响与展望 | HistAI" },
    'page_title.authors': { en: "Team | HistAI", zh: "团队 | HistAI" },
    'page_title.submit': { en: "Submit | HistAI", zh: "提交 | HistAI" },
};

export function t(key: TranslationKey, params?: Record<string, string | number>): string {
    const currentLanguage = useAppStore.getState().currentLanguage;
    const entry = translations[key];
    if (!entry) {
        console.warn(`Translation key "${key}" not found.`);
        return key; // Fallback to key if not found
    }

    let text = entry[currentLanguage] || entry.en; // Fallback to English if current language string is missing

    if (params) {
        for (const paramKey in params) {
            text = text.replace(`{${paramKey}}`, String(params[paramKey]));
        }
    }
    return text;
}
/**
 * 数字分身聊天机器人核心逻辑
 * 基于预设问答和知识库生成回复
 */

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// 预设问答库
const presetQA: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['介绍', '自己', '你是谁', '简介', '个人介绍'],
    answer:
      '我是朱君如,目前在香港大学读经济学专业硕士,本科就读于华南理工大学金融科技专业。曾经在招商证券研究发展中心做过宏观数据分析实习,通过对各类经济数据的处理与预测分析,充分锻炼了我严谨客观的数据分析思维。在技能上我熟练掌握 SQL、Python、Excel 等各类数据分析工具。此外,我在金融风险违约预测、用户流失因果推断的项目中充分锻炼了我的统计建模能力。',
  },
  {
    keywords: ['兴趣', '爱好', '喜欢', '业余', '休闲'],
    answer:
      '我想和你分享我的两个兴趣爱好:拉二胡和户外徒步~很多人对二胡的印象是婉转悲凉的,但其实它的表现力特别丰富,既能拉出《赛马》里万马奔腾的磅礴气势,也能演绎流行歌曲里的细腻温柔。今年是我和二胡相伴的第 15 年,它早就成了我生活里不可分割的一部分。对我来说,二胡不只是一个乐器,更是我表达情绪、和自己对话的方式,感觉累的时候拉上一曲,所有的疲惫都能被抚平。户外徒步是我来香港后培养的一个新的兴趣爱好。刚到这里的时候,我觉得这座处处都是高楼大厦的城市让我很压抑。但后面我发现这是一座一半是摩天高楼,一半是山海郊野的城市。截止目前,我已经去过了香港 6 个离岛,去看过麦理浩径的玻璃海,凤凰径的落日,大东山的芒草。这些来自大自然的能量补给,能够让我在运动完后以更充沛的精力投入到学习工作中。',
  },
  {
    keywords: ['崇拜', '偶像', '榜样', '敬佩', '黄仁勋'],
    answer:
      '当然有!我最崇拜的人是英伟达创始人黄仁勋。比起他如今一手缔造 AI 芯片帝国的传奇,真正让我敬佩的,是他身处谷底时的韧性和身处顶峰时的清醒。黄仁勋 5 岁那年因父亲工作变动举家迁居泰国,9 岁时被父母送上飞往美国的航班去投靠远亲,甚至进过收容问题少年的乡村学校。但即便如此,他也没有放弃求知的动力。在创业时期面临接连惨败、濒临破产的时候,他没有逃避认输,反而敢于认错、及时止损。而现在的他,也始终保持清醒,永远记得自己为什么出发,永远对市场、对技术、对未来抱有敬畏。',
  },
  {
    keywords: ['愿景', '目标', '理想', '未来', '梦想'],
    answer:
      '我觉得,数据分析不止是一份工作,更是一套理解世界的底层方法论。我希望自己永远保持用分析思维看待万事万物的习惯,永远带着对真相的好奇心,用数据刨根问底、深究因果。',
  },
  {
    keywords: ['联系', '电话', '邮箱', '微信', '联系方式'],
    answer:
      '我的电话:(+86) 18933383936,我的邮箱:2848796437@qq.com,君如期待你的联系~',
  },
];

// 知识库 - 用于生成自由回复
const knowledgeBase = {
  identity: '应届求职学生,香港大学经济学硕士在读,华南理工大学金融科技本科',
  jobTarget: '数据分析、数据科学、信贷风控',
  skills: 'SQL、Python、Excel、LightGBM、CatBoost、XGBoost、因果推断建模',
  internship: '招商证券研究发展中心宏观数据分析实习生(2024.12—2025.05)',
  projects: '用户流失因果推断 Uplift 建模、阿里云天池金融风险违约预测',
  hobbies: '拉二胡(15年)、户外徒步(香港离岛、麦理浩径、凤凰径、大东山)',
  idol: '英伟达创始人黄仁勋',
  vision: '用数据分析作为理解世界的底层方法论,永远保持对真相的好奇心',
  contact: '电话 (+86) 18933383936,邮箱 2848796437@qq.com',
};

/**
 * 匹配预设问答
 */
function matchPresetQA(question: string): string | null {
  const normalizedQuestion = question.toLowerCase().trim();

  for (const qa of presetQA) {
    for (const keyword of qa.keywords) {
      if (normalizedQuestion.includes(keyword)) {
        return qa.answer;
      }
    }
  }

  return null;
}

/**
 * 基于知识库生成回复
 */
function generateKnowledgeBasedReply(question: string): string {
  const normalizedQuestion = question.toLowerCase().trim();

  // 教育相关
  if (
    normalizedQuestion.includes('学校') ||
    normalizedQuestion.includes('大学') ||
    normalizedQuestion.includes('专业') ||
    normalizedQuestion.includes('学历') ||
    normalizedQuestion.includes('教育')
  ) {
    return '我本科就读于华南理工大学金融科技专业,目前在香港大学攻读经济学硕士学位。';
  }

  // 求职相关
  if (
    normalizedQuestion.includes('求职') ||
    normalizedQuestion.includes('工作') ||
    normalizedQuestion.includes('职位') ||
    normalizedQuestion.includes('岗位')
  ) {
    return '我目前正在寻找数据分析、数据科学或信贷风控相关的工作机会。';
  }

  // 技能相关
  if (
    normalizedQuestion.includes('技能') ||
    normalizedQuestion.includes('会什么') ||
    normalizedQuestion.includes('掌握') ||
    normalizedQuestion.includes('工具')
  ) {
    return '我熟练掌握 SQL、Python、Excel 等数据分析工具,以及 LightGBM、CatBoost、XGBoost 等机器学习模型,还有因果推断建模方法。';
  }

  // 实习相关
  if (
    normalizedQuestion.includes('实习') ||
    normalizedQuestion.includes('工作经历') ||
    normalizedQuestion.includes('经验')
  ) {
    return '我曾在招商证券研究发展中心担任宏观数据分析实习生(2024.12—2025.05),主要负责撰写月报周报和点评报告,分析国内外经济数据。';
  }

  // 项目相关
  if (
    normalizedQuestion.includes('项目') ||
    normalizedQuestion.includes('做过什么') ||
    normalizedQuestion.includes('案例')
  ) {
    return '我做过两个主要项目:一个是基于因果推断 Uplift 建模的用户流失干预与收益量化项目,另一个是阿里云天池学习赛的金融风险违约预测项目。';
  }

  // 二胡相关
  if (
    normalizedQuestion.includes('二胡') ||
    normalizedQuestion.includes('乐器') ||
    normalizedQuestion.includes('音乐')
  ) {
    return '我从小学习二胡,到今年已经 15 年了。二胡对我来说不只是一个乐器,更是我表达情绪、和自己对话的方式。';
  }

  // 徒步相关
  if (
    normalizedQuestion.includes('徒步') ||
    normalizedQuestion.includes('爬山') ||
    normalizedQuestion.includes('户外') ||
    normalizedQuestion.includes('运动')
  ) {
    return '我很喜欢户外徒步,来香港后去过 6 个离岛,还走过麦理浩径、凤凰径、大东山等地方。这些来自大自然的能量补给,让我能以更充沛的精力投入到学习工作中。';
  }

  // 默认回复
  return '这个问题有点超出我的知识范围啦,欢迎直接联系我哦~';
}

/**
 * 生成机器人回复
 */
export function generateBotReply(question: string): string {
  if (!question || question.trim().length === 0) {
    return '请输入你的问题哦~';
  }

  // 优先匹配预设问答
  const presetAnswer = matchPresetQA(question);
  if (presetAnswer) {
    return presetAnswer;
  }

  // 基于知识库生成回复
  return generateKnowledgeBasedReply(question);
}

/**
 * 生成欢迎消息
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome',
    content: '你好,我是 Sarah,很高兴认识你!有什么想了解我的,尽管问吧~',
    sender: 'bot',
    timestamp: new Date(),
  };
}

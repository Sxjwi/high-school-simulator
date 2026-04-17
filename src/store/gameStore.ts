import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 游戏数据结构
export interface Attributes {
  grades: number; // 成绩 0-100
  mindset: number; // 心态 0-100
  energy: number; // 体力 0-100
  social: number; // 人缘 0-100
  talent: number; // 才艺 0-100
  luck: number; // 运气 0-100
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'short' | 'long'; // 短期任务或长期任务
  condition: {
    type: 'attribute' | 'action' | 'day';
    target: string;
    value: number;
  };
  reward: {
    attributes?: Partial<Attributes>;
    actionPoints?: number;
  };
  completed: boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  effect: {
    attributes?: Partial<Attributes>;
    actionPoints?: number;
  };
  quantity: number;
}

export type Difficulty = 'easy' | 'normal' | 'hard';
export type GameDuration = 30 | 60 | 90 | 120;
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

// 关系系统
// 老师好感度系统
export interface TeacherRelationship {
  [key: string]: number;
}

// 同学关系系统
export interface ClassmateRelationship {
  [key: string]: number;
}

// 家人关系系统
export interface FamilyRelationship {
  [key: string]: number;
}

// 社团关系系统
export interface ClubRelationship {
  [key: string]: number;
}

// 课程系统
export interface Course {
  id: string;
  name: string;
  description: string;
  effect: Partial<Attributes>;
}

export interface Player {
  id: string;
  name: string;
  talent: string; // 天赋类型
  difficulty: Difficulty; // 难度级别
  duration: GameDuration; // 游戏时长
  day: number; // 当前天数
  season: Season; // 当前季节
  attributes: Attributes;
  achievements: string[]; // 成就ID列表
  actionPoints: number; // 行动点
  tasks: Task[]; // 任务列表
  items: Item[]; // 物品列表
  money: number; // 金钱
  teacherRelationship: TeacherRelationship; // 老师好感度
  classmateRelationship: ClassmateRelationship; // 同学关系
  familyRelationship: FamilyRelationship; // 家人关系
  clubRelationship: ClubRelationship; // 社团关系
  selectedCourses: string[]; // 已选择的课程
}

export interface Event {
  id: string;
  title: string;
  description: string;
  options: EventOption[];
  season?: Season | 'all'; // 事件所属季节，'all'表示所有季节
}

export interface EventOption {
  text: string;
  attributeChanges: Partial<Attributes>;
  relationshipChanges?: {
    teachers?: { [key: string]: number };
    classmates?: { [key: string]: number };
    family?: { [key: string]: number };
    clubs?: { [key: string]: number };
  };
}

export interface Ending {
  id: string;
  title: string;
  description: string;
  condition: {
    minGrades?: number;
    minMindset?: number;
    minEnergy?: number;
    minSocial?: number;
    minTalent?: number;
    minLuck?: number;
    maxGrades?: number;
    maxMindset?: number;
    maxEnergy?: number;
    maxSocial?: number;
    maxTalent?: number;
    maxLuck?: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: {
    type: 'attribute' | 'event' | 'day';
    target: string;
    value: number;
  };
}

// 天赋数据
export const talents = [
  {
    id: 'academic',
    name: '学术天才',
    description: '成绩属性成长倍率+20%',
    multipliers: { grades: 1.2, mindset: 1.0, energy: 0.9, social: 0.9, talent: 0.9, luck: 1.0 }
  },
  {
    id: 'social',
    name: '社交达人',
    description: '人缘属性成长倍率+20%',
    multipliers: { grades: 0.9, mindset: 1.0, energy: 1.0, social: 1.2, talent: 1.0, luck: 0.9 }
  },
  {
    id: 'creative',
    name: '艺术才子',
    description: '才艺属性成长倍率+20%',
    multipliers: { grades: 0.9, mindset: 1.0, energy: 0.9, social: 1.0, talent: 1.2, luck: 1.0 }
  },
  {
    id: 'lucky',
    name: '幸运儿',
    description: '运气属性成长倍率+20%',
    multipliers: { grades: 1.0, mindset: 1.0, energy: 1.0, social: 1.0, talent: 1.0, luck: 1.2 }
  },
  {
    id: 'athlete',
    name: '体育健将',
    description: '体力属性成长倍率+20%，运动效果提升',
    multipliers: { grades: 0.9, mindset: 1.1, energy: 1.2, social: 1.0, talent: 0.9, luck: 1.0 }
  },
  {
    id: 'business',
    name: '商业天才',
    description: '兼职收入+30%，运气+10%',
    multipliers: { grades: 1.0, mindset: 1.0, energy: 1.0, social: 1.1, talent: 0.9, luck: 1.1 }
  },
  {
    id: 'romantic',
    name: '恋爱高手',
    description: '人缘+15%，心情更容易保持',
    multipliers: { grades: 0.9, mindset: 1.15, energy: 1.0, social: 1.15, talent: 1.0, luck: 1.0 }
  },
  {
    id: 'nightowl',
    name: '夜猫子',
    description: '心态+15%，但体力-5%',
    multipliers: { grades: 1.0, mindset: 1.15, energy: 0.95, social: 1.0, talent: 1.0, luck: 1.0 }
  },
  {
    id: 'balanced',
    name: '均衡发展',
    description: '所有属性成长+5%，无短板',
    multipliers: { grades: 1.05, mindset: 1.05, energy: 1.05, social: 1.05, talent: 1.05, luck: 1.05 }
  }
];

// 行动数据
export const actions = [
  {
    id: 'study',
    name: '学习',
    cost: 2,
    baseChanges: { grades: 3, mindset: -1, energy: -2, social: 0, talent: 0, luck: 0 }
  },
  {
    id: 'rest',
    name: '休息',
    cost: 1,
    baseChanges: { grades: 0, mindset: 2, energy: 5, social: 0, talent: 0, luck: 0 }
  },
  {
    id: 'socialize',
    name: '社交',
    cost: 2,
    baseChanges: { grades: -1, mindset: 1, energy: -2, social: 3, talent: 0, luck: 0 }
  },
  {
    id: 'practice',
    name: '才艺练习',
    cost: 2,
    baseChanges: { grades: -1, mindset: 0, energy: -3, social: 0, talent: 3, luck: 0 }
  },
  {
    id: 'exercise',
    name: '运动',
    cost: 2,
    baseChanges: { grades: 0, mindset: 2, energy: 3, social: 1, talent: 0, luck: 0 }
  },
  {
    id: 'read',
    name: '阅读',
    cost: 1,
    baseChanges: { grades: 2, mindset: 1, energy: -1, social: 0, talent: 1, luck: 0 }
  },
  {
    id: 'part-time',
    name: '兼职',
    cost: 3,
    baseChanges: { grades: -2, mindset: -1, energy: -4, social: 2, talent: 0, luck: 1 }
  },
  {
    id: 'explore',
    name: '探索',
    cost: 2,
    baseChanges: { grades: 0, mindset: 1, energy: -3, social: 1, talent: 1, luck: 2 }
  },
  {
    id: 'competition',
    name: '参加竞赛',
    cost: 3,
    baseChanges: { grades: 4, mindset: -2, energy: -4, social: 1, talent: 2, luck: -1 }
  },
  {
    id: 'tutor',
    name: '辅导同学',
    cost: 2,
    baseChanges: { grades: 2, mindset: 2, energy: -2, social: 2, talent: 0, luck: 0 }
  },
  {
    id: 'volunteer',
    name: '志愿服务',
    cost: 2,
    baseChanges: { grades: 0, mindset: 3, energy: -3, social: 3, talent: 0, luck: 1 }
  },
  {
    id: 'learn_skill',
    name: '学习新技能',
    cost: 3,
    baseChanges: { grades: 1, mindset: 1, energy: -3, social: 0, talent: 4, luck: 0 }
  },
  {
    id: 'meditate',
    name: '冥想',
    cost: 1,
    baseChanges: { grades: 0, mindset: 4, energy: 2, social: 0, talent: 0, luck: 0 }
  }
];

// 随机事件数据
export const events = [
  {
    id: 'event1',
    title: '考试成绩公布',
    description: '你的期中考试成绩出来了，老师让你去办公室一趟。',
    options: [
      {
        text: '虚心接受批评，决心努力学习',
        attributeChanges: { grades: 5, mindset: -2, energy: 0, social: 0, talent: 0, luck: 0 }
      },
      {
        text: '无所谓，反正已经尽力了',
        attributeChanges: { grades: 0, mindset: 1, energy: 0, social: 0, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event2',
    title: '社团招新',
    description: '学校社团开始招新了，你对哪个社团感兴趣？',
    options: [
      {
        text: '加入学习社团',
        attributeChanges: { grades: 3, mindset: 1, energy: -1, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '加入艺术社团',
        attributeChanges: { grades: 0, mindset: 1, energy: -1, social: 2, talent: 3, luck: 0 }
      },
      {
        text: '加入体育社团',
        attributeChanges: { grades: 0, mindset: 1, energy: 2, social: 2, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event3',
    title: '校园活动',
    description: '学校组织了一场校园活动，你会参加吗？',
    options: [
      {
        text: '积极参加，展示自己',
        attributeChanges: { grades: 0, mindset: 2, energy: -2, social: 3, talent: 2, luck: 1 }
      },
      {
        text: '婉拒，专注学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event4',
    title: '朋友求助',
    description: '你的朋友遇到了困难，需要你的帮助。',
    options: [
      {
        text: '毫不犹豫地帮助他',
        attributeChanges: { grades: -1, mindset: 1, energy: -2, social: 4, talent: 0, luck: 0 }
      },
      {
        text: '找借口推脱',
        attributeChanges: { grades: 1, mindset: -2, energy: 1, social: -3, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event5',
    title: '考试压力',
    description: '期末考试临近，你感到压力很大，怎么办？',
    options: [
      {
        text: '制定详细的学习计划，严格执行',
        attributeChanges: { grades: 4, mindset: -1, energy: -3, social: -1, talent: 0, luck: 0 }
      },
      {
        text: '适当放松，保持良好心态',
        attributeChanges: { grades: 1, mindset: 3, energy: 2, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '向老师和同学寻求帮助',
        attributeChanges: { grades: 2, mindset: 2, energy: -1, social: 2, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event6',
    title: '校园恋爱',
    description: '有同学向你表白，你会如何回应？',
    options: [
      {
        text: '接受，开始一段校园恋情',
        attributeChanges: { grades: -2, mindset: 2, energy: -1, social: 3, talent: 0, luck: 1 }
      },
      {
        text: '拒绝，但保持朋友关系',
        attributeChanges: { grades: 0, mindset: 1, energy: 0, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '暂时不想谈恋爱，专注于学习',
        attributeChanges: { grades: 2, mindset: 0, energy: 0, social: -1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event7',
    title: '课外活动',
    description: '学校组织了一次校外参观活动，你可以选择参加。',
    options: [
      {
        text: '积极参加，拓展视野',
        attributeChanges: { grades: 0, mindset: 2, energy: -2, social: 2, talent: 1, luck: 1 }
      },
      {
        text: '请假留在学校学习',
        attributeChanges: { grades: 3, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      },
      {
        text: '参加但中途离开去做其他事情',
        attributeChanges: { grades: -1, mindset: 1, energy: -3, social: 1, talent: 1, luck: 2 }
      }
    ]
  },
  {
    id: 'event8',
    title: '家庭压力',
    description: '父母对你的学习成绩期望很高，给你带来了很大压力。',
    options: [
      {
        text: '与父母沟通，表达自己的感受',
        attributeChanges: { grades: 1, mindset: 3, energy: 1, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '更加努力学习，满足父母的期望',
        attributeChanges: { grades: 3, mindset: -2, energy: -3, social: -1, talent: 0, luck: 0 }
      },
      {
        text: '坚持自己的节奏，不受外界影响',
        attributeChanges: { grades: 1, mindset: 2, energy: 0, social: 0, talent: 0, luck: 1 }
      }
    ]
  },
  {
    id: 'event9',
    title: '意外机遇',
    description: '你偶然获得了一个参加市级比赛的机会，但是需要花费大量时间准备。',
    options: [
      {
        text: '全力以赴，争取好成绩',
        attributeChanges: { grades: 2, mindset: 2, energy: -4, social: 2, talent: 3, luck: 1 }
      },
      {
        text: '尝试参与，但不影响正常学习',
        attributeChanges: { grades: 1, mindset: 1, energy: -2, social: 1, talent: 2, luck: 0 }
      },
      {
        text: '放弃机会，专注于当前学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event10',
    title: '同学矛盾',
    description: '你与同学发生了矛盾，关系变得紧张。',
    options: [
      {
        text: '主动沟通，化解矛盾',
        attributeChanges: { grades: 0, mindset: 2, energy: -1, social: 3, talent: 0, luck: 0 }
      },
      {
        text: '保持距离，避免冲突',
        attributeChanges: { grades: 1, mindset: 1, energy: 0, social: -2, talent: 0, luck: 0 }
      },
      {
        text: '寻求老师帮助',
        attributeChanges: { grades: 0, mindset: 1, energy: 0, social: 1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event11',
    title: '老师家访',
    description: '老师突然要来你家家访，你感到有些紧张。',
    options: [
      {
        text: '认真准备，展示最好的一面',
        attributeChanges: { grades: 2, mindset: -1, energy: -2, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '平常心对待，真实展现自己',
        attributeChanges: { grades: 1, mindset: 2, energy: 0, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '找借口推脱，避免家访',
        attributeChanges: { grades: 0, mindset: -2, energy: 1, social: -1, talent: 0, luck: -1 }
      }
    ]
  },
  {
    id: 'event12',
    title: '发现新爱好',
    description: '你偶然发现了一个非常有趣的爱好，让你着迷。',
    options: [
      {
        text: '投入大量时间钻研',
        attributeChanges: { grades: -2, mindset: 3, energy: -1, social: 0, talent: 4, luck: 0 }
      },
      {
        text: '适当分配时间，平衡发展',
        attributeChanges: { grades: 0, mindset: 2, energy: 0, social: 1, talent: 2, luck: 1 }
      },
      {
        text: '浅尝辄止，专注当前学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: 0, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event13',
    title: '网络诱惑',
    description: '你发现了一款非常好玩的游戏，很难克制自己不去玩。',
    options: [
      {
        text: '卸载游戏，彻底断念',
        attributeChanges: { grades: 3, mindset: -2, energy: 1, social: 0, talent: 0, luck: 0 }
      },
      {
        text: '制定计划，合理安排时间',
        attributeChanges: { grades: 1, mindset: 2, energy: 0, social: 1, talent: 1, luck: 1 }
      },
      {
        text: '忍不住玩一会儿',
        attributeChanges: { grades: -2, mindset: 1, energy: -1, social: -1, talent: 0, luck: -1 }
      }
    ]
  },
  {
    id: 'event14',
    title: '生日惊喜',
    description: '今天是你的生日，同学们为你准备了惊喜派对。',
    options: [
      {
        text: '感动落泪，尽情享受',
        attributeChanges: { grades: -1, mindset: 5, energy: 1, social: 4, talent: 1, luck: 2 }
      },
      {
        text: '保持冷静，感谢大家',
        attributeChanges: { grades: 1, mindset: 3, energy: 0, social: 3, talent: 0, luck: 1 }
      },
      {
        text: '有些不好意思，提前离开',
        attributeChanges: { grades: 0, mindset: 0, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event15',
    title: '健康问题',
    description: '最近你感觉身体有些不舒服，需要做出选择。',
    options: [
      {
        text: '立即去医院检查',
        attributeChanges: { grades: -1, mindset: 1, energy: 3, social: 0, talent: 0, luck: 1 }
      },
      {
        text: '注意休息，观察几天',
        attributeChanges: { grades: 0, mindset: 0, energy: 2, social: 0, talent: 0, luck: 0 }
      },
      {
        text: '坚持学习，不在意身体',
        attributeChanges: { grades: 2, mindset: -2, energy: -3, social: 0, talent: 0, luck: -2 }
      }
    ]
  },
  {
    id: 'event16',
    title: '奖学金机会',
    description: '学校有一个奖学金评选机会，你需要决定是否参加。',
    options: [
      {
        text: '全力以赴争取',
        attributeChanges: { grades: 4, mindset: 1, energy: -3, social: 0, talent: 1, luck: 2 }
      },
      {
        text: '尝试参与但不勉强',
        attributeChanges: { grades: 2, mindset: 2, energy: -1, social: 1, talent: 0, luck: 1 }
      },
      {
        text: '觉得自己没戏，不参加',
        attributeChanges: { grades: 0, mindset: -1, energy: 1, social: 0, talent: 0, luck: -1 }
      }
    ]
  },
  {
    id: 'event17',
    title: '图书馆偶遇',
    description: '在图书馆你遇到了一个志同道合的同学。',
    options: [
      {
        text: '主动交流，成为朋友',
        attributeChanges: { grades: 2, mindset: 2, energy: -1, social: 3, talent: 1, luck: 2 }
      },
      {
        text: '微笑点头，保持距离',
        attributeChanges: { grades: 1, mindset: 1, energy: 0, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '专心学习，无视对方',
        attributeChanges: { grades: 2, mindset: 0, energy: 0, social: -1, talent: 0, luck: 0 }
      }
    ]
  },
  {
    id: 'event18',
    title: '家庭变故',
    description: '家里发生了一些事情，影响了你的心情。',
    options: [
      {
        text: '与家人共同面对',
        attributeChanges: { grades: -1, mindset: 3, energy: -2, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '专注学习，暂时忘记烦恼',
        attributeChanges: { grades: 2, mindset: -2, energy: 1, social: -1, talent: 0, luck: 0 }
      },
      {
        text: '找朋友倾诉',
        attributeChanges: { grades: -1, mindset: 2, energy: 0, social: 3, talent: 0, luck: 1 }
      }
    ]
  },
  {
    id: 'event19',
    title: '创意比赛',
    description: '学校举办创意比赛，你有一个不错的想法。',
    options: [
      {
        text: '精心准备，全力参赛',
        attributeChanges: { grades: -1, mindset: 2, energy: -3, social: 1, talent: 4, luck: 2 }
      },
      {
        text: '简单准备，参与即可',
        attributeChanges: { grades: 0, mindset: 1, energy: -1, social: 1, talent: 2, luck: 1 }
      },
      {
        text: '觉得想法不够好，放弃',
        attributeChanges: { grades: 1, mindset: -1, energy: 1, social: 0, talent: -1, luck: -1 }
      }
    ]
  },
  {
    id: 'event20',
    title: '时间管理',
    description: '你感觉时间总是不够用，需要更好地规划。',
    options: [
      {
        text: '制定详细计划表',
        attributeChanges: { grades: 3, mindset: 1, energy: 0, social: 0, talent: 1, luck: 1 }
      },
      {
        text: '提高效率，顺其自然',
        attributeChanges: { grades: 2, mindset: 2, energy: 1, social: 1, talent: 0, luck: 0 }
      },
      {
        text: '放弃一些活动，专注学习',
        attributeChanges: { grades: 3, mindset: -1, energy: 2, social: -2, talent: -1, luck: 0 }
      }
    ],
    season: 'all'
  },
  // 春季事件
  {
    id: 'event21',
    title: '春季运动会',
    description: '学校春季运动会开始了，你报名参加了什么项目？',
    options: [
      {
        text: '参加长跑比赛',
        attributeChanges: { grades: -1, mindset: 2, energy: -2, social: 3, talent: 0, luck: 1 }
      },
      {
        text: '参加短跑比赛',
        attributeChanges: { grades: -1, mindset: 3, energy: -3, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '作为观众加油助威',
        attributeChanges: { grades: 1, mindset: 1, energy: 0, social: 1, talent: 0, luck: 0 }
      }
    ],
    season: 'spring'
  },
  {
    id: 'event22',
    title: '春游',
    description: '班级组织春游，你会怎么度过这一天？',
    options: [
      {
        text: '积极参与各种活动',
        attributeChanges: { grades: 0, mindset: 4, energy: -2, social: 3, talent: 1, luck: 2 }
      },
      {
        text: '与朋友聊天交流',
        attributeChanges: { grades: 0, mindset: 3, energy: -1, social: 4, talent: 0, luck: 1 }
      },
      {
        text: '独自欣赏风景',
        attributeChanges: { grades: 1, mindset: 2, energy: 1, social: -1, talent: 2, luck: 1 }
      }
    ],
    season: 'spring'
  },
  // 夏季事件
  {
    id: 'event23',
    title: '夏日炎炎',
    description: '夏天到了，天气炎热，你会如何应对？',
    options: [
      {
        text: '坚持学习，不怕炎热',
        attributeChanges: { grades: 3, mindset: -1, energy: -3, social: 0, talent: 0, luck: 0 }
      },
      {
        text: '合理安排时间，避开高温',
        attributeChanges: { grades: 2, mindset: 2, energy: 0, social: 1, talent: 1, luck: 1 }
      },
      {
        text: '请假在家休息',
        attributeChanges: { grades: -2, mindset: 3, energy: 3, social: -1, talent: 0, luck: 0 }
      }
    ],
    season: 'summer'
  },
  {
    id: 'event24',
    title: '暑假计划',
    description: '暑假即将到来，你有什么计划？',
    options: [
      {
        text: '参加暑期补习班',
        attributeChanges: { grades: 4, mindset: -1, energy: -2, social: 0, talent: 0, luck: 1 }
      },
      {
        text: '出去旅游放松',
        attributeChanges: { grades: 0, mindset: 4, energy: 2, social: 3, talent: 1, luck: 2 }
      },
      {
        text: '在家自学新技能',
        attributeChanges: { grades: 2, mindset: 2, energy: 1, social: -1, talent: 3, luck: 1 }
      }
    ],
    season: 'summer'
  },
  // 秋季事件
  {
    id: 'event25',
    title: '开学季',
    description: '新学期开始了，你有什么新的目标？',
    options: [
      {
        text: '制定详细的学习计划',
        attributeChanges: { grades: 3, mindset: 2, energy: 0, social: 0, talent: 1, luck: 1 }
      },
      {
        text: '多参加社团活动',
        attributeChanges: { grades: 1, mindset: 2, energy: -1, social: 3, talent: 2, luck: 1 }
      },
      {
        text: '保持现状，稳步前进',
        attributeChanges: { grades: 1, mindset: 1, energy: 1, social: 1, talent: 1, luck: 0 }
      }
    ],
    season: 'autumn'
  },
  {
    id: 'event26',
    title: '秋季运动会',
    description: '学校秋季运动会开始了，你会参加吗？',
    options: [
      {
        text: '参加多个项目',
        attributeChanges: { grades: -2, mindset: 3, energy: -3, social: 3, talent: 0, luck: 2 }
      },
      {
        text: '参加一个项目',
        attributeChanges: { grades: -1, mindset: 2, energy: -2, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '当志愿者',
        attributeChanges: { grades: 0, mindset: 2, energy: -1, social: 3, talent: 0, luck: 1 }
      }
    ],
    season: 'autumn'
  },
  // 冬季事件
  {
    id: 'event27',
    title: '期末考试',
    description: '期末考试即将到来，你准备得如何？',
    options: [
      {
        text: '通宵复习',
        attributeChanges: { grades: 3, mindset: -2, energy: -3, social: -1, talent: 0, luck: 1 }
      },
      {
        text: '按计划复习',
        attributeChanges: { grades: 2, mindset: 1, energy: -1, social: 0, talent: 0, luck: 1 }
      },
      {
        text: '放松心态，正常发挥',
        attributeChanges: { grades: 1, mindset: 3, energy: 1, social: 1, talent: 0, luck: 0 }
      }
    ],
    season: 'winter'
  },
  {
    id: 'event28',
    title: '新年愿望',
    description: '新年到了，你有什么愿望？',
    options: [
      {
        text: '学业进步',
        attributeChanges: { grades: 2, mindset: 2, energy: 0, social: 0, talent: 0, luck: 1 }
      },
      {
        text: '交到更多朋友',
        attributeChanges: { grades: 0, mindset: 2, energy: 0, social: 3, talent: 0, luck: 1 }
      },
      {
        text: '发展兴趣爱好',
        attributeChanges: { grades: 0, mindset: 3, energy: 0, social: 1, talent: 3, luck: 1 }
      }
    ],
    season: 'winter'
  },
  // 新增通用事件
  {
    id: 'event29',
    title: '校园广播站',
    description: '校园广播站正在招聘新成员，你有兴趣加入吗？',
    options: [
      {
        text: '积极报名参加',
        attributeChanges: { grades: -1, mindset: 2, energy: -1, social: 3, talent: 2, luck: 1 }
      },
      {
        text: '先了解一下再说',
        attributeChanges: { grades: 0, mindset: 1, energy: 0, social: 1, talent: 1, luck: 0 }
      },
      {
        text: '没兴趣，专注学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ],
    season: 'all'
  },
  {
    id: 'event30',
    title: '音乐演出',
    description: '学校要举办音乐节，你想参与吗？',
    options: [
      {
        text: '报名表演节目',
        attributeChanges: { grades: -2, mindset: 2, energy: -3, social: 2, talent: 4, luck: 1 }
      },
      {
        text: '作为观众欣赏',
        attributeChanges: { grades: 0, mindset: 3, energy: 0, social: 2, talent: 1, luck: 1 }
      },
      {
        text: '留在教室学习',
        attributeChanges: { grades: 3, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ],
    season: 'all'
  },
  {
    id: 'event31',
    title: '校园义卖',
    description: '学校组织慈善义卖活动，你会如何参与？',
    options: [
      {
        text: '捐赠物品并积极参与',
        attributeChanges: { grades: -1, mindset: 3, energy: -2, social: 4, talent: 1, luck: 2 }
      },
      {
        text: '去逛逛买些东西',
        attributeChanges: { grades: 0, mindset: 2, energy: -1, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '不参与，继续学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, talent: 0, luck: -1 }
      }
    ],
    season: 'all'
  },
  // 新增春季事件
  {
    id: 'event32',
    title: '植树活动',
    description: '春天到了，学校组织植树活动，你要参加吗？',
    options: [
      {
        text: '积极参与植树',
        attributeChanges: { grades: -1, mindset: 3, energy: -2, social: 3, talent: 1, luck: 2 }
      },
      {
        text: '帮忙浇水施肥',
        attributeChanges: { grades: 0, mindset: 2, energy: -1, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '在旁边观看',
        attributeChanges: { grades: 1, mindset: 1, energy: 0, social: 0, talent: 0, luck: 0 }
      }
    ],
    season: 'spring'
  },
  // 新增夏季事件
  {
    id: 'event33',
    title: '泳池派对',
    description: '班级组织泳池派对，你会去参加吗？',
    options: [
      {
        text: '尽情玩耍，展现泳技',
        attributeChanges: { grades: -2, mindset: 4, energy: 2, social: 4, talent: 1, luck: 2 }
      },
      {
        text: '在岸边聊天，享受阳光',
        attributeChanges: { grades: -1, mindset: 3, energy: 1, social: 3, talent: 0, luck: 1 }
      },
      {
        text: '不去，在家学习',
        attributeChanges: { grades: 3, mindset: -1, energy: 2, social: -2, talent: 0, luck: -1 }
      }
    ],
    season: 'summer'
  },
  // 新增秋季事件
  {
    id: 'event34',
    title: '中秋赏月',
    description: '中秋节到了，班级组织赏月活动，你要参加吗？',
    options: [
      {
        text: '参加赏月晚会',
        attributeChanges: { grades: -1, mindset: 4, energy: 1, social: 3, talent: 1, luck: 2 }
      },
      {
        text: '和家人一起赏月',
        attributeChanges: { grades: 0, mindset: 3, energy: 2, social: 2, talent: 0, luck: 1 }
      },
      {
        text: '专心学习',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, talent: 0, luck: 0 }
      }
    ],
    season: 'autumn'
  },
  // 新增冬季事件
  {
    id: 'event35',
    title: '圣诞晚会',
    description: '学校举办圣诞晚会，你会如何度过？',
    options: [
      {
        text: '精心准备节目',
        attributeChanges: { grades: -2, mindset: 4, energy: -2, social: 4, talent: 3, luck: 2 },
        relationshipChanges: {
          classmates: { classmate1: 10, classmate2: 8, classmate3: 5 },
          clubs: { club2: 15 }
        }
      },
      {
        text: '参加晚会，享受氛围',
        attributeChanges: { grades: -1, mindset: 3, energy: 0, social: 3, talent: 1, luck: 1 },
        relationshipChanges: {
          classmates: { classmate1: 5, classmate2: 5, classmate3: 3 },
          teachers: { teacher5: 5 }
        }
      },
      {
        text: '在家复习备考',
        attributeChanges: { grades: 3, mindset: -1, energy: 1, social: -2, talent: 0, luck: -1 },
        relationshipChanges: {
          family: { family1: 5, family2: 5 },
          teachers: { teacher1: 8, teacher2: 8 }
        }
      }
    ],
    season: 'winter'
  },
  // 新增关系相关事件
  {
    id: 'event36',
    title: '同学聚会',
    description: '同学们组织了一次聚会，邀请你参加。',
    options: [
      {
        text: '积极参加，与大家一起玩',
        attributeChanges: { grades: -1, mindset: 3, energy: -2, social: 4, luck: 2 },
        relationshipChanges: {
          classmates: { classmate1: 15, classmate2: 10, classmate3: 8, classmate4: 12, classmate5: 8 }
        }
      },
      {
        text: '参加但早点离开',
        attributeChanges: { grades: 1, mindset: 2, energy: -1, social: 2, luck: 1 },
        relationshipChanges: {
          classmates: { classmate1: 5, classmate2: 5, classmate3: 3, classmate4: 5, classmate5: 3 }
        }
      },
      {
        text: '婉拒邀请，在家学习',
        attributeChanges: { grades: 3, mindset: -1, energy: 1, social: -3, luck: -1 },
        relationshipChanges: {
          classmates: { classmate1: -5, classmate2: -3, classmate3: -2, classmate4: -4, classmate5: -3 }
        }
      }
    ],
    season: 'all'
  },
  {
    id: 'event37',
    title: '家庭聚餐',
    description: '家人准备了一顿丰盛的晚餐，希望你能参加。',
    options: [
      {
        text: '准时参加，与家人共度美好时光',
        attributeChanges: { grades: -1, mindset: 4, energy: 1, social: 2, luck: 3 },
        relationshipChanges: {
          family: { family1: 15, family2: 15, family3: 10, family4: 10 }
        }
      },
      {
        text: '参加但带上作业',
        attributeChanges: { grades: 2, mindset: 2, energy: -1, social: 1, luck: 1 },
        relationshipChanges: {
          family: { family1: 5, family2: 5, family3: 3, family4: 3 }
        }
      },
      {
        text: '因为学习忙而不参加',
        attributeChanges: { grades: 3, mindset: -2, energy: 2, social: -2, luck: -2 },
        relationshipChanges: {
          family: { family1: -8, family2: -10, family3: -5, family4: -5 }
        }
      }
    ],
    season: 'all'
  },
  {
    id: 'event38',
    title: '社团招新',
    description: '学校社团开始招新，你对哪个社团感兴趣？',
    options: [
      {
        text: '加入学习社',
        attributeChanges: { grades: 3, mindset: 2, energy: -1, social: 2, luck: 1 },
        relationshipChanges: {
          clubs: { club1: 20 },
          classmates: { classmate3: 10 }
        }
      },
      {
        text: '加入艺术社',
        attributeChanges: { grades: -1, mindset: 3, energy: -1, social: 2, talent: 3, luck: 1 },
        relationshipChanges: {
          clubs: { club2: 20 },
          classmates: { classmate5: 10 }
        }
      },
      {
        text: '加入体育社',
        attributeChanges: { grades: -1, mindset: 3, energy: 2, social: 3, luck: 1 },
        relationshipChanges: {
          clubs: { club3: 20 },
          classmates: { classmate4: 10 }
        }
      },
      {
        text: '暂时不加入任何社团',
        attributeChanges: { grades: 2, mindset: -1, energy: 1, social: -1, luck: 0 },
        relationshipChanges: {
          clubs: { club1: -5, club2: -5, club3: -5, club4: -5, club5: -5 }
        }
      }
    ],
    season: 'all'
  }
];

// 结局数据
export const endings: Ending[] = [
  // 传统结局
  {
    id: 'ending1',
    title: '学霸之路',
    description: '你的努力得到了回报，以优异的成绩考入了顶尖大学。在大学期间，你继续保持着卓越的学术表现，成为了学校的佼佼者。毕业后，你顺利进入了世界500强企业，开启了辉煌的职业生涯。',
    condition: { minGrades: 80, minMindset: 60 }
  },
  {
    id: 'ending2',
    title: '社交明星',
    description: '你在高中建立了广泛的人脉，成为了学校的风云人物。你的社交能力让你在各个领域都如鱼得水，大学期间你成为了学生会主席，毕业后进入了公关行业，凭借出色的人际关系能力迅速崭露头角。',
    condition: { minSocial: 80, minEnergy: 60 }
  },
  {
    id: 'ending3',
    title: '艺术大师',
    description: '你的才艺得到了认可，成为了学校的艺术之星。大学期间你专注于艺术创作，举办了个人画展，毕业后成为了一名知名艺术家，你的作品被各大美术馆收藏，成为了艺术界的新星。',
    condition: { minTalent: 80, minMindset: 60 }
  },
  {
    id: 'ending4',
    title: '运动健将',
    description: '你在高中期间坚持运动，身体变得越来越强壮。大学期间你加入了校队，代表学校参加各种比赛，获得了多项荣誉。毕业后你成为了一名专业运动员，在赛场上绽放光芒。',
    condition: { minEnergy: 80, minSocial: 60 }
  },
  {
    id: 'ending5',
    title: '幸运儿',
    description: '你的运气一直很好，在高中期间遇到了很多机遇。大学期间你偶然发现了一个创业机会，凭借着好运和努力，你成功创办了自己的公司，成为了年轻的企业家。',
    condition: { minLuck: 80, minMindset: 60 }
  },
  {
    id: 'ending6',
    title: '平凡生活',
    description: '你度过了平静而充实的高中生活，为未来打下了坚实的基础。大学期间你选择了一个自己喜欢的专业，毕业后找到了一份稳定的工作，过着平凡而幸福的生活。',
    condition: { minGrades: 60, minMindset: 60, minEnergy: 60, minSocial: 60, minTalent: 60, minLuck: 60 }
  },
  // 新系统相关结局
  {
    id: 'ending7',
    title: '任务大师',
    description: '你完成了所有的任务，展现了出色的规划和执行能力。大学期间你成为了社团的核心成员，毕业后进入了管理咨询行业，凭借出色的项目管理能力迅速晋升。',
    condition: { minGrades: 70, minMindset: 70, minSocial: 70 }
  },
  {
    id: 'ending8',
    title: '商业精英',
    description: '你善于管理金钱和资源，通过购买和使用道具优化自己的发展。大学期间你开始创业，毕业后成功创办了自己的公司，成为了年轻的商业领袖。',
    condition: { minGrades: 65, minSocial: 75, minLuck: 70 }
  },
  {
    id: 'ending9',
    title: '考试状元',
    description: '你在所有考试中都取得了优异的成绩，成为了学校的传奇。大学期间你获得了全额奖学金，毕业后进入了科研机构，成为了一名杰出的科学家。',
    condition: { minGrades: 85, minMindset: 70, minLuck: 60 }
  },
  {
    id: 'ending10',
    title: '全面发展',
    description: '你在各个方面都表现出色，是真正的全能型人才。大学期间你成为了多面手，毕业后选择了一份能够发挥你综合能力的工作，成为了行业的佼佼者。',
    condition: { minGrades: 75, minMindset: 75, minEnergy: 75, minSocial: 75, minTalent: 75, minLuck: 75 }
  },
  {
    id: 'ending11',
    title: '挑战成功者',
    description: '你在困难难度下完成了游戏，展现了非凡的毅力和能力。大学期间你选择了具有挑战性的专业，毕业后进入了高压力的行业，凭借出色的抗压能力取得了成功。',
    condition: { minGrades: 70, minMindset: 80, minEnergy: 70 }
  },
  // 物品制作相关结局
  {
    id: 'ending12',
    title: '工匠大师',
    description: '你在游戏中展现了出色的制作能力，制作了许多有用的物品。大学期间你选择了工程或设计专业，毕业后成为了一名杰出的工匠，你的作品受到了广泛的认可。',
    condition: { minTalent: 70, minSocial: 60, minLuck: 60 }
  },
  // 季节相关结局
  {
    id: 'ending13',
    title: '季节旅行者',
    description: '你经历了高中的四季变化，每个季节都过得充实而有意义。大学期间你选择了地理或环境科学专业，毕业后成为了一名旅行家或环保工作者，探索世界各地的自然风光。',
    condition: { minMindset: 75, minEnergy: 70, minLuck: 70 }
  },
  // 课程相关结局
  {
    id: 'ending14',
    title: '博学多才',
    description: '你在高中期间尝试了各种课程，培养了广泛的兴趣爱好。大学期间你选择了双学位或多学科专业，毕业后成为了一名跨界专家，在多个领域都有所建树。',
    condition: { minGrades: 70, minTalent: 70, minSocial: 70 }
  },
  // 老师好感度相关结局
  {
    id: 'ending15',
    title: '师生典范',
    description: '你与老师们建立了深厚的感情，得到了他们的认可和支持。大学期间你选择了教育专业，毕业后回到母校成为了一名优秀的教师，传承着教育的火种。',
    condition: { minGrades: 65, minSocial: 80, minMindset: 75 }
  },
  // 综合结局
  {
    id: 'ending16',
    title: '完美人生',
    description: '你在高中期间全面发展，各方面都表现出色。大学期间你成为了学生会主席，毕业后进入了顶尖企业，凭借出色的综合能力迅速晋升，成为了年轻的行业领袖。',
    condition: { minGrades: 85, minMindset: 85, minEnergy: 85, minSocial: 85, minTalent: 85, minLuck: 85 }
  },
  // 新天赋相关结局
  {
    id: 'ending17',
    title: '奥运冠军',
    description: '你在高中期间展现了出色的体育天赋，大学期间加入了国家队，代表国家参加奥运会并获得了金牌。毕业后你成为了一名传奇运动员，激励了无数年轻人。',
    condition: { minEnergy: 85, minMindset: 75, minLuck: 70 }
  },
  {
    id: 'ending18',
    title: '创业新贵',
    description: '你在高中期间就展现了商业头脑，大学期间开始创业，凭借出色的商业嗅觉和努力，你成功创办了一家知名企业，成为了年轻的创业新贵。',
    condition: { minSocial: 80, minLuck: 80, minMindset: 70 }
  },
  {
    id: 'ending19',
    title: '校园爱情',
    description: '你在高中期间遇到了生命中的另一半，两人共同成长，互相支持。大学毕业后你们结婚了，过上了幸福美满的生活，成为了人人羡慕的一对。',
    condition: { minSocial: 85, minMindset: 80, minLuck: 75 }
  },
  {
    id: 'ending20',
    title: '夜行者',
    description: '你习惯了夜间活动，在夜晚你总是灵感迸发。大学期间你选择了创意行业，成为了一名知名的夜间工作者，你的作品总是在深夜完成，却惊艳了整个世界。',
    condition: { minMindset: 85, minTalent: 75, minLuck: 70 }
  },
  {
    id: 'ending21',
    title: '全科医生',
    description: '你均衡发展，各方面都有不错的基础。大学期间你选择了医学专业，毕业后成为了一名全科医生，能够处理各种病症，受到了患者的广泛信赖。',
    condition: { minGrades: 70, minMindset: 70, minEnergy: 70, minSocial: 70, minTalent: 70, minLuck: 70 }
  },
  // 特殊结局
  {
    id: 'ending22',
    title: '高考状元',
    description: '你在所有考试中都取得了优异的成绩，最终以全省第一的成绩考入了顶尖大学。在大学期间你继续保持着卓越的学术表现，获得了多项荣誉，成为了学术界的新星。',
    condition: { minGrades: 95, minMindset: 80, minLuck: 75 }
  },
  {
    id: 'ending23',
    title: '校园传奇',
    description: '你的名字在校园里无人不知，无人不晓。你不仅成绩优异，还在各个领域都有所建树，成为了学校的传奇人物。多年后，你的故事还在一届届学生中流传。',
    condition: { minGrades: 80, minSocial: 90, minTalent: 80, minMindset: 80 }
  },
  {
    id: 'ending24',
    title: '浪漫青春',
    description: '你的高中生活充满了浪漫色彩，你经历了许多美好的故事，留下了珍贵的回忆。这些经历让你变得更加成熟和感性，也为你未来的人生增添了许多色彩。',
    condition: { minSocial: 90, minMindset: 85, minLuck: 80 }
  },
  {
    id: 'ending25',
    title: '体育明星',
    description: '你在高中期间体育成绩突出，多次打破校纪录。大学期间你成为了校队的核心队员，带领球队获得了多项荣誉。毕业后你成为了一名职业运动员，在赛场上绽放光芒。',
    condition: { minEnergy: 90, minSocial: 70, minMindset: 75 }
  },
  // 遗憾和特殊结局
  {
    id: 'ending26',
    title: '成长的烦恼',
    description: '你的高中生活并不完美，你遇到了许多挫折和困难。但正是这些经历让你学会了成长，变得更加坚强。虽然结局不够完美，但你收获了宝贵的人生经验。',
    condition: { minGrades: 40, minMindset: 50, maxGrades: 60 }
  },
  {
    id: 'ending27',
    title: '重新出发',
    description: '高中生活结束了，但你感觉自己还没有准备好。没关系，人生不是一场短跑，而是一场马拉松。你选择了重读一年，给自己更多时间准备，这一次你一定会做得更好！',
    condition: { minGrades: 30, maxGrades: 50, minMindset: 40 }
  },
  // 关系相关结局
  {
    id: 'ending28',
    title: '校园社交王',
    description: '你在高中期间建立了广泛的社交网络，与同学们关系融洽，是学校的社交明星。大学期间你成为了学生会骨干，毕业后进入了公关行业，凭借出色的人际关系能力迅速崭露头角。',
    condition: { minSocial: 90, minMindset: 70 }
  },
  {
    id: 'ending29',
    title: '家庭和谐',
    description: '你与家人保持着良好的关系，家庭氛围温馨和谐。你的家庭支持是你最大的动力，让你在高中期间能够安心学习，最终取得了理想的成绩，考入了心仪的大学。',
    condition: { minGrades: 75, minMindset: 80 }
  },
  {
    id: 'ending30',
    title: '社团领袖',
    description: '你在高中期间积极参与社团活动，成为了社团的核心成员，甚至担任了社团负责人。你的领导能力和团队精神得到了锻炼，大学期间你继续活跃在社团活动中，成为了校园的风云人物。',
    condition: { minSocial: 85, minTalent: 70, minMindset: 75 }
  },
  {
    id: 'ending31',
    title: '师生情深',
    description: '你与老师们建立了深厚的感情，得到了他们的悉心指导和支持。老师们对你的认可和鼓励成为你前进的动力，最终你以优异的成绩毕业，并在老师们的推荐下获得了宝贵的机会。',
    condition: { minGrades: 80, minSocial: 75, minMindset: 80 }
  }
];

// 课程数据
export const courses: Course[] = [
  {
    id: 'math',
    name: '数学提高班',
    description: '专注于数学成绩提升',
    effect: { grades: 2, talent: -1 }
  },
  {
    id: 'art',
    name: '艺术选修课',
    description: '培养艺术才能',
    effect: { talent: 3, grades: -1 }
  },
  {
    id: 'pe',
    name: '体育课程',
    description: '增强体质',
    effect: { energy: 2, social: 1 }
  },
  {
    id: 'social',
    name: '社交技能课',
    description: '提升社交能力',
    effect: { social: 3, grades: -1 }
  },
  {
    id: 'philosophy',
    name: '哲学思考课',
    description: '培养心态和思考能力',
    effect: { mindset: 3, luck: 1 }
  }
];

// 老师数据
export const teachers = [
  { id: 'teacher1', name: '王老师', subject: '数学' },
  { id: 'teacher2', name: '李老师', subject: '语文' },
  { id: 'teacher3', name: '张老师', subject: '英语' },
  { id: 'teacher4', name: '刘老师', subject: '体育' },
  { id: 'teacher5', name: '陈老师', subject: '艺术' }
];

// 同学数据
export const classmates = [
  { id: 'classmate1', name: '小明', personality: '活泼开朗' },
  { id: 'classmate2', name: '小红', personality: '安静内向' },
  { id: 'classmate3', name: '小李', personality: '学习优秀' },
  { id: 'classmate4', name: '小张', personality: '运动健将' },
  { id: 'classmate5', name: '小王', personality: '艺术细胞' }
];

// 家人数据
export const familyMembers = [
  { id: 'family1', name: '爸爸', relationship: '父亲' },
  { id: 'family2', name: '妈妈', relationship: '母亲' },
  { id: 'family3', name: '哥哥', relationship: '兄弟' },
  { id: 'family4', name: '姐姐', relationship: '姐妹' }
];

// 社团数据
export const clubs = [
  { id: 'club1', name: '学习社', description: '专注于学术研究' },
  { id: 'club2', name: '艺术社', description: '培养艺术才能' },
  { id: 'club3', name: '体育社', description: '发展体育特长' },
  { id: 'club4', name: '文学社', description: '提高文学素养' },
  { id: 'club5', name: '科技社', description: '探索科学技术' }
];

// 周末活动数据
export const weekendActivities = [
  {
    id: 'weekend1',
    title: '家庭聚餐',
    description: '和家人一起享受美食',
    options: [
      { text: '主动帮忙准备', attributeChanges: { mindset: 3, social: 2, energy: -1 } },
      { text: '坐享其成', attributeChanges: { energy: 2, mindset: -1 } }
    ]
  },
  {
    id: 'weekend2',
    title: '图书馆学习',
    description: '周末去图书馆学习',
    options: [
      { text: '认真学习一整天', attributeChanges: { grades: 5, energy: -3, mindset: 1 } },
      { text: '学习一会儿就休息', attributeChanges: { grades: 2, energy: 1, mindset: 2 } }
    ]
  },
  {
    id: 'weekend3',
    title: '朋友聚会',
    description: '和朋友们一起出去玩',
    options: [
      { text: '积极参与活动', attributeChanges: { social: 4, energy: -2, luck: 1 } },
      { text: '安静地待着', attributeChanges: { social: 1, energy: 1, mindset: 1 } }
    ]
  },
  {
    id: 'weekend4',
    title: '志愿服务',
    description: '参加社区志愿服务',
    options: [
      { text: '尽心尽力地工作', attributeChanges: { social: 3, mindset: 2, luck: 2, energy: -3 } },
      { text: '敷衍了事', attributeChanges: { social: 1, energy: -1, mindset: -1 } }
    ]
  },
  {
    id: 'weekend5',
    title: '家庭旅行',
    description: '和家人一起短途旅行',
    options: [
      { text: '尽情享受旅程', attributeChanges: { mindset: 4, energy: 2, luck: 2, social: 1 } },
      { text: '惦记着学习', attributeChanges: { grades: 2, mindset: -1, energy: 1 } }
    ]
  },
  // 新增周末活动
  {
    id: 'weekend6',
    title: '电影院',
    description: '去电影院看最新电影',
    options: [
      { text: '看一部励志片', attributeChanges: { mindset: 4, talent: 2, energy: 1 } },
      { text: '看一部喜剧片', attributeChanges: { mindset: 5, social: 1, energy: 2 } }
    ]
  },
  {
    id: 'weekend7',
    title: '博物馆参观',
    description: '去博物馆参观展览',
    options: [
      { text: '认真学习展品知识', attributeChanges: { grades: 4, talent: 2, mindset: 2 } },
      { text: '随意浏览，放松心情', attributeChanges: { mindset: 3, talent: 1, energy: 1 } }
    ]
  },
  {
    id: 'weekend8',
    title: '运动健身',
    description: '去健身房或户外运动',
    options: [
      { text: '高强度训练', attributeChanges: { energy: 3, mindset: 2, grades: -1 } },
      { text: '轻松运动', attributeChanges: { energy: 2, mindset: 3, social: 1 } }
    ]
  },
  {
    id: 'weekend9',
    title: '学做美食',
    description: '在家学习烹饪新菜品',
    options: [
      { text: '认真学习，力求完美', attributeChanges: { talent: 3, mindset: 2, energy: -1 } },
      { text: '随意尝试，享受过程', attributeChanges: { talent: 1, mindset: 4, energy: 1 } }
    ]
  },
  {
    id: 'weekend10',
    title: '摄影采风',
    description: '去户外摄影采风',
    options: [
      { text: '专注创作，追求完美', attributeChanges: { talent: 4, mindset: 2, energy: -2 } },
      { text: '边走边拍，享受自然', attributeChanges: { talent: 2, mindset: 4, energy: 1, luck: 1 } }
    ]
  }
];

// 物品数据
export const shopItems: Item[] = [
  {
    id: 'item1',
    name: '学习笔记',
    description: '提高学习效率，增加成绩',
    price: 50,
    effect: { attributes: { grades: 5 } },
    quantity: 0
  },
  {
    id: 'item2',
    name: '能量饮料',
    description: '恢复体力和心态',
    price: 30,
    effect: { attributes: { energy: 10, mindset: 5 } },
    quantity: 0
  },
  {
    id: 'item3',
    name: '社交技巧书',
    description: '提高社交能力',
    price: 40,
    effect: { attributes: { social: 8 } },
    quantity: 0
  },
  {
    id: 'item4',
    name: '艺术用品',
    description: '提高才艺水平',
    price: 60,
    effect: { attributes: { talent: 8 } },
    quantity: 0
  },
  {
    id: 'item5',
    name: '幸运符',
    description: '提高运气',
    price: 70,
    effect: { attributes: { luck: 10 } },
    quantity: 0
  },
  {
    id: 'item6',
    name: '行动卡',
    description: '增加行动点',
    price: 80,
    effect: { actionPoints: 3 },
    quantity: 0
  },
  // 制作材料
  {
    id: 'material1',
    name: '纸张',
    description: '制作学习笔记的材料',
    price: 10,
    effect: {},
    quantity: 0
  },
  {
    id: 'material2',
    name: '草药',
    description: '制作能量饮料的材料',
    price: 15,
    effect: {},
    quantity: 0
  },
  {
    id: 'material3',
    name: '布料',
    description: '制作幸运符的材料',
    price: 20,
    effect: {},
    quantity: 0
  },
  {
    id: 'material4',
    name: '颜料',
    description: '制作艺术用品的材料',
    price: 25,
    effect: {},
    quantity: 0
  }
];

// 制作配方
export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  materials: { itemId: string; quantity: number }[];
  result: { itemId: string; quantity: number };
  requiredTalent?: number;
}

export const craftingRecipes: CraftingRecipe[] = [
  {
    id: 'recipe1',
    name: '学习笔记',
    description: '用纸张制作学习笔记',
    materials: [{ itemId: 'material1', quantity: 3 }],
    result: { itemId: 'item1', quantity: 1 }
  },
  {
    id: 'recipe2',
    name: '能量饮料',
    description: '用草药制作能量饮料',
    materials: [{ itemId: 'material2', quantity: 2 }],
    result: { itemId: 'item2', quantity: 1 }
  },
  {
    id: 'recipe3',
    name: '幸运符',
    description: '用布料制作幸运符',
    materials: [{ itemId: 'material3', quantity: 2 }],
    result: { itemId: 'item5', quantity: 1 }
  },
  {
    id: 'recipe4',
    name: '艺术用品',
    description: '用颜料制作艺术用品',
    materials: [{ itemId: 'material4', quantity: 2 }],
    result: { itemId: 'item4', quantity: 1 },
    requiredTalent: 30
  },
  {
    id: 'recipe5',
    name: '高级学习笔记',
    description: '制作高级学习笔记，效果更好',
    materials: [{ itemId: 'material1', quantity: 5 }, { itemId: 'item1', quantity: 1 }],
    result: { itemId: 'item7', quantity: 1 },
    requiredTalent: 50
  }
];

// 新增物品
export const additionalItems: Item[] = [
  {
    id: 'item7',
    name: '高级学习笔记',
    description: '高级学习笔记，大幅提高学习效率',
    price: 150,
    effect: { attributes: { grades: 10, talent: 2 } },
    quantity: 0
  }
];

// 任务数据
export const tasks: Task[] = [
  // 短期任务
  {
    id: 'task1',
    title: '初次学习',
    description: '进行一次学习行动',
    type: 'short',
    condition: { type: 'action', target: 'study', value: 1 },
    reward: { attributes: { grades: 2 }, actionPoints: 1 },
    completed: false
  },
  {
    id: 'task2',
    title: '社交达人',
    description: '进行3次社交行动',
    type: 'short',
    condition: { type: 'action', target: 'socialize', value: 3 },
    reward: { attributes: { social: 3 }, actionPoints: 1 },
    completed: false
  },
  {
    id: 'task3',
    title: '才艺练习',
    description: '进行2次才艺练习',
    type: 'short',
    condition: { type: 'action', target: 'practice', value: 2 },
    reward: { attributes: { talent: 3 }, actionPoints: 1 },
    completed: false
  },
  {
    id: 'task4',
    title: '保持体力',
    description: '体力值保持在80以上',
    type: 'short',
    condition: { type: 'attribute', target: 'energy', value: 80 },
    reward: { attributes: { energy: 5 }, actionPoints: 1 },
    completed: false
  },
  // 长期任务
  {
    id: 'task5',
    title: '学业有成',
    description: '成绩达到70分以上',
    type: 'long',
    condition: { type: 'attribute', target: 'grades', value: 70 },
    reward: { attributes: { grades: 5, mindset: 3 }, actionPoints: 2 },
    completed: false
  },
  {
    id: 'task6',
    title: '全面发展',
    description: '所有属性达到50分以上',
    type: 'long',
    condition: { type: 'attribute', target: 'all', value: 50 },
    reward: { attributes: { grades: 3, mindset: 3, energy: 3, social: 3, talent: 3, luck: 3 }, actionPoints: 3 },
    completed: false
  },
  {
    id: 'task7',
    title: '坚持到底',
    description: '度过30天高中生活',
    type: 'long',
    condition: { type: 'day', target: 'day', value: 30 },
    reward: { attributes: { mindset: 5, luck: 2 }, actionPoints: 2 },
    completed: false
  },
  {
    id: 'task8',
    title: '社交明星',
    description: '人缘达到80分以上',
    type: 'long',
    condition: { type: 'attribute', target: 'social', value: 80 },
    reward: { attributes: { social: 5, luck: 3 }, actionPoints: 2 },
    completed: false
  },
  // 新增短期任务
  {
    id: 'task9',
    title: '运动达人',
    description: '进行5次运动',
    type: 'short',
    condition: { type: 'action', target: 'exercise', value: 5 },
    reward: { attributes: { energy: 4, social: 2 }, actionPoints: 1 },
    completed: false
  },
  {
    id: 'task10',
    title: '阅读爱好者',
    description: '进行4次阅读',
    type: 'short',
    condition: { type: 'action', target: 'read', value: 4 },
    reward: { attributes: { grades: 3, talent: 2 }, actionPoints: 1 },
    completed: false
  },
  {
    id: 'task11',
    title: '志愿者',
    description: '进行3次志愿服务',
    type: 'short',
    condition: { type: 'action', target: 'volunteer', value: 3 },
    reward: { attributes: { mindset: 4, social: 3 }, actionPoints: 1 },
    completed: false
  },
  // 新增长期任务
  {
    id: 'task12',
    title: '才艺大师',
    description: '才艺达到80分以上',
    type: 'long',
    condition: { type: 'attribute', target: 'talent', value: 80 },
    reward: { attributes: { talent: 5, mindset: 3 }, actionPoints: 2 },
    completed: false
  },
  {
    id: 'task13',
    title: '幸运降临',
    description: '运气达到75分以上',
    type: 'long',
    condition: { type: 'attribute', target: 'luck', value: 75 },
    reward: { attributes: { luck: 5, grades: 2 }, actionPoints: 2 },
    completed: false
  },
  {
    id: 'task14',
    title: '长跑健将',
    description: '度过60天高中生活',
    type: 'long',
    condition: { type: 'day', target: 'day', value: 60 },
    reward: { attributes: { mindset: 4, energy: 4 }, actionPoints: 3 },
    completed: false
  },
  {
    id: 'task15',
    title: '马拉松选手',
    description: '度过90天高中生活',
    type: 'long',
    condition: { type: 'day', target: 'day', value: 90 },
    reward: { attributes: { mindset: 6, luck: 4 }, actionPoints: 4 },
    completed: false
  },
  {
    id: 'task16',
    title: '传奇人生',
    description: '度过120天高中生活',
    type: 'long',
    condition: { type: 'day', target: 'day', value: 120 },
    reward: { attributes: { grades: 5, mindset: 5, energy: 5, social: 5, talent: 5, luck: 5 }, actionPoints: 5 },
    completed: false
  }
];

// 成就数据
export const achievements: Achievement[] = [
  // 属性相关成就
  {
    id: 'achievement1',
    title: '学业有成',
    description: '成绩达到90分以上',
    condition: { type: 'attribute', target: 'grades', value: 90 }
  },
  {
    id: 'achievement2',
    title: '社交达人',
    description: '人缘达到90分以上',
    condition: { type: 'attribute', target: 'social', value: 90 }
  },
  {
    id: 'achievement3',
    title: '艺术天才',
    description: '才艺达到90分以上',
    condition: { type: 'attribute', target: 'talent', value: 90 }
  },
  {
    id: 'achievement4',
    title: '体力充沛',
    description: '体力达到90分以上',
    condition: { type: 'attribute', target: 'energy', value: 90 }
  },
  {
    id: 'achievement5',
    title: '心态平和',
    description: '心态达到90分以上',
    condition: { type: 'attribute', target: 'mindset', value: 90 }
  },
  {
    id: 'achievement6',
    title: '幸运之星',
    description: '运气达到90分以上',
    condition: { type: 'attribute', target: 'luck', value: 90 }
  },
  {
    id: 'achievement7',
    title: '坚持到底',
    description: '完成整个高中生活',
    condition: { type: 'day', target: 'day', value: 120 }
  },
  {
    id: 'achievement8',
    title: '全能选手',
    description: '所有属性都达到70分以上',
    condition: { type: 'attribute', target: 'all', value: 70 }
  },
  // 任务相关成就
  {
    id: 'achievement9',
    title: '任务达人',
    description: '完成5个任务',
    condition: { type: 'attribute', target: 'tasks', value: 5 }
  },
  {
    id: 'achievement10',
    title: '任务大师',
    description: '完成所有任务',
    condition: { type: 'attribute', target: 'tasks', value: 8 }
  },
  // 物品相关成就
  {
    id: 'achievement11',
    title: '购物狂',
    description: '购买10个物品',
    condition: { type: 'attribute', target: 'items', value: 10 }
  },
  {
    id: 'achievement12',
    title: '道具大师',
    description: '使用5个物品',
    condition: { type: 'attribute', target: 'items_used', value: 5 }
  },
  // 考试相关成就
  {
    id: 'achievement13',
    title: '考试高手',
    description: '考试成绩达到90分以上',
    condition: { type: 'attribute', target: 'exam_score', value: 90 }
  },
  {
    id: 'achievement14',
    title: '稳定发挥',
    description: '所有考试成绩都在70分以上',
    condition: { type: 'attribute', target: 'exam_average', value: 70 }
  },
  // 行动相关成就
  {
    id: 'achievement15',
    title: '学习狂',
    description: '进行50次学习行动',
    condition: { type: 'attribute', target: 'study_count', value: 50 }
  },
  {
    id: 'achievement16',
    title: '社交王',
    description: '进行30次社交行动',
    condition: { type: 'attribute', target: 'socialize_count', value: 30 }
  },
  // 难度相关成就
  {
    id: 'achievement17',
    title: '挑战自我',
    description: '在困难难度下完成游戏',
    condition: { type: 'attribute', target: 'hard_mode', value: 1 }
  },
  // 物品制作相关成就
  {
    id: 'achievement18',
    title: '初级工匠',
    description: '制作5个物品',
    condition: { type: 'attribute', target: 'items_crafted', value: 5 }
  },
  {
    id: 'achievement19',
    title: '中级工匠',
    description: '制作10个物品',
    condition: { type: 'attribute', target: 'items_crafted', value: 10 }
  },
  {
    id: 'achievement20',
    title: '高级工匠',
    description: '制作20个物品',
    condition: { type: 'attribute', target: 'items_crafted', value: 20 }
  },
  // 季节相关成就
  {
    id: 'achievement21',
    title: '四季如歌',
    description: '经历所有四个季节',
    condition: { type: 'attribute', target: 'seasons', value: 4 }
  },
  // 课程相关成就
  {
    id: 'achievement22',
    title: '全才',
    description: '选择过所有类型的课程',
    condition: { type: 'attribute', target: 'courses', value: 5 }
  },
  // 老师好感度相关成就
  {
    id: 'achievement23',
    title: '师生情深',
    description: '与一位老师的好感度达到80以上',
    condition: { type: 'attribute', target: 'teacher_relationship', value: 80 }
  },
  {
    id: 'achievement24',
    title: '万人迷',
    description: '与所有老师的好感度都达到60以上',
    condition: { type: 'attribute', target: 'all_teachers', value: 60 }
  }
];

interface GameState {
  player: Player | null;
  currentEvent: Event | null;
  isEventActive: boolean;
  gameOver: boolean;
  actionHistory: Record<string, number>; // 记录行动次数
  currentExam: { title: string; result: number } | null; // 当前考试结果
  currentWeekendActivity: Event | null; // 当前周末活动
  isWeekendActivityActive: boolean; // 是否有周末活动
  showCourseSelection: boolean; // 是否显示课程选择
  showCraftingModal: boolean; // 是否显示制作模态框
  itemsBought: number; // 购买物品数量
  itemsUsed: number; // 使用物品数量
  itemsCrafted: number; // 制作物品数量
  examScores: number[]; // 考试成绩记录
  
  // 游戏操作
  createPlayer: (name: string, talent: string, difficulty: Difficulty, duration: GameDuration) => void;
  performAction: (actionId: string) => void;
  completeDay: () => void;
  handleEventOption: (optionIndex: number) => void;
  resetGame: () => void;
  buyItem: (itemId: string) => void;
  useItem: (itemId: string) => void;
  selectCourse: (courseId: string) => void;
  handleWeekendOption: (optionIndex: number) => void;
  craftItem: (recipeId: string) => void;
  toggleCraftingModal: () => void;
  
  // 辅助方法
  getTalentById: (id: string) => typeof talents[0] | undefined;
  getActionById: (id: string) => typeof actions[0] | undefined;
  getEnding: () => Ending | undefined;
  getAchievements: () => Achievement[];
  checkAchievements: () => void;
  checkTasks: () => void;
  conductExam: () => void;
  getCourseById: (id: string) => typeof courses[0] | undefined;
  getItemById: (id: string) => (typeof shopItems[0] | typeof additionalItems[0]) | undefined;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: null,
      currentEvent: null,
      isEventActive: false,
      gameOver: false,
      actionHistory: {}, // 初始化行动历史
      currentExam: null, // 初始化考试结果
      currentWeekendActivity: null, // 初始化周末活动
      isWeekendActivityActive: false, // 初始化周末活动状态
      showCourseSelection: false, // 初始化课程选择显示状态
      showCraftingModal: false, // 初始化制作模态框显示状态
      itemsBought: 0, // 初始化购买物品数量
      itemsUsed: 0, // 初始化使用物品数量
      itemsCrafted: 0, // 初始化制作物品数量
      examScores: [], // 初始化考试成绩记录
      
      createPlayer: (name, talent, difficulty, duration) => {
        // 根据难度级别调整初始属性
        let initialAttributes: Attributes;
        let initialMoney: number;
        let initialActionPoints: number;
        
        switch (difficulty) {
          case 'easy':
            initialAttributes = {
              grades: 60,
              mindset: 80,
              energy: 90,
              social: 60,
              talent: 60,
              luck: 60
            };
            initialMoney = 300;
            initialActionPoints = 6;
            break;
          case 'normal':
            initialAttributes = {
              grades: 50,
              mindset: 70,
              energy: 80,
              social: 50,
              talent: 50,
              luck: 50
            };
            initialMoney = 200;
            initialActionPoints = 5;
            break;
          case 'hard':
            initialAttributes = {
              grades: 40,
              mindset: 60,
              energy: 70,
              social: 40,
              talent: 40,
              luck: 40
            };
            initialMoney = 100;
            initialActionPoints = 4;
            break;
        }
        
        // 深拷贝任务列表，确保每个玩家有自己的任务状态
        const initialTasks = JSON.parse(JSON.stringify(tasks));
        // 初始化物品列表
        const initialItems: Item[] = [];
        // 初始化老师好感度
        const initialTeacherRelationship: TeacherRelationship = {};
        teachers.forEach(teacher => {
          initialTeacherRelationship[teacher.id] = 50;
        });
        
        // 初始化同学关系
        const initialClassmateRelationship: ClassmateRelationship = {};
        classmates.forEach(classmate => {
          initialClassmateRelationship[classmate.id] = 30;
        });
        
        // 初始化家人关系
        const initialFamilyRelationship: FamilyRelationship = {};
        familyMembers.forEach(family => {
          initialFamilyRelationship[family.id] = 70;
        });
        
        // 初始化社团关系
        const initialClubRelationship: ClubRelationship = {};
        clubs.forEach(club => {
          initialClubRelationship[club.id] = 20;
        });
        
        set({
          player: {
            id: Date.now().toString(),
            name,
            talent,
            difficulty,
            duration,
            day: 1,
            season: 'spring', // 初始季节为春季
            attributes: initialAttributes,
            achievements: [],
            actionPoints: initialActionPoints,
            tasks: initialTasks,
            items: initialItems,
            money: initialMoney, // 初始金钱
            teacherRelationship: initialTeacherRelationship, // 初始化老师好感度
            classmateRelationship: initialClassmateRelationship, // 初始化同学关系
            familyRelationship: initialFamilyRelationship, // 初始化家人关系
            clubRelationship: initialClubRelationship, // 初始化社团关系
            selectedCourses: [] // 初始化课程选择
          },
          gameOver: false,
          actionHistory: {}, // 重置行动历史
          currentExam: null, // 重置考试结果
          currentWeekendActivity: null,
          isWeekendActivityActive: false,
          showCourseSelection: true, // 游戏开始时显示课程选择
          showCraftingModal: false,
          itemsBought: 0,
          itemsUsed: 0,
          itemsCrafted: 0,
          examScores: []
        });
      },
      
      performAction: (actionId) => {
        const { player, actionHistory } = get();
        if (!player) return;
        
        const action = actions.find(a => a.id === actionId);
        if (!action) return;
        
        if (player.actionPoints < action.cost) return;
        
        // 更新行动历史
        const newActionHistory = { ...actionHistory };
        newActionHistory[actionId] = (newActionHistory[actionId] || 0) + 1;
        
        // 获取天赋倍率
        const talent = talents.find(t => t.id === player.talent);
        const multipliers = talent?.multipliers || {
          grades: 1.0, mindset: 1.0, energy: 1.0, social: 1.0, talent: 1.0, luck: 1.0
        };
        
        // 计算属性变化
        const newAttributes = { ...player.attributes };
        Object.entries(action.baseChanges).forEach(([key, value]) => {
          const attrKey = key as keyof Attributes;
          newAttributes[attrKey] = Math.max(0, Math.min(100, 
            newAttributes[attrKey] + Math.round(value * multipliers[attrKey])
          ));
        });
        
        // 体力低于30时，学习效率降低
        if (newAttributes.energy < 30) {
          newAttributes.grades = Math.max(0, newAttributes.grades - 1);
        }
        
        // 心态低于30时，所有属性增长减半
        if (newAttributes.mindset < 30) {
          Object.keys(newAttributes).forEach(key => {
            const attrKey = key as keyof Attributes;
            newAttributes[attrKey] = Math.max(0, Math.floor(newAttributes[attrKey] * 0.9));
          });
        }
        
        set({
          player: {
            ...player,
            attributes: newAttributes,
            actionPoints: player.actionPoints - action.cost
          },
          actionHistory: newActionHistory
        });
        
        // 检查成就
        get().checkAchievements();
        // 检查任务
        get().checkTasks();
      },
      
      completeDay: () => {
        const { player } = get();
        if (!player) return;
        
        const newDay = player.day + 1;
        
        // 计算季节变化
        const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
        const seasonIndex = Math.floor((newDay - 1) / (player.duration / 4)) % 4;
        const newSeason = seasons[seasonIndex];
        
        // 检查是否触发随机事件
        let currentEvent = null;
        let isEventActive = false;
        
        if (newDay % 3 === 0 && newDay <= player.duration) {
          // 过滤出当前季节的事件
          const seasonalEvents = events.filter(event => 
            event.season === 'all' || event.season === newSeason
          );
          if (seasonalEvents.length > 0) {
            const randomEvent = seasonalEvents[Math.floor(Math.random() * seasonalEvents.length)];
            currentEvent = randomEvent;
            isEventActive = true;
          }
        }
        
        // 检查是否是周末 (每周6天触发一次周末活动)
        let currentWeekendActivity = null;
        let isWeekendActivityActive = false;
        if (newDay % 6 === 0 && newDay <= player.duration) {
          const randomActivity = weekendActivities[Math.floor(Math.random() * weekendActivities.length)];
          currentWeekendActivity = randomActivity;
          isWeekendActivityActive = true;
        }
        
        // 检查是否触发考试 (根据游戏时长调整考试间隔)
        const examInterval = player.duration / 4;
        if (newDay % examInterval === 0 && newDay <= player.duration) {
          get().conductExam();
        }
        
        // 应用课程效果
        let newAttributes = { ...player.attributes };
        player.selectedCourses.forEach(courseId => {
          const course = courses.find(c => c.id === courseId);
          if (course) {
            Object.entries(course.effect).forEach(([key, value]) => {
              const attrKey = key as keyof Attributes;
              newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + value));
            });
          }
        });
        
        // 检查游戏是否结束
        const gameOver = newDay > player.duration;
        
        set({
          player: {
            ...player,
            day: newDay,
            season: newSeason,
            actionPoints: player.difficulty === 'easy' ? 6 : player.difficulty === 'normal' ? 5 : 4, // 根据难度级别重置行动点
            // 每天自动恢复一些体力和心态，根据难度级别调整
            attributes: {
              ...newAttributes,
              energy: Math.min(100, newAttributes.energy + (player.difficulty === 'easy' ? 6 : player.difficulty === 'normal' ? 5 : 4)),
              mindset: Math.min(100, newAttributes.mindset + (player.difficulty === 'easy' ? 3 : player.difficulty === 'normal' ? 2 : 1))
            }
          },
          currentEvent,
          isEventActive,
          currentWeekendActivity,
          isWeekendActivityActive,
          gameOver
        });
        
        // 检查成就
        get().checkAchievements();
        // 检查任务
        get().checkTasks();
      },
      
      handleEventOption: (optionIndex) => {
        const { player, currentEvent } = get();
        if (!player || !currentEvent) return;
        
        const option = currentEvent.options[optionIndex];
        if (!option) return;
        
        // 应用属性变化
        const newAttributes = { ...player.attributes };
        Object.entries(option.attributeChanges).forEach(([key, value]) => {
          const attrKey = key as keyof Attributes;
          newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + value));
        });
        
        // 应用关系变化
        const newTeacherRelationship = { ...player.teacherRelationship };
        const newClassmateRelationship = { ...player.classmateRelationship };
        const newFamilyRelationship = { ...player.familyRelationship };
        const newClubRelationship = { ...player.clubRelationship };
        
        if (option.relationshipChanges) {
          // 老师关系变化
          if (option.relationshipChanges.teachers) {
            Object.entries(option.relationshipChanges.teachers).forEach(([key, value]) => {
              newTeacherRelationship[key] = Math.max(0, Math.min(100, (newTeacherRelationship[key] || 50) + value));
            });
          }
          
          // 同学关系变化
          if (option.relationshipChanges.classmates) {
            Object.entries(option.relationshipChanges.classmates).forEach(([key, value]) => {
              newClassmateRelationship[key] = Math.max(0, Math.min(100, (newClassmateRelationship[key] || 30) + value));
            });
          }
          
          // 家人关系变化
          if (option.relationshipChanges.family) {
            Object.entries(option.relationshipChanges.family).forEach(([key, value]) => {
              newFamilyRelationship[key] = Math.max(0, Math.min(100, (newFamilyRelationship[key] || 70) + value));
            });
          }
          
          // 社团关系变化
          if (option.relationshipChanges.clubs) {
            Object.entries(option.relationshipChanges.clubs).forEach(([key, value]) => {
              newClubRelationship[key] = Math.max(0, Math.min(100, (newClubRelationship[key] || 20) + value));
            });
          }
        }
        
        set({
          player: {
            ...player,
            attributes: newAttributes,
            teacherRelationship: newTeacherRelationship,
            classmateRelationship: newClassmateRelationship,
            familyRelationship: newFamilyRelationship,
            clubRelationship: newClubRelationship
          },
          currentEvent: null,
          isEventActive: false
        });
        
        // 检查成就
        get().checkAchievements();
      },
      
      resetGame: () => {
        set({
          player: null,
          currentEvent: null,
          isEventActive: false,
          gameOver: false
        });
      },
      
      getTalentById: (id) => {
        return talents.find(t => t.id === id);
      },
      
      getActionById: (id) => {
        return actions.find(a => a.id === id);
      },
      
      getEnding: () => {
        const { player } = get();
        if (!player) return undefined;
        
        // 按条件优先级排序，找到第一个符合条件的结局
        return endings.find(ending => {
          const { condition } = ending;
          if (condition.minGrades && player.attributes.grades < condition.minGrades) return false;
          if (condition.minMindset && player.attributes.mindset < condition.minMindset) return false;
          if (condition.minEnergy && player.attributes.energy < condition.minEnergy) return false;
          if (condition.minSocial && player.attributes.social < condition.minSocial) return false;
          if (condition.minTalent && player.attributes.talent < condition.minTalent) return false;
          if (condition.minLuck && player.attributes.luck < condition.minLuck) return false;
          if (condition.maxGrades && player.attributes.grades > condition.maxGrades) return false;
          if (condition.maxMindset && player.attributes.mindset > condition.maxMindset) return false;
          if (condition.maxEnergy && player.attributes.energy > condition.maxEnergy) return false;
          if (condition.maxSocial && player.attributes.social > condition.maxSocial) return false;
          if (condition.maxTalent && player.attributes.talent > condition.maxTalent) return false;
          if (condition.maxLuck && player.attributes.luck > condition.maxLuck) return false;
          return true;
        });
      },
      
      getAchievements: (): Achievement[] => {
        const { player, itemsCrafted } = get();
        if (!player) return [];
        
        return achievements.filter(achievement => {
          if (achievement.condition.type === 'attribute') {
            if (achievement.condition.target === 'all') {
              return Object.values(player.attributes).every(value => value >= achievement.condition.value);
            } else if (achievement.condition.target === 'hard_mode') {
              return player.difficulty === 'hard' && player.day === player.duration;
            } else if (achievement.condition.target === 'items_crafted') {
              return itemsCrafted >= achievement.condition.value;
            } else if (achievement.condition.target === 'seasons') {
              // 检查是否经历了所有四个季节
              const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
              const seasonIndex = Math.floor((player.day - 1) / (player.duration / 4)) % 4;
              return seasonIndex === 3; // 已经到了第四个季节
            } else if (achievement.condition.target === 'courses') {
              // 检查是否选择过所有类型的课程
              return player.selectedCourses.length === 5;
            } else if (achievement.condition.target === 'teacher_relationship') {
              // 检查是否有老师好感度达到目标值
              return Object.values(player.teacherRelationship).some(value => value >= achievement.condition.value);
            } else if (achievement.condition.target === 'all_teachers') {
              // 检查是否所有老师好感度都达到目标值
              return Object.values(player.teacherRelationship).every(value => value >= achievement.condition.value);
            } else {
              const attrKey = achievement.condition.target as keyof Attributes;
              return player.attributes[attrKey] >= achievement.condition.value;
            }
          } else if (achievement.condition.type === 'day') {
            return player.day >= achievement.condition.value;
          }
          return false;
        });
      },
      
      // 检查成就
      checkAchievements: () => {
        const { player, itemsCrafted } = get();
        if (!player) return;
        
        const earnedAchievements = achievements.filter(achievement => {
          if (player.achievements.includes(achievement.id)) return false;
          
          if (achievement.condition.type === 'attribute') {
            if (achievement.condition.target === 'all') {
              return Object.values(player.attributes).every(value => value >= achievement.condition.value);
            } else if (achievement.condition.target === 'hard_mode') {
              return player.difficulty === 'hard' && player.day === player.duration;
            } else if (achievement.condition.target === 'items_crafted') {
              return itemsCrafted >= achievement.condition.value;
            } else if (achievement.condition.target === 'seasons') {
              // 检查是否经历了所有四个季节
              const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
              const seasonIndex = Math.floor((player.day - 1) / (player.duration / 4)) % 4;
              return seasonIndex === 3; // 已经到了第四个季节
            } else if (achievement.condition.target === 'courses') {
              // 检查是否选择过所有类型的课程
              return player.selectedCourses.length === 5;
            } else if (achievement.condition.target === 'teacher_relationship') {
              // 检查是否有老师好感度达到目标值
              return Object.values(player.teacherRelationship).some(value => value >= achievement.condition.value);
            } else if (achievement.condition.target === 'all_teachers') {
              // 检查是否所有老师好感度都达到目标值
              return Object.values(player.teacherRelationship).every(value => value >= achievement.condition.value);
            } else {
              const attrKey = achievement.condition.target as keyof Attributes;
              return player.attributes[attrKey] >= achievement.condition.value;
            }
          } else if (achievement.condition.type === 'day') {
            return player.day >= achievement.condition.value;
          }
          return false;
        });
        
        if (earnedAchievements.length > 0) {
          const newAchievements = [...player.achievements, ...earnedAchievements.map(a => a.id)];
          set({
            player: {
              ...player,
              achievements: newAchievements
            }
          });
        }
      },
      
      // 检查任务
      checkTasks: () => {
        const { player, actionHistory } = get();
        if (!player) return;
        
        const updatedTasks = player.tasks.map(task => {
          if (task.completed) return task;
          
          let isCompleted = false;
          
          if (task.condition.type === 'attribute') {
            if (task.condition.target === 'all') {
              isCompleted = Object.values(player.attributes).every(value => value >= task.condition.value);
            } else {
              const attrKey = task.condition.target as keyof Attributes;
              isCompleted = player.attributes[attrKey] >= task.condition.value;
            }
          } else if (task.condition.type === 'action') {
            isCompleted = (actionHistory[task.condition.target] || 0) >= task.condition.value;
          } else if (task.condition.type === 'day') {
            isCompleted = player.day >= task.condition.value;
          }
          
          return { ...task, completed: isCompleted };
        });
        
        // 检查是否有新完成的任务
        const newlyCompletedTasks = updatedTasks.filter((task, index) => 
          task.completed && !player.tasks[index].completed
        );
        
        if (newlyCompletedTasks.length > 0) {
          // 计算奖励
          let newAttributes = { ...player.attributes };
          let newActionPoints = player.actionPoints;
          
          newlyCompletedTasks.forEach(task => {
            if (task.reward.attributes) {
              Object.entries(task.reward.attributes).forEach(([key, value]) => {
                const attrKey = key as keyof Attributes;
                newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + value));
              });
            }
            if (task.reward.actionPoints) {
              newActionPoints += task.reward.actionPoints;
            }
          });
          
          set({
            player: {
              ...player,
              tasks: updatedTasks,
              attributes: newAttributes,
              actionPoints: newActionPoints
            }
          });
        } else if (JSON.stringify(updatedTasks) !== JSON.stringify(player.tasks)) {
          // 只是更新任务状态，没有新完成的任务
          set({
            player: {
              ...player,
              tasks: updatedTasks
            }
          });
        }
      },
      
      // 购买物品
      buyItem: (itemId) => {
        const { player, itemsBought } = get();
        if (!player) return;
        
        const shopItem = shopItems.find(item => item.id === itemId);
        if (!shopItem) return;
        
        if (player.money < shopItem.price) return;
        
        // 检查物品是否已在物品栏中
        const existingItemIndex = player.items.findIndex(item => item.id === itemId);
        let updatedItems;
        
        if (existingItemIndex >= 0) {
          // 物品已存在，增加数量
          updatedItems = [...player.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
        } else {
          // 物品不存在，添加到物品栏
          updatedItems = [...player.items, { ...shopItem, quantity: 1 }];
        }
        
        set({
          player: {
            ...player,
            items: updatedItems,
            money: player.money - shopItem.price
          },
          itemsBought: itemsBought + 1
        });
      },
      
      // 使用物品
      useItem: (itemId) => {
        const { player, itemsUsed } = get();
        if (!player) return;
        
        const itemIndex = player.items.findIndex(item => item.id === itemId);
        if (itemIndex < 0 || player.items[itemIndex].quantity <= 0) return;
        
        const item = player.items[itemIndex];
        
        // 计算物品效果
        let newAttributes = { ...player.attributes };
        let newActionPoints = player.actionPoints;
        
        if (item.effect.attributes) {
          Object.entries(item.effect.attributes).forEach(([key, value]) => {
            const attrKey = key as keyof Attributes;
            newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + value));
          });
        }
        if (item.effect.actionPoints) {
          newActionPoints += item.effect.actionPoints;
        }
        
        // 更新物品数量
        const updatedItems = [...player.items];
        if (updatedItems[itemIndex].quantity > 1) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: updatedItems[itemIndex].quantity - 1
          };
        } else {
          // 物品数量为0，从物品栏中移除
          updatedItems.splice(itemIndex, 1);
        }
        
        set({
          player: {
            ...player,
            items: updatedItems,
            attributes: newAttributes,
            actionPoints: newActionPoints
          },
          itemsUsed: itemsUsed + 1
        });
      },
      
      // 选择课程
      selectCourse: (courseId) => {
        const { player, showCourseSelection } = get();
        if (!player) return;
        
        // 最多选择2门课程
        if (player.selectedCourses.length >= 2 && !player.selectedCourses.includes(courseId)) {
          return;
        }
        
        let updatedCourses;
        if (player.selectedCourses.includes(courseId)) {
          // 取消选择
          updatedCourses = player.selectedCourses.filter(id => id !== courseId);
        } else {
          // 选择课程
          updatedCourses = [...player.selectedCourses, courseId];
        }
        
        set({
          player: {
            ...player,
            selectedCourses: updatedCourses
          },
          showCourseSelection: updatedCourses.length === 0 // 如果没有选择课程，继续显示
        });
      },
      
      // 处理周末活动选项
      handleWeekendOption: (optionIndex) => {
        const { player, currentWeekendActivity } = get();
        if (!player || !currentWeekendActivity) return;
        
        const option = currentWeekendActivity.options[optionIndex];
        if (!option) return;
        
        // 应用属性变化
        const newAttributes = { ...player.attributes };
        Object.entries(option.attributeChanges).forEach(([key, value]) => {
          const attrKey = key as keyof Attributes;
          newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + value));
        });
        
        // 应用关系变化
        const newTeacherRelationship = { ...player.teacherRelationship };
        const newClassmateRelationship = { ...player.classmateRelationship };
        const newFamilyRelationship = { ...player.familyRelationship };
        const newClubRelationship = { ...player.clubRelationship };
        
        if (option.relationshipChanges) {
          // 老师关系变化
          if (option.relationshipChanges.teachers) {
            Object.entries(option.relationshipChanges.teachers).forEach(([key, value]) => {
              newTeacherRelationship[key] = Math.max(0, Math.min(100, (newTeacherRelationship[key] || 50) + value));
            });
          }
          
          // 同学关系变化
          if (option.relationshipChanges.classmates) {
            Object.entries(option.relationshipChanges.classmates).forEach(([key, value]) => {
              newClassmateRelationship[key] = Math.max(0, Math.min(100, (newClassmateRelationship[key] || 30) + value));
            });
          }
          
          // 家人关系变化
          if (option.relationshipChanges.family) {
            Object.entries(option.relationshipChanges.family).forEach(([key, value]) => {
              newFamilyRelationship[key] = Math.max(0, Math.min(100, (newFamilyRelationship[key] || 70) + value));
            });
          }
          
          // 社团关系变化
          if (option.relationshipChanges.clubs) {
            Object.entries(option.relationshipChanges.clubs).forEach(([key, value]) => {
              newClubRelationship[key] = Math.max(0, Math.min(100, (newClubRelationship[key] || 20) + value));
            });
          }
        }
        
        set({
          player: {
            ...player,
            attributes: newAttributes,
            teacherRelationship: newTeacherRelationship,
            classmateRelationship: newClassmateRelationship,
            familyRelationship: newFamilyRelationship,
            clubRelationship: newClubRelationship
          },
          currentWeekendActivity: null,
          isWeekendActivityActive: false
        });
        
        // 检查成就和任务
        get().checkAchievements();
        get().checkTasks();
      },
      
      // 获取课程
      getCourseById: (id) => {
        return courses.find(c => c.id === id);
      },
      
      // 进行考试
      conductExam: () => {
        const { player, examScores } = get();
        if (!player) return;
        
        // 计算考试结果
        // 基础分数基于成绩属性
        let baseScore = player.attributes.grades;
        // 运气属性影响考试结果 (±10分)
        const luckEffect = Math.floor((player.attributes.luck - 50) / 5);
        // 最终分数
        const examScore = Math.max(0, Math.min(100, baseScore + luckEffect));
        
        // 考试标题
        const examTitles = [
          '月考',
          '期中考试',
          '期末考试',
          '模拟考试'
        ];
        const examTitle = examTitles[Math.floor(Math.random() * examTitles.length)];
        
        // 根据考试结果调整属性
        let newAttributes = { ...player.attributes };
        if (examScore >= 80) {
          // 考试成绩好，提高心态和成绩
          newAttributes.mindset = Math.min(100, newAttributes.mindset + 5);
          newAttributes.grades = Math.min(100, newAttributes.grades + 3);
        } else if (examScore < 60) {
          // 考试成绩差，降低心态
          newAttributes.mindset = Math.max(0, newAttributes.mindset - 5);
        }
        
        set({
          player: {
            ...player,
            attributes: newAttributes
          },
          currentExam: { title: examTitle, result: examScore },
          examScores: [...examScores, examScore]
        });
      },
      
      // 制作物品
      craftItem: (recipeId) => {
        const { player, itemsCrafted } = get();
        if (!player) return;
        
        const recipe = craftingRecipes.find(r => r.id === recipeId);
        if (!recipe) return;
        
        // 检查才艺要求
        if (recipe.requiredTalent && player.attributes.talent < recipe.requiredTalent) {
          return;
        }
        
        // 检查材料是否足够
        const hasEnoughMaterials = recipe.materials.every(material => {
          const item = player.items.find(i => i.id === material.itemId);
          return item && item.quantity >= material.quantity;
        });
        
        if (!hasEnoughMaterials) {
          return;
        }
        
        // 消耗材料
        let updatedItems = [...player.items];
        recipe.materials.forEach(material => {
          const itemIndex = updatedItems.findIndex(i => i.id === material.itemId);
          if (itemIndex >= 0) {
            if (updatedItems[itemIndex].quantity > material.quantity) {
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                quantity: updatedItems[itemIndex].quantity - material.quantity
              };
            } else {
              updatedItems.splice(itemIndex, 1);
            }
          }
        });
        
        // 添加制作的物品
        const resultItem = [...shopItems, ...additionalItems].find(i => i.id === recipe.result.itemId);
        if (resultItem) {
          const existingItemIndex = updatedItems.findIndex(i => i.id === recipe.result.itemId);
          if (existingItemIndex >= 0) {
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + recipe.result.quantity
            };
          } else {
            updatedItems.push({
              ...resultItem,
              quantity: recipe.result.quantity
            });
          }
        }
        
        set({
          player: {
            ...player,
            items: updatedItems
          },
          itemsCrafted: itemsCrafted + 1
        });
      },
      
      // 切换制作模态框
      toggleCraftingModal: () => {
        const { showCraftingModal } = get();
        set({ showCraftingModal: !showCraftingModal });
      },
      
      // 获取物品信息
      getItemById: (id) => {
        return [...shopItems, ...additionalItems].find(item => item.id === id);
      }
    }),
    {
      name: 'high-school-simulator-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          return undefined;
        }
        return persistedState;
      }
    }
  )
);

export default useGameStore;
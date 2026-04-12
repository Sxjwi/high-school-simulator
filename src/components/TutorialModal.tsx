import React, { useState } from 'react';
import useGameStore from '../store/gameStore';

interface TutorialStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

const TutorialModal: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { resetGame } = useGameStore();

  const tutorialSteps: TutorialStep[] = [
    {
      title: '欢迎来到人生模拟器！',
      description: '这是一个模拟高中生活的游戏，你将体验从入学到毕业的完整旅程。',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">在这个游戏中，你需要：</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>管理你的六维属性</li>
            <li>完成日常行动来提升自己</li>
            <li>应对随机事件做出选择</li>
            <li>完成任务获得奖励</li>
          </ul>
        </div>
      )
    },
    {
      title: '六维属性',
      description: '你的角色有六个重要的属性需要关注。',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">成绩</h4>
              <p className="text-sm text-gray-600">影响考试和学业结局</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">心态</h4>
              <p className="text-sm text-gray-600">影响所有属性的成长</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800">体力</h4>
              <p className="text-sm text-gray-600">支持你的日常行动</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800">人缘</h4>
              <p className="text-sm text-gray-600">影响社交和老师好感</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <h4 className="font-medium text-pink-800">才艺</h4>
              <p className="text-sm text-gray-600">影响艺术和制作能力</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800">运气</h4>
              <p className="text-sm text-gray-600">影响考试和随机事件</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '日常行动',
      description: '消耗行动点来完成各种行动。',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">每天你有一定的行动点，可以用来：</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>学习</strong> - 提高成绩</li>
            <li><strong>休息</strong> - 恢复体力和心态</li>
            <li><strong>社交</strong> - 提高人缘</li>
            <li><strong>才艺练习</strong> - 提高才艺</li>
            <li><strong>运动</strong> - 提高体力</li>
            <li>以及更多其他行动...</li>
          </ul>
        </div>
      )
    },
    {
      title: '游戏时长和难度',
      description: '选择适合你的游戏体验。',
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">游戏时长：</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>30天</strong> - 快速体验</li>
              <li><strong>60天</strong> - 短期挑战</li>
              <li><strong>90天</strong> - 完整体验（推荐）</li>
              <li><strong>120天</strong> - 长期挑战</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">难度级别：</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>简单</strong> - 初始属性高，资源丰富</li>
              <li><strong>普通</strong> - 平衡的游戏体验</li>
              <li><strong>困难</strong> - 初始属性低，资源稀缺</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '开始你的旅程！',
      description: '现在你已经了解了游戏的基本玩法！',
      content: (
        <div className="text-center space-y-4">
          <p className="text-gray-700">祝你在高中生活中取得成功！</p>
          <p className="text-sm text-gray-500">记住：每一个选择都很重要，平衡发展是关键！</p>
        </div>
      )
    }
  ];

  if (!showTutorial) return null;

  const currentStepData = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setShowTutorial(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800">{currentStepData.title}</h2>
          <button
            onClick={() => setShowTutorial(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">{currentStepData.description}</p>
          {currentStepData.content}
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex gap-3">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                上一步
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isLastStep ? '开始游戏' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;

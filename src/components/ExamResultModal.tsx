import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';

const ExamResultModal: React.FC = () => {
  const { currentExam, player } = useGameStore();

  useEffect(() => {
    if (currentExam) {
      const timer = setTimeout(() => {
        useGameStore.setState({ currentExam: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentExam]);

  if (!currentExam || !player) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getMessage = (score: number) => {
    if (score >= 90) return '太棒了！你是学习天才！';
    if (score >= 80) return '优秀！继续保持！';
    if (score >= 70) return '不错，还有进步空间！';
    if (score >= 60) return '及格了，需要更加努力！';
    return '不及格，要加油了！';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b text-center">
          <div className="text-4xl mb-2">📝</div>
          <h2 className="text-2xl font-bold text-blue-800">{currentExam.title}</h2>
        </div>
        
        <div className="p-6 text-center">
          <div className={`inline-block px-8 py-4 rounded-2xl border-4 ${getScoreBg(currentExam.result)} mb-4`}>
            <span className={`text-5xl font-bold ${getScoreColor(currentExam.result)}`}>
              {currentExam.result}
            </span>
            <span className="text-xl text-gray-500 ml-2">分</span>
          </div>
          
          <p className="text-xl font-medium text-gray-700 mb-4">{getMessage(currentExam.result)}</p>
          
          <div className="text-sm text-gray-500">
            {currentExam.result >= 80 && (
              <p className="text-green-600">心态+5，成绩+3</p>
            )}
            {currentExam.result < 60 && (
              <p className="text-red-600">心态-5</p>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t bg-gray-50 text-center">
          <button
            onClick={() => useGameStore.setState({ currentExam: null })}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultModal;

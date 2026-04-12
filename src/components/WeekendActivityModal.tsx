import React from 'react';
import useGameStore from '../store/gameStore';

const WeekendActivityModal: React.FC = () => {
  const { currentWeekendActivity, isWeekendActivityActive, handleWeekendOption } = useGameStore();

  if (!isWeekendActivityActive || !currentWeekendActivity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎉</span>
            <h2 className="text-2xl font-bold text-purple-800">周末特别活动</h2>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{currentWeekendActivity.title}</h3>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-6">{currentWeekendActivity.description}</p>
          
          <div className="space-y-3">
            {currentWeekendActivity.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleWeekendOption(index)}
                className="w-full p-4 text-left border-2 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                <span className="font-medium text-gray-800">{option.text}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(option.attributeChanges).map(([key, value]) => (
                    <span
                      key={key}
                      className={`text-xs px-2 py-1 rounded-full ${
                        value > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {key === 'grades' && '成绩'}
                      {key === 'mindset' && '心态'}
                      {key === 'energy' && '体力'}
                      {key === 'social' && '人缘'}
                      {key === 'talent' && '才艺'}
                      {key === 'luck' && '运气'}
                      {value > 0 ? '+' : ''}{value}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendActivityModal;

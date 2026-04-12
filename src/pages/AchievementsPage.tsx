import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore, { achievements } from '../store/gameStore';

const AchievementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { player, getAchievements } = useGameStore();

  if (!player) {
    navigate('/');
    return null;
  }

  const earnedAchievements = getAchievements();
  const earnedIds = new Set(earnedAchievements.map(a => a.id));

  const achievementsByCategory: Record<string, typeof achievements> = {
    '属性成就': achievements.filter(a => 
      ['attribute', 'all'].includes(a.condition.target) || 
      (a.condition.type === 'attribute' && 
        ['grades', 'mindset', 'energy', 'social', 'talent', 'luck'].includes(a.condition.target))
    ),
    '天数成就': achievements.filter(a => a.condition.type === 'day'),
    '行动成就': achievements.filter(a => 
      a.condition.target === 'tasks' || 
      a.condition.target === 'items' || 
      a.condition.target === 'items_used' || 
      a.condition.target === 'study_count' || 
      a.condition.target === 'socialize_count'
    ),
    '新系统成就': achievements.filter(a => 
      ['items_crafted', 'seasons', 'courses', 'teacher_relationship', 'all_teachers'].includes(a.condition.target) ||
      a.condition.target === 'hard_mode'
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 顶部导航 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">成就展示</h1>
            <p className="text-sm text-gray-600">
              已获得: {earnedAchievements.length}/{achievements.length}
            </p>
          </div>
          <button
            onClick={() => navigate('/game')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            返回游戏
          </button>
        </div>

        {/* 成就进度条 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">总体进度</span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 成就列表 */}
        <div className="space-y-6">
          {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
            <div key={category} className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryAchievements.map((achievement) => {
                  const isEarned = earnedIds.has(achievement.id);
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 border rounded-lg transition-all ${
                        isEarned 
                          ? 'border-yellow-400 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-3xl ${isEarned ? '' : 'grayscale opacity-50'}`}>
                          {isEarned ? '🏆' : '🔒'}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${isEarned ? 'text-blue-800' : 'text-gray-600'}`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {achievement.description}
                          </p>
                          {isEarned && (
                            <span className="inline-block mt-2 text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">
                              已获得
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;

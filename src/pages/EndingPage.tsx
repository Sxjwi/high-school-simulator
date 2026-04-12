import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useGameStore, { achievements } from '../store/gameStore';

const EndingPage: React.FC = () => {
  const navigate = useNavigate();
  const { player, getEnding, getAchievements, resetGame } = useGameStore();

  if (!player) {
    navigate('/');
    return null;
  }

  const ending = getEnding();
  const earnedAchievements = getAchievements();

  // 准备雷达图数据
  const radarData = [
    { subject: '成绩', value: player.attributes.grades },
    { subject: '心态', value: player.attributes.mindset },
    { subject: '体力', value: player.attributes.energy },
    { subject: '人缘', value: player.attributes.social },
    { subject: '才艺', value: player.attributes.talent },
    { subject: '运气', value: player.attributes.luck },
  ];

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">高中生活结束</h1>
          
          {/* 最终属性雷达图 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">最终属性</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="属性"
                    dataKey="value"
                    stroke="#1E40AF"
                    fill="#1E40AF"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 结局展示 */}
          <div className="mb-8 p-4 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">{ending?.title || '平凡生活'}</h2>
            <p className="text-gray-700">{ending?.description || '你度过了平静而充实的高中生活，为未来打下了坚实的基础。'}</p>
          </div>

          {/* 成就展示 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">获得的成就</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {earnedAchievements.length > 0 ? (
                earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-3 border border-blue-300 rounded-lg bg-blue-50">
                    <h3 className="font-medium text-blue-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 col-span-full text-center">暂无成就</p>
              )}
            </div>
          </div>

          {/* 重新开始按钮 */}
          <div className="flex justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              重新开始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndingPage;
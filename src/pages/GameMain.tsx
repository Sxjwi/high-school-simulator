import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useGameStore, { actions, shopItems, courses, teachers, achievements } from '../store/gameStore';
import CourseSelectionModal from '../components/CourseSelectionModal';
import WeekendActivityModal from '../components/WeekendActivityModal';
import ExamResultModal from '../components/ExamResultModal';
import EventModal from '../components/EventModal';
import CraftingModal from '../components/CraftingModal';
import Classroom3D from '../components/Classroom3D';

const GameMain: React.FC = () => {
  const navigate = useNavigate();
  const { 
    player, 
    performAction, 
    completeDay, 
    gameOver, 
    buyItem, 
    useItem,
    isEventActive,
    handleEventOption,
    showCourseSelection,
    selectCourse,
    showCraftingModal,
    toggleCraftingModal
  } = useGameStore();
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');

  if (!player) {
    navigate('/');
    return null;
  }

  if (gameOver) {
    navigate('/ending');
    return null;
  }

  // 准备雷达图数据
  const radarData = [
    { subject: '成绩', value: player.attributes.grades },
    { subject: '心态', value: player.attributes.mindset },
    { subject: '体力', value: player.attributes.energy },
    { subject: '人缘', value: player.attributes.social },
    { subject: '才艺', value: player.attributes.talent },
    { subject: '运气', value: player.attributes.luck },
  ];

  const handleAction = (actionId: string) => {
    performAction(actionId);
  };

  const handleCompleteDay = () => {
    completeDay();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 模态框组件 */}
        <CourseSelectionModal />
        <WeekendActivityModal />
        <ExamResultModal />
        {isEventActive && <EventModal />}
        <CraftingModal />
        
        {/* 顶部信息栏 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-blue-800">{player.name}</h2>
              <p className="text-sm text-gray-600">
                天赋: {useGameStore.getState().getTalentById(player.talent)?.name} | 
                难度: {player.difficulty === 'easy' ? '简单' : player.difficulty === 'normal' ? '普通' : '困难'} |
                季节: {player.season === 'spring' ? '春季' : player.season === 'summer' ? '夏季' : player.season === 'autumn' ? '秋季' : '冬季'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-800">第 {player.day} 天</p>
              <p className="text-sm text-gray-600">
                共 {player.duration} 天 · 剩余 {player.duration - player.day + 1} 天
              </p>
            </div>
            <div className="text-right flex gap-3">
              <button
                onClick={() => navigate('/achievements')}
                className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                🏆 成就
              </button>
              <div>
                <p className="text-lg font-medium text-blue-800">行动点: {player.actionPoints}</p>
                <p className="text-sm text-yellow-600">💰 {player.money} 元</p>
              </div>
            </div>
          </div>
          
          {/* 已选课程显示 */}
          {player.selectedCourses.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">已选课程:</span>
                <button
                  onClick={() => useGameStore.setState({ showCourseSelection: true })}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  (更换)
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {player.selectedCourses.map((courseId) => {
                  const course = courses.find(c => c.id === courseId);
                  return course && (
                    <span key={course.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {course.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3D教室场景 */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 h-[500px]">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 text-center">🏫 3D教室场景</h3>
          <Classroom3D 
            season={player.season} 
            day={player.day} 
            grades={player.attributes.grades}
            isWeekend={player.day % 7 === 0 || player.day % 7 === 6}
          />
        </div>
        
        {/* 主要内容区 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧属性面板 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 六维属性进度条 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">六维属性</h3>
              <div className="space-y-3">
                {Object.entries(player.attributes).map(([key, value]) => {
                  const attributeNames: Record<string, string> = {
                    grades: '成绩',
                    mindset: '心态',
                    energy: '体力',
                    social: '人缘',
                    talent: '才艺',
                    luck: '运气'
                  };
                  
                  const colors: Record<string, string> = {
                    grades: 'bg-blue-500',
                    mindset: 'bg-green-500',
                    energy: 'bg-yellow-500',
                    social: 'bg-purple-500',
                    talent: 'bg-pink-500',
                    luck: 'bg-orange-500'
                  };
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{attributeNames[key]}</span>
                        <span className="text-sm font-medium text-gray-700">{value}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`${colors[key]} h-2.5 rounded-full transition-all duration-300`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 行动选择区域 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">日常行动</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    disabled={player.actionPoints < action.cost}
                    className={`p-3 border rounded-lg flex flex-col items-center transition-all ${player.actionPoints >= action.cost ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 cursor-pointer' : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'}`}
                  >
                    <span className="font-medium text-blue-800">{action.name}</span>
                    <span className="text-xs text-gray-600 mt-1">消耗: {action.cost}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 任务系统 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">任务系统</h3>
              <div className="space-y-3">
                {player.tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className={`p-3 border rounded-lg ${task.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-blue-800">{task.title}</h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {task.completed ? '已完成' : task.type === 'short' ? '短期' : '长期'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                ))}
                {player.tasks.length > 4 && (
                  <div className="text-center text-sm text-gray-500 mt-2">
                    还有 {player.tasks.length - 4} 个任务...
                  </div>
                )}
              </div>
            </div>

          {/* 结束当天按钮 */}
            <div className="flex justify-center">
              <button
                onClick={handleCompleteDay}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                结束当天
              </button>
            </div>
          </div>

          {/* 右侧雷达图、老师好感度和物品系统 */}
          <div className="space-y-6">
            {/* 雷达图 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 text-center">属性分布</h3>
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

            {/* 老师好感度系统 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">老师好感度</h3>
              <div className="space-y-3">
                {teachers.map((teacher) => {
                  const relationship = player.teacherRelationship[teacher.id] || 50;
                  const getRelationshipLevel = (score: number) => {
                    if (score >= 80) return { text: '敬爱', color: 'text-green-600', bg: 'bg-green-100' };
                    if (score >= 60) return { text: '友善', color: 'text-blue-600', bg: 'bg-blue-100' };
                    if (score >= 40) return { text: '普通', color: 'text-gray-600', bg: 'bg-gray-100' };
                    return { text: '陌生', color: 'text-red-600', bg: 'bg-red-100' };
                  };
                  const level = getRelationshipLevel(relationship);
                  
                  return (
                    <div key={teacher.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium text-gray-800">{teacher.name}</span>
                          <span className="text-sm text-gray-500 ml-2">{teacher.subject}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${level.bg} ${level.color}`}>
                          {level.text}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${relationship}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{relationship}/100</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 物品系统 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-800">物品系统</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-800">金钱: {player.money}</span>
                  <button
                    onClick={toggleCraftingModal}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    制作物品
                  </button>
                </div>
              </div>
              
              {/* 选项卡 */}
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 py-2 text-center ${activeTab === 'shop' ? 'border-b-2 border-blue-500 text-blue-800' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('shop')}
                >
                  商店
                </button>
                <button
                  className={`flex-1 py-2 text-center ${activeTab === 'inventory' ? 'border-b-2 border-blue-500 text-blue-800' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('inventory')}
                >
                  物品栏
                </button>
              </div>
              
              {/* 商店内容 */}
              {activeTab === 'shop' && (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {shopItems.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-blue-800">{item.name}</h4>
                        <span className="text-sm font-medium text-gray-700">{item.price} 元</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <button
                        onClick={() => buyItem(item.id)}
                        disabled={player.money < item.price}
                        className={`mt-2 w-full py-1 text-sm ${player.money >= item.price ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded transition-colors`}
                      >
                        购买
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 物品栏内容 */}
              {activeTab === 'inventory' && (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {player.items.length > 0 ? (
                    player.items.map((item) => (
                      <div key={item.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-blue-800">{item.name}</h4>
                          <span className="text-sm font-medium text-gray-700">数量: {item.quantity}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <button
                          onClick={() => useItem(item.id)}
                          className="mt-2 w-full py-1 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded transition-colors"
                        >
                          使用
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">物品栏为空</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMain;
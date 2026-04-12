import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore, { talents, Difficulty, GameDuration } from '../store/gameStore';

const CharacterCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedTalent, setSelectedTalent] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [selectedDuration, setSelectedDuration] = useState<GameDuration>(90);
  const navigate = useNavigate();
  const { createPlayer } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedTalent) {
      createPlayer(name.trim(), selectedTalent, selectedDifficulty, selectedDuration);
      navigate('/game');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">人生模拟器·高中副本</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">游戏昵称</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入你的游戏昵称"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">选择天赋</label>
            <div className="grid grid-cols-2 gap-3">
              {talents.map((talent) => (
                <div
                  key={talent.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTalent === talent.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setSelectedTalent(talent.id)}
                >
                  <h3 className="font-medium text-blue-800">{talent.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{talent.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">选择难度</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'easy' as Difficulty, label: '简单', description: '初始属性高，资源丰富' },
                { value: 'normal' as Difficulty, label: '普通', description: '平衡的游戏体验' },
                { value: 'hard' as Difficulty, label: '困难', description: '初始属性低，资源稀缺' }
              ].map((difficulty) => (
                <div
                  key={difficulty.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedDifficulty === difficulty.value ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setSelectedDifficulty(difficulty.value)}
                >
                  <h3 className="font-medium text-blue-800">{difficulty.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{difficulty.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">选择游戏时长</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 30 as GameDuration, label: '30天', description: '快速体验' },
                { value: 60 as GameDuration, label: '60天', description: '短期挑战' },
                { value: 90 as GameDuration, label: '90天', description: '完整体验 (推荐)' },
                { value: 120 as GameDuration, label: '120天', description: '长期挑战' }
              ].map((duration) => (
                <div
                  key={duration.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedDuration === duration.value ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setSelectedDuration(duration.value)}
                >
                  <h3 className="font-medium text-blue-800">{duration.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{duration.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!name.trim() || !selectedTalent}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始游戏
          </button>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreation;
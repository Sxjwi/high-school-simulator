import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useGameStore from './store/gameStore';
import CharacterCreation from './pages/CharacterCreation';
import GameMain from './pages/GameMain';
import EventModal from './components/EventModal';
import EndingPage from './pages/EndingPage';
import AchievementsPage from './pages/AchievementsPage';

function App() {
  const { player, isEventActive } = useGameStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Routes>
          <Route path="/" element={
            player ? <Navigate to="/game" /> : <CharacterCreation />
          } />
          <Route path="/game" element={
            player ? <GameMain /> : <Navigate to="/" />
          } />
          <Route path="/ending" element={
            player ? <EndingPage /> : <Navigate to="/" />
          } />
          <Route path="/achievements" element={
            player ? <AchievementsPage /> : <Navigate to="/" />
          } />
        </Routes>
        
        {/* 随机事件模态框 */}
        {isEventActive && <EventModal />}
      </div>
    </Router>
  );
}

export default App;
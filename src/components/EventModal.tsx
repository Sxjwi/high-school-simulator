import React from 'react';
import useGameStore from '../store/gameStore';

const EventModal: React.FC = () => {
  const { currentEvent, handleEventOption } = useGameStore();

  if (!currentEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-blue-800 mb-4">{currentEvent.title}</h2>
        <p className="text-gray-700 mb-6">{currentEvent.description}</p>
        <div className="space-y-3">
          {currentEvent.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleEventOption(index)}
              className="w-full py-2 px-4 border border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
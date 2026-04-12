import React from 'react';
import useGameStore, { courses } from '../store/gameStore';

const CourseSelectionModal: React.FC = () => {
  const { player, selectCourse, showCourseSelection } = useGameStore();

  if (!showCourseSelection || !player) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">选择课程</h2>
          <p className="text-gray-600">选择最多2门课程，它们将每天为你提供属性加成</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isSelected = player.selectedCourses.includes(course.id);
            return (
              <div
                key={course.id}
                onClick={() => selectCourse(course.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-semibold text-blue-800 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(course.effect).map(([key, value]) => (
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
              </div>
            );
          })}
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              已选择: {player.selectedCourses.length}/2
            </p>
            {player.selectedCourses.length > 0 && (
              <button
                onClick={() => {
                  useGameStore.setState({ showCourseSelection: false });
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                确认选择
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionModal;

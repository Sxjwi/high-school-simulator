import React from 'react';
import useGameStore, { craftingRecipes } from '../store/gameStore';

const CraftingModal: React.FC = () => {
  const { player, showCraftingModal, craftItem, toggleCraftingModal, getItemById } = useGameStore();

  if (!showCraftingModal || !player) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-800">物品制作</h2>
          <button
            onClick={toggleCraftingModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {craftingRecipes.length > 0 ? (
            <div className="space-y-4">
              {craftingRecipes.map((recipe) => {
                // 检查材料是否足够
                const hasEnoughMaterials = recipe.materials.every(material => {
                  const item = player.items.find(i => i.id === material.itemId);
                  return item && item.quantity >= material.quantity;
                });
                
                // 检查才艺要求
                const hasRequiredTalent = !recipe.requiredTalent || player.attributes.talent >= recipe.requiredTalent;
                
                const canCraft = hasEnoughMaterials && hasRequiredTalent;
                
                return (
                  <div key={recipe.id} className={`p-4 border rounded-xl ${canCraft ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-2">{recipe.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                        
                        {recipe.requiredTalent && (
                          <div className="mb-3">
                            <span className="text-xs text-gray-600">需要才艺: {recipe.requiredTalent}</span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className={`bg-pink-500 h-1.5 rounded-full transition-all duration-300 ${player.attributes.talent >= recipe.requiredTalent ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(100, (player.attributes.talent / recipe.requiredTalent) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700 mb-1 block">所需材料:</span>
                          <div className="space-y-1">
                            {recipe.materials.map((material, index) => {
                              const item = getItemById(material.itemId);
                              const playerItem = player.items.find(i => i.id === material.itemId);
                              const hasEnough = playerItem && playerItem.quantity >= material.quantity;
                              return (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item?.name || material.itemId}</span>
                                  <span className={hasEnough ? 'text-green-600' : 'text-red-600'}>
                                    {playerItem?.quantity || 0}/{material.quantity}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-gray-700 mb-1 block">制作结果:</span>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-700">{getItemById(recipe.result.itemId)?.name || recipe.result.itemId}</span>
                            <span className="text-gray-500 ml-2">×{recipe.result.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => craftItem(recipe.id)}
                      disabled={!canCraft}
                      className={`mt-4 w-full py-2 ${canCraft ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded-lg transition-colors font-medium`}
                    >
                      {canCraft ? '制作' : '无法制作'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">暂无制作配方</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CraftingModal;

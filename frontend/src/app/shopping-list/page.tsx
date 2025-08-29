"use client";

import { useState } from "react";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export default function ShoppingListPage() {
  const { items, removeItem, clearList } = useShoppingList();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  const handleEdit = (itemName: string, currentQuantity: number) => {
    setEditingItem(itemName);
    setEditQuantity(currentQuantity);
  };

  const saveEdit = () => {
    // In a real implementation, you would update the quantity
    // For now, we'll just close the edit mode
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping List</h1>
            <p className="text-gray-600">Items you need to buy will appear here</p>
          </header>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your shopping list is empty</h2>
            <p className="text-gray-600 mb-4">
              Add ingredients from recipes to your shopping list
            </p>
            <a 
              href="/recipes" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Discover Recipes
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Shopping List</h1>
            <button 
              onClick={clearList}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Clear All
            </button>
          </div>
          <p className="text-gray-600">
            You have {items.length} item{items.length === 1 ? '' : 's'} in your shopping list
          </p>
        </header>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.name} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 rounded mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      {editingItem === item.name ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(Number(e.target.value))}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                            min="0"
                            step="0.1"
                          />
                          <span className="ml-2 text-sm text-gray-500">{item.unit}</span>
                          <div className="ml-2">
                            <button 
                              onClick={saveEdit}
                              className="text-green-600 hover:text-green-900 mr-2"
                            >
                              Save
                            </button>
                            <button 
                              onClick={cancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleEdit(item.name, item.quantity || 0)}
                            className="ml-2 text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Print List
          </button>
        </div>
      </div>
    </div>
  );
}
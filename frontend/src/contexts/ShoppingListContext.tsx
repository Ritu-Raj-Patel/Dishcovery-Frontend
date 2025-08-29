"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Ingredient } from "@/types";

interface ShoppingListContextType {
  items: Ingredient[];
  addItem: (ingredient: Ingredient) => void;
  removeItem: (itemName: string) => void;
  clearList: () => void;
  isInList: (itemName: string) => boolean;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Ingredient[]>([]);

  // Load shopping list from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Failed to parse shopping list from localStorage:", error);
      }
    }
  }, []);

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addItem = (ingredient: Ingredient) => {
    setItems((prev) => {
      // Check if item is already in the list
      if (prev.some((item) => item.name === ingredient.name)) {
        return prev.map((item) => 
          item.name === ingredient.name 
            ? { ...item, quantity: (item.quantity || 0) + (ingredient.quantity || 0) }
            : item
        );
      }
      return [...prev, ingredient];
    });
  };

  const removeItem = (itemName: string) => {
    setItems((prev) => prev.filter((item) => item.name !== itemName));
  };

  const clearList = () => {
    setItems([]);
  };

  const isInList = (itemName: string) => {
    return items.some((item) => item.name === itemName);
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem, removeItem, clearList, isInList }}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
}
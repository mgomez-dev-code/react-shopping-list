import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { shoppingReducer, initialState } from './shoppingReducer';
import type { ShoppingState, Action } from './shoppingReducer';

type ShoppingCtxValue = {
  state: ShoppingState;
  dispatch: React.Dispatch<Action>;
};

const ShoppingCtx = createContext<ShoppingCtxValue | null>(null);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  // 1. Load initial state from localStorage (if exists)
  const persisted = localStorage.getItem("shopping_state");
  const parsed = persisted ? (JSON.parse(persisted) as ShoppingState) : initialState;

  const [state, dispatch] = useReducer(shoppingReducer, parsed);

  // 2. Save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem("shopping_state", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <ShoppingCtx.Provider value={value}>{children}</ShoppingCtx.Provider>;
}

export function useShopping() {
  const ctx = useContext(ShoppingCtx);
  if (!ctx) throw new Error('useShopping must be used within <ShoppingProvider>');
  return ctx;
}

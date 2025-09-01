// Shopping reducer: handles actions for shopping list state.

import type { Item, ItemStatus } from '../domain/models';

export type ShoppingState = {
  items: Item[];
};

// add action type
export type Action =
  | { type: 'ADD_ITEM'; payload: { name: string; quantity: number } }
  | { type: 'TOGGLE_STATUS'; payload: { id: string } }
  | { type: 'DELETE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; patch: { name?: string; quantity?: number } } }
  | { type: 'CLEAR_PURCHASED' }
  | { type: 'CLEAR_ALL' };


export const initialState: ShoppingState = {
  items: [],
};

export function shoppingReducer(
  state: ShoppingState,
  action: Action
): ShoppingState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const now = Date.now();
      const newItem: Item = {
        id: crypto.randomUUID(),
        name: action.payload.name.trim(),
        quantity: Math.max(1, action.payload.quantity ?? 1),
        status: 'pending', // string literal type
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, items: [newItem, ...state.items] };
    }
    case 'DELETE_ITEM': {
      const items = state.items.filter(it => it.id !== action.payload.id);
      return { ...state, items };
    }
    case 'CLEAR_PURCHASED': {
      const items = state.items.filter(it => it.status !== 'purchased');
      return { ...state, items };
    }
    case 'CLEAR_ALL': {
      return { ...state, items: [] };
    }
    case 'UPDATE_ITEM': {
      const items = state.items.map(it => {
        if (it.id !== action.payload.id) return it;
        const patch = { ...action.payload.patch };
        if (typeof patch.name === 'string') patch.name = patch.name.trim();
        if (typeof patch.quantity === 'number') patch.quantity = Math.max(1, patch.quantity);
        return { ...it, ...patch, updatedAt: Date.now() };
      });
      return { ...state, items };
    }
    case 'TOGGLE_STATUS': {
      const items = state.items.map((it) =>
        it.id === action.payload.id
          ? {
              ...it,
              status: it.status === 'pending' ? ('purchased' as ItemStatus) : 'pending',
              updatedAt: Date.now(),
            }
          : it
      );
      return { ...state, items };
    }
    default:
      return state;
  }
}

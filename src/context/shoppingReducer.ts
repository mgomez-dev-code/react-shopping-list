// Shopping reducer: handles all actions for the shopping list state.
// Implements a Redux-style reducer (state + action → new state).

import type { Item, ItemStatus } from '../domain/models';

// Global state for the shopping list: an array of items.
export type ShoppingState = {
  items: Item[];
};

// Define all action types the reducer can handle.
// Each action has a "type" string and optionally a "payload" with data.
export type Action =
  // Add a new item to the list
  | { type: 'ADD_ITEM'; payload: { name: string; quantity: number } }
  // Toggle an item's status between pending and purchased
  | { type: 'TOGGLE_STATUS'; payload: { id: string } }
  // Delete a specific item by ID
  | { type: 'DELETE_ITEM'; payload: { id: string } }
  // Update fields of an existing item (name or quantity)
  | { type: 'UPDATE_ITEM'; payload: { id: string; patch: { name?: string; quantity?: number } } }
  // Clear only purchased items from the list
  | { type: 'CLEAR_PURCHASED' }
  // Clear all items from the list
  | { type: 'CLEAR_ALL' };

// Initial state: empty shopping list
export const initialState: ShoppingState = {
  items: [],
};

// Main reducer: receives current state and an action, returns a new state.
// It never mutates the existing state directly.
export function shoppingReducer(
  state: ShoppingState,
  action: Action
): ShoppingState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Create a new item with a unique ID and timestamps
      const now = Date.now();
      const newItem: Item = {
        id: crypto.randomUUID(), // generate unique ID
        name: action.payload.name.trim(), // trim whitespace from name
        quantity: Math.max(1, action.payload.quantity ?? 1), // minimum quantity = 1
        status: 'pending', // initial status
        createdAt: now,
        updatedAt: now,
      };
      // Prepend new item to the array (spread operator to keep immutability)
      return { ...state, items: [newItem, ...state.items] };
    }

    case 'DELETE_ITEM': {
      // Remove the item whose ID matches the payload
      const items = state.items.filter(it => it.id !== action.payload.id);
      return { ...state, items };
    }

    case 'CLEAR_PURCHASED': {
      // Keep only items that are not purchased
      const items = state.items.filter(it => it.status !== 'purchased');
      return { ...state, items };
    }

    case 'CLEAR_ALL': {
      // Remove all items
      return { ...state, items: [] };
    }

    case 'UPDATE_ITEM': {
      // Apply a partial update (patch) to the matching item
      const items = state.items.map(it => {
        if (it.id !== action.payload.id) return it; // leave others unchanged
        const patch = { ...action.payload.patch };
        // Sanitize values before applying
        if (typeof patch.name === 'string') patch.name = patch.name.trim();
        if (typeof patch.quantity === 'number') patch.quantity = Math.max(1, patch.quantity);
        // Merge patch with the original item and update timestamp
        return { ...it, ...patch, updatedAt: Date.now() };
      });
      return { ...state, items };
    }

    case 'TOGGLE_STATUS': {
      // Switch status between pending and purchased
      const items = state.items.map((it) =>
        it.id === action.payload.id
          ? {
              ...it,
              // Toggle status using a safe literal type
              status: it.status === 'pending' ? ('purchased' as ItemStatus) : 'pending',
              updatedAt: Date.now(),
            }
          : it
      );
      return { ...state, items };
    }

    default:
      // For unknown actions, return the current state unchanged
      return state;
  }
}

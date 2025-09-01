// Domain models: core types used across the app.

// Prefer string union types over TypeScript enums with Vite/esbuild.
export type ItemStatus = 'pending' | 'purchased';

export type ItemId = string;

export type Item = {
  id: ItemId;
  name: string;       // e.g., "Rice"
  quantity: number;   // >= 1
  category?: string;  // optional: "Fruits", "Grains"
  priority?: number;  // 1..5
  status: ItemStatus; // 'pending' | 'purchased'
  createdAt: number;  // timestamp
  updatedAt: number;
};

// Optional helper to avoid magic strings in code:
export const ITEM_STATUS = {
  Pending: 'pending',
  Purchased: 'purchased',
} as const;

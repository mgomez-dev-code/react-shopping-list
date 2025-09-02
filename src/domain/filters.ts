// View-level type for filtering items by status.
export type StatusFilter = 'all' | 'pending' | 'purchased';
export type FilterCounts = Record<StatusFilter, number>;
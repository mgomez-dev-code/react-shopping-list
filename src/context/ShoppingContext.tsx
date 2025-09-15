import { createContext, useContext, useMemo, useReducer, useEffect, type ReactNode } from 'react';
import { shoppingReducer, initialState } from './shoppingReducer';
import type { ShoppingState, Action } from './shoppingReducer';

type ShoppingCtxValue = {
  state: ShoppingState;
  dispatch: React.Dispatch<Action>;
};

// Create a context that will carry the shopping state and dispatch.
// We start with `null` to force consumers to use the provider.
const ShoppingCtx = createContext<ShoppingCtxValue | null>(null);

// Safe loader for persisted state (handles SSR and JSON parse errors).
function loadPersistedState(): ShoppingState {
  // In SSR environments `window`/`localStorage` may be undefined.
  if (typeof window === 'undefined') return initialState;

  try {
    const raw = localStorage.getItem('shopping_state');
    if (!raw) return initialState;

    const parsed = JSON.parse(raw) as Partial<ShoppingState>;
    // Lightweight runtime guard to avoid breaking if shape changes.
    if (!parsed || !Array.isArray(parsed.items)) return initialState;

    return { ...initialState, ...parsed };
  } catch {
    // If JSON is corrupted or incompatible, fall back to a clean state.
    return initialState;
  }
}

export function ShoppingProvider({ children }: { children: ReactNode }) {
  // 1) Initialize reducer with a *lazy initializer* so load happens once.
  //    This avoids double JSON.parse in StrictMode dev and plays nice with SSR.
  const [state, dispatch] = useReducer(
    shoppingReducer,
    undefined,
    () => loadPersistedState()
  );

  // 2) Persist every state change into localStorage.
  //    Note: this runs only in the browser; in SSR this effect won't execute.
  useEffect(() => {
    try {
      localStorage.setItem('shopping_state', JSON.stringify(state));
    } catch {
      // Silently ignore quota or serialization issues.
      // In a real app you might report this to telemetry.
    }
  }, [state]);

  // Memoize the context value so consumers don't re-render unnecessarily.
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <ShoppingCtx.Provider value={value}>{children}</ShoppingCtx.Provider>;
}

// Hook to consume the shopping context from child components.
// Throws a descriptive error if used outside of <ShoppingProvider>.
export function useShopping() {
  const ctx = useContext(ShoppingCtx);
  if (!ctx) throw new Error('useShopping must be used within <ShoppingProvider>');
  return ctx;
}

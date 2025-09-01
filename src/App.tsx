import React from "react";
import { ShoppingProvider, useShopping } from "./context/ShoppingContext";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function DebugCounter() {
  const { state, dispatch } = useShopping();
  const itemsCount = state.items.length;
  const totalUnits = state.items.reduce((acc, it) => acc + it.quantity, 0);
  const purchasedCount = state.items.filter(it => it.status === 'purchased').length;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <p style={{ margin: 0 }}>
        Items: {itemsCount} | Total units: {totalUnits}
        {purchasedCount > 0 && ` | Purchased: ${purchasedCount}`}
      </p>
      <button
        onClick={() => dispatch({ type: 'CLEAR_PURCHASED' })}
        disabled={purchasedCount === 0}
        title="Remove all purchased items"
      >
        Clear purchased
      </button>
      <button
        onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        disabled={itemsCount === 0}
        title="Remove all items"
      >
        Clear all
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ShoppingProvider>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-xl mx-auto p-6">
          <h1 className="text-3xl font-extrabold text-sky-700 mb-4">Shopping List</h1>
          <ItemForm />
          <DebugCounter />
          <ItemList />
        </div>
      </main>
    </ShoppingProvider>
  );
}

import React, { useState } from "react";
import { ShoppingProvider, useShopping } from "./context/ShoppingContext";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import FilterBar from "./components/FilterBar";
import type { StatusFilter } from "./domain/filters";

function DebugCounter() {
  const { state, dispatch } = useShopping();
  const itemsCount = state.items.length;
  const totalUnits = state.items.reduce((acc, it) => acc + it.quantity, 0);
  const purchasedCount = state.items.filter(it => it.status === 'purchased').length;

  return (
    <div className="flex items-center gap-3">
      <p className="m-0 text-sm text-slate-700">
        Items: <span className="font-semibold">{itemsCount}</span> | Total units:{" "}
        <span className="font-semibold">{totalUnits}</span>
        {purchasedCount > 0 && (
          <> | Purchased: <span className="font-semibold">{purchasedCount}</span></>
        )}
      </p>
      <button
        onClick={() => dispatch({ type: "CLEAR_PURCHASED" })}
        disabled={purchasedCount === 0}
        title="Remove all purchased items"
        className="px-3 py-1 rounded-md text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 disabled:opacity-40 disabled:hover:bg-amber-100"
      >
        Clear purchased
      </button>
      <button
        onClick={() => dispatch({ type: "CLEAR_ALL" })}
        disabled={itemsCount === 0}
        title="Remove all items"
        className="px-3 py-1 rounded-md text-sm bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-40 disabled:hover:bg-rose-100"
      >
        Clear all
      </button>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState<StatusFilter>("all");

  return (
    <ShoppingProvider>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-xl mx-auto p-6 space-y-4">
          <h1 className="text-3xl font-extrabold text-sky-700">Shopping List</h1>
          <ItemForm />
          <DebugCounter />
          {/* Pills de filtro */}
          <FilterBar value={filter} onChange={setFilter} />
          {/* Lista filtrada */}
          <ItemList filter={filter} />
        </div>
      </main>
    </ShoppingProvider>
  );
}

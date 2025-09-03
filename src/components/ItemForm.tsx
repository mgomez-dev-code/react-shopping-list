import { useState, type FormEvent } from "react";
import { useShopping } from "../context/ShoppingContext";

export default function ItemForm() {
  const { dispatch } = useShopping();
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: "ADD_ITEM", payload: { name, quantity: qty } });
    setName("");
    setQty(1);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Item name (e.g. Rice)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm
                   placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-20 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
      <button
        type="submit"
        className="cursor-pointer px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium
                   hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Add
      </button>
    </form>
  );
}

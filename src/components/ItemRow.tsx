import { useState, type KeyboardEvent } from "react";
import type { Item } from "../domain/models";
import { useShopping } from "../context/ShoppingContext";

type Props = { item: Item };

export default function ItemRow({ item }: Props) {
  const { dispatch } = useShopping();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.quantity);

  const save = () => {
    const n = name.trim();
    if (!n) return;
    dispatch({ type: "UPDATE_ITEM", payload: { id: item.id, patch: { name: n, quantity: qty } } });
    setEditing(false);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <li className="flex items-center gap-3 p-3">
      {!editing ? (
        <>
          {/* Toggle */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: { id: item.id } })}
            className="cursor-pointer inline-flex h-7 w-7 items-center justify-center rounded-md
                       bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
            title="Toggle purchased"
          >
            {item.status === "pending" ? "☐" : "☑"}
          </button>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <span className={item.status === "purchased" ? "line-through text-slate-400" : "text-slate-900"}>
              {item.name}
            </span>{" "}
            <span className="text-slate-600">× {item.quantity}</span>
            {item.status === "purchased" && <span className="ml-1">🛒</span>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              onClick={() => setEditing(true)}
              className="cursor-pointer px-2 py-1 text-sm rounded-md bg-amber-100 text-amber-800
                         hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              title="Edit"
            >
              ✏️
            </button>

            {/* Delete */}
            <button
              onClick={() => dispatch({ type: "DELETE_ITEM", payload: { id: item.id } })}
              className="cursor-pointer px-2 py-1 text-sm rounded-md bg-rose-100 text-rose-800
                          hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Edit fields */}
          <div className="flex-1 flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              aria-label="Edit name"
              className="flex-1 min-w-0 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              onKeyDown={onKey}
              aria-label="Edit quantity"
              className="w-24 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {/* Edit actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              className="cursor-pointer px-3 py-1 text-sm rounded-md bg-emerald-600 text-white
                        hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              title="Save"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="cursor-pointer px-3 py-1 text-sm rounded-md bg-slate-200 hover:bg-slate-300
                        focus:outline-none focus:ring-2 focus:ring-slate-300"
              title="Cancel"
            >
              ✖ Cancel
            </button>
          </div>
        </>
      )}
    </li>
  );
}

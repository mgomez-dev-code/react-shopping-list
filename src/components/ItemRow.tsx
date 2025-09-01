import React, { useState } from "react";
import type { Item } from "../domain/models";
import { useShopping } from "../context/ShoppingContext";

type Props = { item: Item };

export default function ItemRow({ item }: Props) {
  const { dispatch } = useShopping();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.quantity);

  function startEdit() {
    setName(item.name);
    setQty(item.quantity);
    setEditing(true);
  }
  function cancelEdit() {
    setEditing(false);
  }
  function saveEdit() {
    if (!name.trim()) return; // keep simple: do not allow empty
    dispatch({ type: "UPDATE_ITEM", payload: { id: item.id, patch: { name, quantity: qty } } });
    setEditing(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  }

  return (
    <li style={{ marginBottom: 8 }}>
      {!editing ? (
        <>
          <button
            onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: { id: item.id } })}
            title="Toggle purchased"
            style={{ marginRight: 8 }}
          >
            {item.status === "pending" ? "☐" : "☑"}
          </button>

          <strong>{item.name}</strong> × {item.quantity}
          {item.status === "purchased" && <span style={{ marginLeft: 6 }}>🛒</span>}

          <button onClick={startEdit} style={{ marginLeft: 12 }} title="Edit item">✏️</button>
          <button
            onClick={() => dispatch({ type: "DELETE_ITEM", payload: { id: item.id } })}
            title="Delete item"
            style={{ marginLeft: 8 }}
            aria-label={`Delete ${item.name}`}
          >
            🗑️
          </button>
        </>
      ) : (
        <>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ marginRight: 8 }}
            autoFocus
            aria-label="Edit name"
          />
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            onKeyDown={onKeyDown}
            style={{ width: 70, marginRight: 8 }}
            aria-label="Edit quantity"
          />
          <button onClick={saveEdit} title="Save">💾 Save</button>
          <button onClick={cancelEdit} style={{ marginLeft: 8 }} title="Cancel">✖ Cancel</button>
        </>
      )}
    </li>
  );
}

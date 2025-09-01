// ItemForm: minimal form to add a shopping item.
// Uses the shopping context to dispatch an ADD_ITEM action.

import React, { useState } from 'react';
import { useShopping } from '../context/ShoppingContext';

export default function ItemForm() {
  const { dispatch } = useShopping();
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return; // do nothing if input is empty

    dispatch({ type: 'ADD_ITEM', payload: { name, quantity: qty } });
    setName('');
    setQty(1);
  }

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Item name (e.g. Rice)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        style={{ width: 60, marginRight: 8 }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

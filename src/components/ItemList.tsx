import React from "react";
import { useShopping } from "../context/ShoppingContext";
import ItemRow from "./ItemRow";

export default function ItemList() {
  const { state } = useShopping();

  if (state.items.length === 0) return <p>No items yet.</p>;

  return (
    <ul style={{ paddingLeft: 0, listStyle: "none" }}>
      {state.items.map(it => (
        <ItemRow key={it.id} item={it} />
      ))}
    </ul>
  );
}

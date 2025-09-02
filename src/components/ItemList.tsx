import React from "react";
import { useShopping } from "../context/ShoppingContext";
import ItemRow from "./ItemRow";
import type { StatusFilter } from "../domain/filters";

type Props = { filter: StatusFilter };

export default function ItemList({ filter }: Props) {
  const { state } = useShopping();

  const visible = state.items.filter((it) =>
    filter === "all" ? true : it.status === filter
  );

  if (visible.length === 0) {
    return <p className="text-sm text-slate-500">No items yet.</p>;
  }

  return (
    <ul className="divide-y divide-slate-200 bg-white rounded-lg shadow-sm border border-slate-200">
      {visible.map((it) => (
        <ItemRow key={it.id} item={it} />
      ))}
    </ul>
  );
}

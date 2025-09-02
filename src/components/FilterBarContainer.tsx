import React from "react";
import { useShopping } from "../context/ShoppingContext";
import FilterBar from "./FilterBar";
import type { StatusFilter, FilterCounts } from "../domain/filters";

type Props = {
  value: StatusFilter;
  onChange: (next: StatusFilter) => void;
};

export default function FilterBarContainer({ value, onChange }: Props) {
  const { state } = useShopping();

  const counts: FilterCounts = {
    all: state.items.length,
    pending: state.items.filter((it) => it.status === "pending").length,
    purchased: state.items.filter((it) => it.status === "purchased").length,
  };

  return <FilterBar value={value} onChange={onChange} counts={counts} />;
}

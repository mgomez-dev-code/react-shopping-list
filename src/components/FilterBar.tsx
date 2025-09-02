import React from "react";
import type { StatusFilter, FilterCounts } from "../domain/filters";

type Props = {
  value: StatusFilter;
  onChange: (next: StatusFilter) => void;
  counts: FilterCounts;
};

const options: StatusFilter[] = ["all", "pending", "purchased"];

export default function FilterBar({ value, onChange, counts }: Props) {
  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={active}
            className={[
              "cursor-pointer px-3 py-1 rounded-full capitalize transition flex items-center gap-2",
              active ? "bg-sky-600 text-white shadow" : "text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            <span>{opt}</span>
            <span
              className={[
                "min-w-6 text-center rounded-full px-2 py-[2px] text-xs",
                active ? "bg-white/20" : "bg-slate-200 text-slate-700",
              ].join(" ")}
            >
              {counts[opt]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

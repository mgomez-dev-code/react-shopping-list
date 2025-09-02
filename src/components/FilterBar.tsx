import React from "react";
import type { StatusFilter } from "../domain/filters";

type Props = {
  value: StatusFilter;
  onChange: (next: StatusFilter) => void;
};

const options: StatusFilter[] = ['all', 'pending', 'purchased'];

export default function FilterBar({ value, onChange }: Props) {
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
              "px-3 py-1 rounded-full capitalize transition",
              active
                ? "bg-sky-600 text-white shadow"
                : "text-slate-700 hover:bg-white"
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

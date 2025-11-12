import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  label: string;
  defaultLabel?: string;
  options: Record<string, number>;
  register?: UseFormRegisterReturn;
  isLoading?: boolean;
}

export function Select({
  label,
  defaultLabel = "Selecionar",
  options,
  register,
  isLoading = false,
}: SelectProps) {
  return (
    <div className="flex flex-col p-2">
      {isLoading ? (
        // Skeleton visual
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="h-4 w-24 bg-gray-300 rounded-md" />
          <div className="h-9 bg-gray-200 rounded-md" />
        </div>
      ) : (
        <>
          <span className="text-black font-semibold p-1">{label}</span>
          <select
            {...register}
            defaultValue=""
            className="bg-white text-black font-semibold border border-black/35 rounded-[8px] p-2 focus:border-purple-500 focus:outline-none"
          >
            <option value="" disabled>
              {defaultLabel}
            </option>
            {Object.entries(options).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

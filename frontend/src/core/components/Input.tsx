import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  isLoading?: boolean;
}

export function Input({
  label,
  icon,
  placeholder,
  type = "text",
  register,
  isLoading = false,
}: InputProps) {
  return (
    <div className="flex flex-col p-2">
      {isLoading ? (
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="h-4 w-24 bg-gray-300 rounded-md" />
          <div className="h-9 bg-gray-200 rounded-md" />
        </div>
      ) : (
        <>
          <span className="text-black font-semibold p-1">{label}</span>
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <input
              type={type}
              placeholder={placeholder}
              {...register}
              className="flex-1 bg-white text-black font-semibold border border-black/35 rounded-[8px] p-2 placeholder:text-black/50 placeholder:text-[14px] focus:border-purple-500 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
}

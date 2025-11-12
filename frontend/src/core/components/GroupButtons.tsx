import { Save } from "lucide-react";
import { MoonLoader } from "react-spinners";

interface GroupButtonsProps {
  saveLabel?: string;
  cancelLabel?: string;
  saveOnClick?: () => void;
  cancelOnClick?: () => void;
  isLoading?: boolean;
}

export function GroupButtons({
  saveLabel = "Salvar",
  cancelLabel = "Cancelar",
  saveOnClick,
  cancelOnClick,
  isLoading = false,
}: GroupButtonsProps) {
  return (
    <div className="flex flex-row gap-2 justify-end p-2">
      <button
        type="button"
        className="flex items-center gap-1 bg-red-500 rounded-[8px] text-white px-3 py-2 cursor-pointer justify-center hover:bg-red-700 disabled:opacity-60"
        onClick={cancelOnClick}
        disabled={isLoading}
      >
        {cancelLabel}
      </button>

      <button
        type="submit"
        className="flex items-center gap-2 bg-purple-500 rounded-[8px] text-white px-3 py-2 cursor-pointer justify-center hover:bg-purple-700 disabled:opacity-60"
        onClick={() => saveOnClick?.()}
        disabled={isLoading}
      >
        {isLoading ? (
          <MoonLoader size={18} color="#fff" />
        ) : (
          <>
            <Save size={16} color="white" />
            {saveLabel}
          </>
        )}
      </button>
    </div>
  );
}

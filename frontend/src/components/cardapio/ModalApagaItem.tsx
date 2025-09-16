"use client";

type ModalApagaItemProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export default function ModalApagaItem({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ModalApagaItemProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg pointer-events-auto">
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

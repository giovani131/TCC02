import { useState } from "react";

type ModalAdicionarItemProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: {
    nome: string;
    descricao: string;
    valor: string;
    imagem?: File | null;
  }) => void;
};

export default function ModalAdicionarItem({ isOpen, onClose, onSave }: ModalAdicionarItemProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSalvar = () => {
    onSave({ nome, descricao, valor, imagem });
    onClose();
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagem(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Adicionar Item</h2>

        {/* Nome do prato */}
        <label className="block mb-2 font-medium">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Descrição */}
        <label className="block mb-2 font-medium">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Valor */}
        <label className="block mb-2 font-medium">Valor</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Imagem */}
        <label className="block mb-2 font-medium">Imagem do prato</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
          className="w-full mb-4"
        />

        {/* Preview da imagem */}
        {preview && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Pré-visualização:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded border"
            />
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSalvar}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

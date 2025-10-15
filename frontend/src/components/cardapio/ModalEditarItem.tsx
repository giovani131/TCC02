import { useEffect, useState } from "react";

type ModalAdicionarItemProps = {
  isOpen: boolean;
  onClose: () => void;
  itemEmEdição: { id: number; nome_item: string; descricao_item: string; preco_item: number; visivel: boolean; imagem: string; } | null
  onSave: (dados: {
    nome_item: string;
    descricao_item: string;
    preco_item: number;
    imagem: File;
    visivel: boolean;
  }) => void;
};

export default function ModalAdicionarItem({ isOpen, onClose,itemEmEdição, onSave }: ModalAdicionarItemProps) {
  
  const [nome_item, setNomeItem] = useState("");
  const [descricao_item, setDescricaoItem] = useState("");
  const [preco_item, setPrecoItem] = useState<number | "">(0);
  const [imagem, setImagem] = useState<File | null>(null);
  const [visivel, setVisivel] = useState(false)
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (itemEmEdição) {
      setNomeItem(itemEmEdição.nome_item);
      setDescricaoItem(itemEmEdição.descricao_item);
      setPrecoItem(itemEmEdição.preco_item);
      setVisivel(itemEmEdição.visivel);
      setPreview(itemEmEdição.imagem ? itemEmEdição.imagem : null);
      setImagem(null);
    }
  }, [isOpen]); 

  if (!isOpen) return null;

  const handleSalvar = () => {
    if (!imagem) {
      alert("Selecione uma imagem antes de salvar!");
      return;
    }

    onSave({ nome_item, descricao_item, preco_item: Number(preco_item), imagem, visivel });
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Editar Item</h2>

        {/* Nome do prato */}
        <label className="block mb-2 font-medium">Nome</label>
        <input
          type="text"
          value={nome_item}
          onChange={(e) => setNomeItem(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Descrição */}
        <label className="block mb-2 font-medium">Descrição</label>
        <input
          type="text"
          value={descricao_item}
          onChange={(e) => setDescricaoItem(e.target.value)}
          className="w-full mb-4 border rounded px-3 py-2"
        />

        {/* Preço */}
        <label className="block mb-2 font-medium">Preço</label>
        <input
          type="number"
          step="0.01"
          value={preco_item}
          onChange={(e) => setPrecoItem(e.target.value === "" ? "" : parseFloat(e.target.value))}
          className="w-full mb-4 border rounded px-3 py-2"
        />
        
        {/* Visibilidade */}
        <label className="block mb-2 font-medium">Visibilidade</label>
        <select
          value={visivel ? "true" : "false"}
          onChange={(e) => setVisivel(e.target.value === "true")}
          className="w-full mb-4 border rounded px-3 py-2"
        >
          <option value="true">Visível</option>
          <option value="false">Oculto</option>
        </select>

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

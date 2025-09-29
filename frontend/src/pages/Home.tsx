import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModalEditarUsuario from "@/components/ModalEditarUsuario";
import ModalApagarConta from "@/components/ModelApagarConta";
import { User, Edit2, Trash2 } from "lucide-react";

type Usuario = {
  nome: string;
  email: string;
  telefone: string;
};

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // Buscar dados do usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/usuarioDados", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUsuario(data);
        else router.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsuario();
  }, [router]);

  // Atualizar usuário
  const handleUpdateUsuario = async (formData: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5500/api/editarUsuario", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUsuario({
          nome: data.user.nome,
          email: data.user.email,
          telefone: data.user.telefone,
        });
        alert("Dados atualizados com sucesso!");
        setIsModalEditOpen(false);
      } else {
        alert(data.message || "Erro ao atualizar dados");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor.");
    }
  };

  // Apagar usuário
  const handleDeleteAccount = async (senha: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5500/api/deletarUsuario", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senha }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Conta apagada com sucesso!");
        localStorage.removeItem("token");
        router.push("/");
      } else {
        alert(data.message || "Erro ao apagar conta");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor.");
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-[22%] bg-white p-6 shadow-xl flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-800 text-center">Minha Conta</h2>

          {/* Card do Usuário */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-500">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="mt-3 font-bold text-gray-800 text-lg">
              {usuario?.nome || "Carregando..."}
            </h3>
            <p className="text-sm flex items-center justify-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Ativo</span>
            </p>
            <p className="text-sm text-gray-500 mt-4">{usuario?.email}</p>
            <p className="text-sm text-gray-500">{usuario?.telefone}</p>
          </div>

          {/* Botões com animação */}
          <div className="flex flex-col items-center space-y-3">
            <button
              className="w-4/5 max-w-[220px] border-2 border-purple-500 text-purple-600 font-medium rounded-lg py-2 flex items-center justify-center gap-2
                        transition transform duration-200 ease-out
                        hover:bg-purple-50 hover:scale-105 hover:shadow-md active:scale-95"
              onClick={() => setIsModalEditOpen(true)}
            >
              <Edit2 className="w-5 h-5" />
              Editar Dados
            </button>

            <button
              className="w-4/5 max-w-[220px] border-2 border-red-500 text-red-600 font-medium rounded-lg py-2 flex items-center justify-center gap-2
                        transition transform duration-200 ease-out
                        hover:bg-red-50 hover:scale-105 hover:shadow-md active:scale-95"
              onClick={() => setIsModalDeleteOpen(true)}
            >
              <Trash2 className="w-5 h-5" />
              Apagar Conta
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium
                    transition transform duration-200 ease-out
                    hover:bg-purple-700 hover:scale-105 hover:shadow-lg active:scale-95"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          Logout
        </button>
      </aside>




      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📍 Mapa de restaurantes</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 h-195">
          <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Mapa interativo aqui]</p>
          </div>
        </div>
      </main>

      {/* Modais */}
      <ModalEditarUsuario
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        usuario={usuario}
        onSave={handleUpdateUsuario}
      />

      <ModalApagarConta
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Usuario = {
  nome: string;
  email: string;
  telefone: string;
  criado_em: string;
};

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

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

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Meus Dados</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Perfil"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-center mt-2 font-bold">
              {usuario?.nome || "Carregando..."}
            </h3>
            <p className="text-center text-purple-600 text-sm">Ativo</p>
            <p className="text-sm text-gray-600 mt-4">{usuario?.email}</p>
            <p className="text-sm text-gray-600">{usuario?.telefone}</p>
            <p className="text-sm text-gray-600">
              Membro desde "AINDA NAO TEM NO BANCO"
            </p>
          </div>

          <button className="w-full border rounded-lg p-2 flex items-center gap-2 mb-2">
            ✏️ Editar Dados
          </button>
          <button className="w-full border rounded-lg p-2 flex items-center gap-2 text-red-600 mb-2">
            🗑 Apagar Conta
          </button>
        </div>

        <button
          className="w-full bg-purple-500 text-white p-3 rounded-lg"
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
        <h1 className="text-2xl font-bold mb-6">📍 Mapa de restaurantes</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 h-full">
          <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Mapa interativo aqui]</p>
          </div>
        </div>
      </main>
    </div>
  );
}

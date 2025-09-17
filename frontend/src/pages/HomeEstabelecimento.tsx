import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Edit2, Clock, UtensilsCrossed, ListChecks, Settings, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cardapio from "@/components/cardapio/Cardapio";
import Horarios from "@/components/Horarios";

type Estabelecimento = {
  nome_restaurante: string;
  cpf_cnpj_responsavel: string;
  telefone_responsavel: string;
  email_responsavel: string;
  endereco_rua: string;
  endereco_bairro: string;
  endereco_num: string;
  criado_em: string;
};

export default function HomeEstabelecimento() {
  const router = useRouter();
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [activeTab, setActiveTab] = useState("reservasPendentes");

  // Buscar dados do restaurante
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchEstabelecimento = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/estabelecimentoDados", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setEstabelecimento(data);
        else router.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstabelecimento();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Meu Estabelecimento</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-400">
              <Store className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-center mt-2 font-bold">
              {estabelecimento?.nome_restaurante || "Carregando..."}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{estabelecimento?.email_responsavel}</p>
            <p className="text-sm text-gray-600">{estabelecimento?.telefone_responsavel}</p>
            <p className="text-sm text-gray-600 mt-2">
              {estabelecimento?.endereco_rua}, {estabelecimento?.endereco_num} -{" "}
              {estabelecimento?.endereco_bairro}
            </p>
          </div>

          {/* Botões da sidebar */}
          <button
            className="w-full border rounded-lg p-2 flex items-center gap-2 mb-3
                      transition transform duration-200 ease-out
                      hover:bg-purple-100 hover:scale-105 hover:shadow-md
                      active:scale-95"
          >
            <Edit2 className="w-5 h-5 text-purple-600" />
            Editar Dados
          </button>

          <button
            className="w-full border rounded-lg p-2 flex items-center gap-2 mb-3
                      transition transform duration-200 ease-out
                      hover:bg-purple-100 hover:scale-105 hover:shadow-md
                      active:scale-95"
          >
            🗑 Apagar Conta
          </button>
        </div>

        <button
          className="w-full bg-purple-500 text-white p-3 rounded-lg
                    transition transform duration-200 ease-out
                    hover:bg-purple-600 hover:scale-105 hover:shadow-lg
                    active:scale-95"
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
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          {[
            { key: "reservasPendentes", label: "Reservas Pendentes", icon: ListChecks },
            { key: "reservasAceitas", label: "Reservas Aceitas", icon: Settings },
            { key: "cardapio", label: "Cardápio", icon: BookOpen },
            { key: "horarios", label: "Horários", icon: Clock },
            { key: "mesas", label: "Mesas e Cadeiras", icon: UtensilsCrossed },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo animado */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-[750px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === "reservasPendentes" && (
                <p className="text-gray-600">📋 Aqui ficam as reservas pendentes...</p>
              )}
              {activeTab === "reservasAceitas" && (
                <p className="text-gray-600">✅ Aqui ficam as reservas aceitas...</p>
              )}
              {activeTab === "cardapio" && <Cardapio/>}
              {activeTab === "horarios" && <Horarios/>}
              {activeTab === "mesas" && (
                <p className="text-gray-600">🍽️ Aqui você controla mesas e cadeiras...</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, User, IdCard, Building2, Mail, Phone,Edit2, Clock, UtensilsCrossed, ListChecks, Settings, BookOpen, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cardapio from "@/components/cardapio/Cardapio";
import Horarios from "@/components/Horarios";
import ModalApagarConta from "@/components/ModelApagarConta";
import ModalEditarEstabelecimento from "@/components/ModalEditarEstabelecimento";

type Estabelecimento = {
  nome_restaurante: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  cnpj: string;
  telefone_responsavel: string;
  email_responsavel: string;
};

export default function HomeEstabelecimento() {
  const router = useRouter();
  
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [activeTab, setActiveTab] = useState("reservasPendentes");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dadosCompletos, setDadosCompletos] = useState<boolean | null>(null);


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
        if (res.ok){ 
          setEstabelecimento(data);
          setDadosCompletos(data.dados_completos);
        }
        else router.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstabelecimento();
  }, [router]);

  // Atualizar estabelecimento
  const handleUpdateEstabelecimento = async (formData: {
    nome_restaurante: string;
    nome_responsavel: string;
    cpf_responsavel: string;
    cnpj: string;
    telefone_responsavel: string;
    email_responsavel: string;
    senha: string;
  }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5500/api/editarEstabelecimento", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        // Atualiza o estado do estabelecimento no front
        setEstabelecimento({
          nome_restaurante: data.user.nome_restaurante,
          nome_responsavel: data.user.nome_responsavel,
          cpf_responsavel: data.user.cpf_responsavel,
          cnpj: data.user.cnpj,
          telefone_responsavel: data.user.telefone_responsavel,
          email_responsavel: data.user.email_responsavel,
        });
        alert("Dados do estabelecimento atualizados com sucesso!");
        setIsModalEditOpen(false);
      } else {
        alert(data.message || "Erro ao atualizar os dados do estabelecimento");
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };



  // Apagar estabelecimento
  const handleDeleteEstabelecimento = async (senha: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5500/api/deletarEstabelecimento", {
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
    <div className="flex min-h-screen bg-purple-50 max-w-screen overflow-x-hidden overflow-y-auto">
      {/* Sidebar */}
      <aside className="w-[22%] bg-white p-6 shadow-xl flex flex-col justify-between ">
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-800 text-center">Meu Estabelecimento</h2>

          {/* Card do Estabelecimento */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md text-center">
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-500">
              <Store className="w-10 h-10 text-purple-600" />
            </div>

            {/* Nome */}
            <h3 className="mt-3 font-bold text-gray-800 text-lg">
              {estabelecimento?.nome_restaurante || "Carregando..."}
            </h3>

            {/* Status */}
            <p className="text-sm flex items-center justify-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Ativo</span>
            </p>

            {/* Informações detalhadas */}
            <div className="mt-4 space-y-3 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Responsável:</span>
                <span>{estabelecimento?.nome_responsavel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IdCard className="w-4 h-4 text-purple-500" />
                <span className="font-medium">CPF:</span>
                <span>{estabelecimento?.cpf_responsavel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4 text-purple-500" />
                <span className="font-medium">CNPJ:</span>
                <span>{estabelecimento?.cnpj}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Email:</span>
                <span>{estabelecimento?.email_responsavel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Telefone:</span>
                <span>{estabelecimento?.telefone_responsavel}</span>
              </div>
            </div>
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

            {dadosCompletos === false && (
              <button
                type="button"
                className="w-4/5 max-w-[220px] border-2 border-yellow-500 text-yellow-600 font-medium rounded-lg py-2 flex items-center justify-center gap-2
                          transition transform duration-200 ease-out
                          hover:bg-yellow-50 hover:scale-105 hover:shadow-md active:scale-95"
                onClick={() => router.push("/CompletarDados")}
              >
                Completar Cadastro
              </button>
            )}

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

      <ModalEditarEstabelecimento
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        estabelecimento={estabelecimento}
        onSave={handleUpdateEstabelecimento}
      />      

      <ModalApagarConta
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleDeleteEstabelecimento}
      />
    </div>
  );
}

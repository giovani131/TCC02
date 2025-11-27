import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, User, IdCard, Building2, Mail, Phone,Edit2, Clock, UtensilsCrossed, ListChecks, Settings, BookOpen, Trash2, FileText, MapPin, Navigation, Home, Landmark, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cardapio from "@/components/cardapio/Cardapio";
import Horarios from "@/components/Horarios";
import ModalApagarConta from "@/components/ModelApagarConta";
import ModalEditarEstabelecimentoInicial from "@/components/ModalEditarEstabelecimentoInicial";
import ModalEditarEstabelecimentoEndereco from "@/components/ModalEditarEstabelecimentoEndereco";
import ModalEditarEstabelecimentoInfosAdicionais from "@/components/ModalEditarEstabelecimentoInfosAdicionais";
import { Areas } from "../components/areas/Areas";

type EstabelecimentoDadosIniciais = {
  nome_restaurante: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  cnpj: string;
  telefone_responsavel: string;
  email_responsavel: string;
};

type EstabelecimentoDadosEndereco = {
  endereco_cep: string; 
  endereco_estado: string;
  endereco_cidade: string;
  endereco_bairro: string;
  endereco_rua: string;
  endereco_num: string;
}

type EstabelecimentoDadosAdicional = {
  telefone_restaurante: string;
  especialidade: string;
  descricao_restaurante: string;
  meios_pagamento: string[];
  tipos_servico: string[];
}

export default function HomeEstabelecimento() {
  const router = useRouter();
  
  const [estabelecimentoInicial, setEstabelecimentoInicial] = useState<EstabelecimentoDadosIniciais | null>(null);
  const [estabelecimentoEndereco, setEstabelecimentoEndereco] = useState<EstabelecimentoDadosEndereco | null>(null);
  const [estabelecimentoAdicional, setEstabelecimentoAdicional] = useState<EstabelecimentoDadosAdicional | null>(null);
  const [activeTab, setActiveTab] = useState("reservasPendentes");
  const [activeInfoTab, setActiveInfoTab] = useState("iniciais");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditInicialOpen, setIsModalEditInicialOpen] = useState(false);
  const [isModalEditEnderecoOpen, setIsModalEditEnderecoOpen] = useState(false);
  const [isModalEditAdicionalOpen, setIsModalEditAdicionalOpen] = useState(false);


  const [dadosCompletos, setDadosCompletos] = useState<boolean | null>(null);
  const[status, setStatus] = useState<Number | null>(null);


  // Buscar dados iniciais do restaurante
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchEstabelecimento = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/estabelecimentoLogadoDadosIniciais", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok){ 
          console.log(data)
          setEstabelecimentoInicial(data);
          setDadosCompletos(data.dados_completos);
          setStatus(data.status);
        }
        else router.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstabelecimento();
  }, [router]);

  useEffect(() => {
    if (!dadosCompletos) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchEstabelecimento = async () => {
      try {
        const res = await fetch(
          "http://localhost:5500/api/estabelecimentoLogadoDadosCompletos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          console.log(data);

          setEstabelecimentoEndereco({
            endereco_cep: data.endereco_cep,
            endereco_estado: data.endereco_estado,
            endereco_cidade: data.endereco_cidade,
            endereco_bairro: data.endereco_bairro,
            endereco_rua: data.endereco_rua,
            endereco_num: data.endereco_num,
          });

          setEstabelecimentoAdicional({
            telefone_restaurante: data.telefone_restaurante,
            especialidade: data.especialidade,
            descricao_restaurante: data.descricao_restaurante,
            meios_pagamento: data.meios_pagamento,
            tipos_servico: data.tipos_servico,
          });
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstabelecimento();
  }, [dadosCompletos, router]);


  // Atualizar estabelecimento
  const handleUpdateEstabelecimentoInicial = async (formData: {
    nome_restaurante: string;
    nome_responsavel: string;
    cpf_responsavel: string;
    cnpj: string;
    telefone_responsavel: string;
    email_responsavel: string;
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
        setEstabelecimentoInicial({
          nome_restaurante: data.user.nome_restaurante,
          nome_responsavel: data.user.nome_responsavel,
          cpf_responsavel: data.user.cpf_responsavel,
          cnpj: data.user.cnpj,
          telefone_responsavel: data.user.telefone_responsavel,
          email_responsavel: data.user.email_responsavel,
        });
        alert("Dados do estabelecimento atualizados com sucesso!");
        setIsModalEditInicialOpen(false);
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

  const handleAlterarStatus = async () => {
  if (status === null) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5500/api/alterarStatus", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus(data.status);
    } else {
      alert(data.message || "Erro ao alterar status");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao alterar status");
  }
  };

  const handleUpdateEstabelecimentoEndereco = async (formData: {
    endereco_cep: string;
    endereco_estado: string;
    endereco_cidade: string;
    endereco_bairro: string;
    endereco_rua: string;
    endereco_num: string;
  }) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5500/api/editarEstabelecimentoEndereco", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setEstabelecimentoEndereco({
          endereco_cep: data.user.endereco_cep,
          endereco_estado: data.user.endereco_estado,
          endereco_cidade: data.user.endereco_cidade,
          endereco_bairro: data.user.endereco_bairro,
          endereco_rua: data.user.endereco_rua,
          endereco_num: data.user.endereco_num,
        });

        alert("Endereço atualizado com sucesso!");
        setIsModalEditEnderecoOpen(false);

      } else {
        alert(data.message || "Erro ao atualizar o endereço do estabelecimento");
      }

    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o endereço.");
    }
  };

  const handleUpdateEstabelecimentoAdicional = async (formData: {
    telefone_restaurante: string;
    especialidade: string;
    descricao_restaurante: string;
    meios_pagamento: string[];
    tipos_servico: string[];
  }) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "http://localhost:5500/api/editarEstabelecimentoAdicional",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setEstabelecimentoAdicional({
          telefone_restaurante: data.user.telefone_restaurante,
          especialidade: data.user.especialidade,
          descricao_restaurante: data.user.descricao_restaurante,
          meios_pagamento: data.user.meios_pagamento,
          tipos_servico: data.user.tipos_servico,
        });

        alert("Informações adicionais atualizadas com sucesso!");
        setIsModalEditAdicionalOpen(false);
      } else {
        alert(data.message || "Erro ao atualizar informações adicionais");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar informações adicionais.");
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
              {estabelecimentoInicial?.nome_restaurante || "Carregando..."}
            </h3>

            {/* Status */}
            <p className="text-sm flex items-center justify-center gap-1 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${status === 1 ? "bg-green-500": status === 2 ? "bg-red-500" : "bg-gray-400"}`}>
              </span>
              <span
                className={status === 1 ? "text-green-500" : status === 2 ? "text-red-500" : "text-gray-600"}>
                {status === 1 ? "Ativo" : status === 2 ? "Inativo" : "Carregando..."}
              </span>
            </p>

            {/* Informações detalhadas */}
            <div className="mt-4">

              {dadosCompletos ? (
                <>
                  {/* Abas */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setActiveInfoTab("iniciais")}
                      className={`px-2 py-1 text-sm font-medium transition-colors ${
                        activeInfoTab === "iniciais"
                          ? "text-purple-600 border-b-2 border-purple-500"
                          : "text-gray-700 hover:text-purple-500"
                      }`}
                    >
                      <User className="w-4 h-4 inline mr-1 text-purple-500" />
                      Dados do Responsável
                    </button>

                    <button
                      onClick={() => setActiveInfoTab("endereco")}
                      className={`px-2 py-1 text-sm font-medium transition-colors ${
                        activeInfoTab === "endereco"
                          ? "text-purple-600 border-b-2 border-purple-500"
                          : "text-gray-700 hover:text-purple-500"
                      }`}
                    >
                      <MapPin className="w-4 h-4 inline mr-1 text-purple-500" />
                      Endereço
                    </button>

                    <button
                      onClick={() => setActiveInfoTab("extras")}
                      className={`px-2 py-1 text-sm font-medium transition-colors ${
                        activeInfoTab === "extras"
                          ? "text-purple-600 border-b-2 border-purple-500"
                          : "text-gray-700 hover:text-purple-500"
                      }`}
                    >
                      <Settings className="w-4 h-4 inline mr-1 text-purple-500" />
                      Informações Adicionais
                    </button>
                  </div>

                  {/* Conteúdo das Abas */}
                  <div className="space-y-3 text-left text-gray-700 text-sm min-h-[300px]">
                    {/* INICIAIS */}
                    {activeInfoTab === "iniciais" && (
                      <>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Responsável:</span>
                          <span>{estabelecimentoInicial?.nome_responsavel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IdCard className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">CPF:</span>
                          <span>{estabelecimentoInicial?.cpf_responsavel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">CNPJ:</span>
                          <span>{estabelecimentoInicial?.cnpj}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Email:</span>
                          <span>{estabelecimentoInicial?.email_responsavel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Telefone:</span>
                          <span>{estabelecimentoInicial?.telefone_responsavel}</span>
                        </div>

                        {/* Botão de edição da aba inicial */}
                        <button
                          className="mt-3 text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800"
                          onClick={() => setIsModalEditInicialOpen(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar Dados do Responsável
                        </button>
                      </>
                    )}

                    {/* ENDEREÇO */}
                    {activeInfoTab === "endereco" && (
                      <>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">CEP:</span>
                          <span>{estabelecimentoEndereco?.endereco_cep}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Estado:</span>
                          <span>{estabelecimentoEndereco?.endereco_estado}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Cidade:</span>
                          <span>{estabelecimentoEndereco?.endereco_cidade}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Bairro:</span>
                          <span>{estabelecimentoEndereco?.endereco_bairro}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Rua:</span>
                          <span>{estabelecimentoEndereco?.endereco_rua}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Número:</span>
                          <span>{estabelecimentoEndereco?.endereco_num}</span>
                        </div>

                        {/* Botão de edição da aba endereço */}
                        <button
                          className="mt-3 text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800"
                          onClick={() => setIsModalEditEnderecoOpen(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar Endereço
                        </button>
                      </>
                    )}

                    {/* INFORMAÇÕES EXTRAS */}
                    {activeInfoTab === "extras" && (
                      <>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Telefone do restaurante:</span>
                          <span>{estabelecimentoAdicional?.telefone_restaurante}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Especialidade:</span>
                          <span>{estabelecimentoAdicional?.especialidade}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">Descrição:</span>
                          <span>{estabelecimentoAdicional?.descricao_restaurante}</span>
                        </div>

                        <div className="mt-2">
                          <h3 className="font-semibold text-gray-800">Meios de Pagamento</h3>
                          <ul className="list-disc ml-5 text-gray-700 text-sm">
                            {estabelecimentoAdicional?.meios_pagamento?.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4">
                          <h3 className="font-semibold text-gray-800">Tipos de Serviço</h3>
                          <ul className="list-disc ml-5 text-gray-700 text-sm">
                            {estabelecimentoAdicional?.tipos_servico?.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Botão de edição da aba extras */}
                        <button
                          className="mt-3 text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800"
                          onClick={() => setIsModalEditAdicionalOpen(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar Informações Adicionais
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                // Se não tem dados completos, mostra apenas os iniciais com botão
                <div className="space-y-3 text-left text-gray-700 text-sm min-h-[300px]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Responsável:</span>
                    <span>{estabelecimentoInicial?.nome_responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IdCard className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">CPF:</span>
                    <span>{estabelecimentoInicial?.cpf_responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">CNPJ:</span>
                    <span>{estabelecimentoInicial?.cnpj}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Email:</span>
                    <span>{estabelecimentoInicial?.email_responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Telefone:</span>
                    <span>{estabelecimentoInicial?.telefone_responsavel}</span>
                  </div>

                  {/* Botão de edição da aba inicial mesmo sem dados completos */}
                  <button
                    className="mt-3 text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800"
                    onClick={() => setIsModalEditInicialOpen(true)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar Dados do Responsável
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* Botões com animação */}
          <div className="flex flex-col items-center space-y-3">

            {status !== null && (
              <button
                type="button"
                className={`w-4/5 max-w-[220px] border-2 font-medium rounded-lg py-2 flex items-center justify-center gap-2
                  transition transform duration-200 ease-out
                  hover:scale-105 hover:shadow-md active:scale-95
                  ${status === 1 ? "border-red-500 text-red-600 hover:bg-red-50" : "border-green-500 text-green-600 hover:bg-green-50"}`}
                onClick={handleAlterarStatus}
              >
                {status === 1 ? "Desativar" : "Ativar"}
              </button>
            )}

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
                <Areas />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <ModalEditarEstabelecimentoInicial
        isOpen={isModalEditInicialOpen}
        onClose={() => setIsModalEditInicialOpen(false)}
        estabelecimento={estabelecimentoInicial}
        onSave={handleUpdateEstabelecimentoInicial}
      />  

      <ModalEditarEstabelecimentoEndereco
        isOpen={isModalEditEnderecoOpen}
        onClose={() => setIsModalEditEnderecoOpen(false)}
        endereco={estabelecimentoEndereco}
        onSave={handleUpdateEstabelecimentoEndereco}
      />

      <ModalEditarEstabelecimentoInfosAdicionais
        isOpen={isModalEditAdicionalOpen}
        onClose={() => setIsModalEditAdicionalOpen(false)}
        dados={estabelecimentoAdicional}
        onSave={handleUpdateEstabelecimentoAdicional}
      />

      <ModalApagarConta
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleDeleteEstabelecimento}
      />
    </div>
  );
}

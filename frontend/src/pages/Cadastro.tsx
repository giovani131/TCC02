import Link from "next/link";
import { useState } from "react";

export default function Cadastro() {
  
  //DADOS
  const [userType, setUserType] = useState<"cliente" | "restaurante">("cliente");
  const comidas = ["Italiana", "Japonesa", "Brasileira", "Mexicana", "Chinesa", "Outros"];
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  // INTEGRAÇAO
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleChangeCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmitCliente = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5500/api/cadastrarUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cliente, tipo: "cliente" }), // manda os dados
      });

      const data = await res.json();

      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
        console.log(data);
      } else {
        alert(data.message || "Erro ao cadastrar");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com servidor");
    }
  };
  
  // FRONT
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50 p-4">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-purple-500 text-white p-4 rounded-full">👤</div>
        <h1 className="text-2xl font-bold mt-4">Criar Conta</h1>
        <p className="text-gray-600">Cadastre-se para começar a usar o sistema</p>
      </div>

      {/* Formulário */}
      <div
        className="bg-white shadow-lg rounded-xl p-8 transition-all duration-500 ease-in-out"
        style={{
          width: userType === "cliente" ? "24rem" : "43rem",
        }}
      >
        {/* Botões de alternância */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => setUserType("cliente")}
            className={`flex-1 p-2 transition-colors duration-300 ${
              userType === "cliente" ? "bg-purple-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setUserType("restaurante")}
            className={`flex-1 p-2 transition-colors duration-300 ${
              userType === "restaurante" ? "bg-purple-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            Restaurante
          </button>
        </div>

        {/* Conteúdo do formulário */}
       <div className="transition-all duration-500">
          {userType === "cliente" ? (
            <form onSubmit={handleSubmitCliente} className="flex flex-col gap-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                className="w-full p-3 border rounded-lg"
                value={cliente.nome}
                onChange={handleChangeCliente}
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                className="w-full p-3 border rounded-lg"
                value={cliente.telefone}
                onChange={handleChangeCliente}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                value={cliente.email}
                onChange={handleChangeCliente}
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                className="w-full p-3 border rounded-lg"
                value={cliente.senha}
                onChange={handleChangeCliente}
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-3 rounded-lg mt-2"
              >
                Criar Conta
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Nome do Restaurante */}
              <input
                type="text"
                placeholder="Nome do Restaurante"
                className="w-full p-3 border rounded-lg"
              />

              {/* CPF, Telefone e Email do responsável */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CPF ou CNPJ do Responsável"
                  className="flex-1 p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Telefone do Responsável"
                  className="flex-1 p-3 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email do Responsável"
                  className="flex-1 p-3 border rounded-lg"
                />
              </div>

              {/* Endereço */}
              <div>
                <p className="text-gray-700 font-medium mb-1">Endereço</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Rua"
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Bairro"
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Número"
                    className="flex-1 p-3 border rounded-lg"
                  />
                </div>
              </div>

              {/* Tipo de comida */}
              <select className="w-full p-3 border rounded-lg">
                <option>Tipo de comida</option>
                {comidas.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {/* Horário */}
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col">
                  <p className="text-gray-700 font-medium mb-1">Horário de Abertura</p>
                  <input type="time" className="flex-1 p-3 border rounded-lg" />
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-gray-700 font-medium mb-1">Horário de Fechamento</p>
                  <input type="time" className="flex-1 p-3 border rounded-lg" />
                </div>
              </div>

              {/* Dias da semana */}
              <div>
                <p className="text-gray-700 font-medium mb-2">Dias da Semana Abertos</p>
                <div className="grid grid-cols-4 gap-2">
                  {diasSemana.map((dia) => (
                    <label key={dia} className="flex items-center gap-1">
                      <input type="checkbox" />
                      {dia}
                    </label>
                  ))}
                </div>
              </div>

              {/* Botão */}
              <button className="w-full bg-purple-500 text-white p-3 rounded-lg mt-2">
                Criar Conta
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <Link href="/" className="text-purple-600">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

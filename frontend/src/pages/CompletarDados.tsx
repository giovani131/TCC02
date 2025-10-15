import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";


type DadosRestaurante = {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  logo: File | null;
  especialidade: string;
  descricao_restaurante: string;
  formas_pagamento: string[];
  telefone_restaurante: string;
  tipo_servico: string[];
};

export default function CompletarCadastroRestaurante() {
  
  const router = useRouter();
  const [section, setSection] = useState<"endereco" | "dados">("endereco");
  const [dados, setDados] = useState<{
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  logo: File | null;
  especialidade: string;
  descricao_restaurante: string;
  formas_pagamento: string[];
  telefone_restaurante: string;
  tipo_servico: string[];
}>({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    logo: null,
    especialidade: "",
    descricao_restaurante: "",
    formas_pagamento: [],
    telefone_restaurante: "",
    tipo_servico: [],
  });

const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (e.target instanceof HTMLInputElement) {
    if (e.target.type === "checkbox") {
      const arrayAtual = dados[name as keyof DadosRestaurante] as string[];
      if (e.target.checked) {
        setDados({ ...dados, [name]: [...arrayAtual, value] });
      } else {
        setDados({
          ...dados,
          [name]: arrayAtual.filter((item) => item !== value),
        });
      }
      return;
    }

    if (e.target.type === "file") {
      setDados({
        ...dados,
        [name]: e.target.files ? e.target.files[0] : null,
      } as any);
      return;
    }
  }

  setDados({
    ...dados,
    [name]: value,
  } as any);
};


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    let logoBase64: string | null = null;

    if (dados.logo) {
      const fileToBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      logoBase64 = await fileToBase64(dados.logo);
    }

    const body = {
      endereco_cep: dados.cep,
      endereco_estado: dados.estado,
      endereco_cidade: dados.cidade,
      endereco_bairro: dados.bairro,
      endereco_rua: dados.rua,
      endereco_num: dados.numero,
      logo: logoBase64,
      telefone_restaurante: dados.telefone_restaurante,
      especialidade: dados.especialidade,
      descricao_restaurante: dados.descricao_restaurante,
      meios_pagamento: dados.formas_pagamento,
      tipos_servico: dados.tipo_servico,
    };

    console.log(body)

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5500/api/completarDados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Dados Completos!")
      router.push("/HomeEstabelecimento")
      console.log("Dados enviados:", result.user);
    } else {
      alert(result.message || "Erro ao completar cadastro");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar os dados");
  }
};


  return (
    <div className="bg-purple-50 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Completar Cadastro</h1>
        <p className="text-gray-600">
          Adicione as informações restantes do seu restaurante
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 w-[40rem] transition-all duration-500">
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button
            type="button"
            onClick={() => setSection("endereco")}
            className={`flex-1 p-2 font-medium transition-colors duration-300 ${
              section === "endereco"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Endereço
          </button>
          <button
            type="button"
            onClick={() => setSection("dados")}
            className={`flex-1 p-2 font-medium transition-colors duration-300 ${
              section === "dados"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Dados Adicionais
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {section === "endereco" ? (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  className="w-1/3 p-3 border rounded-lg"
                  value={dados.cep}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="estado"
                  placeholder="Estado (Ex: SP)  "
                  className="w-1/3 p-3 border rounded-lg"
                  value={dados.estado}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  className="w-1/3 p-3 border rounded-lg"
                  value={dados.cidade}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                name="bairro"
                placeholder="Bairro"
                className="w-full p-3 border rounded-lg"
                value={dados.bairro}
                onChange={handleChange}
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  name="rua"
                  placeholder="Rua"
                  className="flex-1 p-3 border rounded-lg"
                  value={dados.rua}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="numero"
                  placeholder="Número"
                  className="w-1/4 p-3 border rounded-lg"
                  value={dados.numero}
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                onClick={() => setSection("dados")}
                className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 transform transition-all duration-300 hover:scale-105 hover:bg-purple-600"
              >
                Próximo: Dados Adicionais
              </button>
            </>
          ) : (
            <>
              <label className="text-sm font-medium text-gray-700">
                Logo do Restaurante:
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />

              <input
                type="text"
                name="telefone_restaurante"
                placeholder="Telefone do Restaurante"
                className="flex-1 p-3 border rounded-lg"
                value={dados.telefone_restaurante}
                onChange={handleChange}
              />

              <select
                name="especialidade"
                value={dados.especialidade}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Selecione a especialidade</option>
                <option value="Comida italiana">Comida Italiana</option>
                <option value="Lanches">Lanches</option>
                <option value="Pizza">Pizza</option>
                <option value="Comida japonesa">Comida Japonesa</option>
                <option value="Comida brasileira">Comida Brasileira</option>
                <option value="Doces e sobremesas">Doces e Sobremesas</option>
              </select>

              <textarea
                name="descricao_restaurante"
                placeholder="Descrição do restaurante"
                className="w-full p-3 border rounded-lg h-24"
                value={dados.descricao_restaurante}
                onChange={handleChange}
              />

              <div>
                <p className="font-medium text-gray-700 mb-1">
                  Formas de Pagamento:
                </p>
                {["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"].map(
                  (pagamento) => (
                    <label key={pagamento} className="mr-4">
                      <input
                        type="checkbox"
                        name="formas_pagamento"
                        value={pagamento}
                        checked={dados.formas_pagamento.includes(pagamento)}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      {pagamento}
                    </label>
                  )
                )}
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Tipo de Serviço:</p>
                {["Delivery", "Self Service", "À la carte", "Rodízio"].map((tipo) => (
                  <label key={tipo} className="mr-4">
                    <input
                      type="checkbox"
                      name="tipo_servico"
                      value={tipo}
                      checked={dados.tipo_servico.includes(tipo)}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    {tipo}
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSection("endereco")}
                  className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-300"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 text-white p-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-purple-600"
                >
                  Finalizar Cadastro
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

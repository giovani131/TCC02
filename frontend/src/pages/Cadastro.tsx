import Link from "next/link";

export default function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-purple-500 text-white p-4 rounded-full">👤</div>
        <h1 className="text-2xl font-bold mt-4">Criar Conta</h1>
        <p className="text-gray-600">Cadastre-se para começar a usar o sistema</p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-xl font-bold mb-2">Cadastro</h2>
        <p className="text-sm text-gray-500 mb-6">
          Preencha os dados abaixo para criar sua conta
        </p>

        <input type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-lg mb-4" />
        <input type="text" placeholder="Telefone" className="w-full p-3 border rounded-lg mb-4" />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4" />
        <input type="password" placeholder="Senha" className="w-full p-3 border rounded-lg mb-4" />

        <p className="text-xs text-gray-500 mb-4">
          Sua senha deve conter: <br />
          - Pelo menos 8 caracteres <br />
          - Uma letra maiúscula e uma minúscula <br />
          - Pelo menos um número
        </p>

        <button className="w-full bg-purple-500 text-white p-3 rounded-lg">Criar Conta</button>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <Link href="/" className="text-purple-600">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}

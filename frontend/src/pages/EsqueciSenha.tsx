import Link from "next/link";

export default function EsqueciSenha() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-purple-500 text-white p-4 rounded-full">📧</div>
        <h1 className="text-2xl font-bold mt-4">Esqueci minha senha</h1>
        <p className="text-gray-600">
          Digite seu email para receber um link de redefinição
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enviaremos um link para seu email para redefinir sua senha
        </p>

        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4" />

        <button className="w-full bg-purple-500 text-white p-3 rounded-lg">
          Enviar Link de Redefinição
        </button>

        <Link href="/" className="block text-center text-sm text-purple-600 mt-4">
          Voltar ao Login
        </Link>
      </div>
    </div>
  );
}

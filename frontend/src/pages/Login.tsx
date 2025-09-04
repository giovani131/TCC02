import  Link  from "next/link";
import { FC } from "react";

const Login: FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-purple-500 text-white p-4 rounded-full">
          🔒
        </div>
        <h1 className="text-2xl font-bold mt-4">Bem-vindo de volta</h1>
        <p className="text-gray-600">Entre na sua conta para continuar</p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-6">
          Digite suas credenciais para acessar sua conta
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <Link href="/EsqueciSenha" className="text-sm text-purple-600">
          Esqueci minha senha
        </Link>

        <button className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4">
          Entrar
        </button>

        <p className="text-center text-sm mt-4">
          Não tem uma conta?{" "}
          <Link href="/Cadastro" className="text-purple-600">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

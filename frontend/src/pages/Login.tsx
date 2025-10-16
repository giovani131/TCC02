import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import IconLogin from "../components/IconLogin";
import { div } from "framer-motion/client";

const Login: FC = () => {
  const [userType, setUserType] = useState<"cliente" | "restaurante">("cliente");
  
  //INTEGRACAO
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Define a rota de login conforme o tipo de usuário
    const endpoint =
      userType === "cliente"
        ? "http://localhost:5500/api/loginUsuario"
        : "http://localhost:5500/api/loginEstabelecimento";

    // Define a rota de redirecionamento
    const redirectRoute = userType === "cliente" ? "/Home" : "/HomeEstabelecimento";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token no navegador
        localStorage.setItem("token", data.token);

        // Redireciona para a home correta
        router.push(redirectRoute);
      } else {
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro de conexão com o servidor");
    }
  };


  //FRONT
  return (
    <div className="bg-purple-50">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-6">
          <IconLogin/>
          <h1 className="text-2xl font-bold mt-4">Bem-vindo de volta</h1>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-96"
        >
          <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
            <button
              type="button"
              onClick={() => setUserType("cliente")}
              className={`flex-1 p-2 transition-colors duration-300 ${
                userType === "cliente"
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setUserType("restaurante")}
              className={`flex-1 p-2 transition-colors duration-300 ${
                userType === "restaurante"
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Restaurante
            </button>
          </div>

          <h2 className="text-xl font-bold mb-2">
            Login {userType === "cliente" ? "Cliente" : "Restaurante"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Digite suas credenciais para acessar sua conta
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <Link
            href="/EsqueciSenha"
            className="text-sm text-purple-600 relative transition-all duration-300 
                      hover:text-purple-800 hover:underline hover:underline-offset-4"
          >
            Esqueci minha senha
          </Link>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 
                      transition-all duration-300 ease-out 
                      hover:bg-purple-600 hover:shadow-lg hover:scale-105 
                      active:scale-95"
          >
            Entrar
          </button>


          <p className="text-center text-sm mt-4">
            Não tem uma conta?{" "}
          <Link
            href="/Cadastro"
            className="text-purple-600 relative 
                      before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] 
                      before:bg-purple-600 before:transition-all before:duration-300
                      hover:before:w-full"
          >
            Cadastre-se aqui
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

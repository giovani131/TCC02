import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function HomeEstabelecimento(){
    const router = useRouter();
    const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/");
            return;
        }
    
    const fetchUsuario = async () => {
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

    fetchUsuario();
    }, [router]);


    return(
        <div>
            <p>{estabelecimento?.nome_restaurante}</p>
            <p>{estabelecimento?.cpf_cnpj_responsavel}</p>
            <p>{estabelecimento?.telefone_responsavel}</p>
            <p>{estabelecimento?.email_responsavel}</p>
            <p>{estabelecimento?.endereco_rua}</p>
            <p>{estabelecimento?.endereco_bairro}</p>
            <p>{estabelecimento?.endereco_rua}</p>
        </div>
    )
}
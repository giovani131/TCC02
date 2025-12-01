import { IResponseApi } from "@/models/IResponseApi"
import { IMesaDTO, IMesaRequest } from "@/models/Mesa"

export async function createChair(data: IMesaRequest): Promise<IResponseApi>{
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5500/api/mesa/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    const body = await res.json().catch(() => ({}))
    if(!res.ok){
        return {
            ok: false,
            status: res.status,
            message: body?.message ?? `Erro ${res.status}` 
        }
    }
    return{
        ok: true,
        status: res.status,
        message: body?.message ?? "Operacão realizada com sucesso."
    }
}

export async function listar(id: string, tipo: number) : Promise<IMesaDTO[]>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/mesa/listar/${id}/${tipo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}
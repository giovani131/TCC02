import { IAreaDTO, IAreaRequest } from "@/models/Areas";
import { IResponseApi } from "@/models/IResponseApi";

export async function createArea(data: IAreaRequest): Promise<IResponseApi>{
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5500/api/area/cadastrar", {
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

export async function getAreaById(id: string) : Promise<IAreaDTO>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/area/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

export async function updateArea(data: IAreaRequest) : Promise<IResponseApi>{
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:5500/api/area/atualizar", {
        method: "PATCH",
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
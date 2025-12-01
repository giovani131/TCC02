import { ReservaPendentes } from "@/components/ReservasPendentes";
import { IResponseApi } from "@/models/IResponseApi";
import { IPaymentResponse, IReservePayload } from "@/models/Payment";
import { IReservaMesaRequest } from "@/models/Reserve";

export async function createProcess(data: IReservePayload) : Promise<IResponseApi>{
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5500/api/reserva/processo", {
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

export async function getProcess(id: string) : Promise<IPaymentResponse>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/reserva/processo/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

export async function listReservasPendents(status: number, tipo: number) : Promise<ReservaPendentes[]>{
   const token = localStorage.getItem("token")
   const res = await fetch(`http://localhost:5500/api/reserva/request/${status}/${tipo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

export async function reservaMesa(data: IReservaMesaRequest) : Promise<IResponseApi>{
    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:5500/api/reserva/reserva-mesa`, {
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
import { IDayDTO } from "@/models/Day"
import { IResponseApi } from "@/models/IResponseApi"

export async function listDays() : Promise<IDayDTO[]>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/day`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

import { IRestaurantsDTO } from "@/models/Restaurants"

export async function listRestaurants(tipo: string) : Promise<IRestaurantsDTO[]>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/home/listar/${tipo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

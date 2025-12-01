import { IRestaurantsDTO } from "@/models/Restaurants";

export async function searchEstablishmentByName(name: string) : Promise<IRestaurantsDTO[]>{
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5500/api/estabelecimento/procurar/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}
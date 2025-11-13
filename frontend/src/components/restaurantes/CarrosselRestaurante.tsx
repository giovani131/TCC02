import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IRestaurantsDTO } from "@/models/Restaurants";
import router from "next/router";

interface RestaurantCarouselProps{
    title: string
    itens: IRestaurantsDTO[]
}
export function RestaurantCarousel({title, itens} : RestaurantCarouselProps) {
    console.log(itens)
    return (
    <section className="w-full mt-10">
        <div className="flex flex-row justify-between p-1">
            <span className="flex flex-row gap-1 items-center font-bold text-lg">
                Restaurantes {title}
            </span>
            <button className="text-purple-500 font-bold cursor-pointer">Ver Mais</button>
        </div>
        <div className="grid grid-cols-4 mt-2 gap-4 flex-wrap">
        {itens.length > 0 ? (
            itens.map((item) => (
            <article
                key={item.id}
                onClick={() => router.push(`/RestauranteDetalhes/${item.id}`)}
                className="snap-start  cursor-pointer min-w-[220px] max-w-[220px] shrink-0 rounded-2xl overflow-hidden border border-black/60 bg-white/5 hover:bg-white/10 transition"
            >
                <div className="relative aspect-[4/3] w-full">
                <img
                    src={item.logo}
                    alt={item.nome_restaurante}
                    className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="p-3 bg-white">
                    <h3 className="font-semibold leading-tight text-black text-[20px] truncate">
                        {item.nome_restaurante}
                    </h3>
                </div>
            </article>
            ))
        ) : (
            <div className="w-full text-center text-black font-semibold italic py-10">
            Nenhum restaurante encontrado 🍽️
            </div>
        )}
        </div>
    </section>
  );
}

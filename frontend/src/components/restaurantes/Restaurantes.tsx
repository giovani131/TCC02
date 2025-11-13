import { Input } from "@/core/components/Input";
import { ChevronDown, House } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { RestaurantCarousel } from "./CarrosselRestaurante";
import { IRestaurantsDTO } from "@/models/Restaurants";
import { useEffect, useState } from "react";
import { listRestaurants } from "@/services/homeRestaurants.service.";

export function Restaurante() {
  const tiposComida = [
    { nome: "Italiana", bandeira: "IT" },
    { nome: "Japonesa", bandeira: "JP" },
    { nome: "Brasileira", bandeira: "BR" },
    { nome: "Mexicana", bandeira: "MX" },
    { nome: "Árabe", bandeira: "SA" },
    { nome: "Chinesa", bandeira: "CN"}
  ];
const [listaRestaurantesJaponeses, setListaRestauranteJaponeses] = useState<IRestaurantsDTO[]>([]);
const [listaRestaurantesChineses, setListaRestaurantesChineses] = useState<IRestaurantsDTO[]>([]);
const [listaRestaurantesBrasileiros, setListaRestaurantesBrasileiros] = useState<IRestaurantsDTO[]>([]);
const [listaRestaurantesMexicanos, setListaRestaurantesMexicanos] = useState<IRestaurantsDTO[]>([]);
const [listaRestaurantesArabes, setListaRestaurantesArabes] = useState<IRestaurantsDTO[]>([]);
const [listaRestaurantesItaliano, setlistaRestaurantesItaliano] = useState<IRestaurantsDTO[]>([]);

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  let alive = true; // evita setState após unmount
  setIsLoading(true);
  setError(null);

  (async () => {
    try {
      const [
        japoneses,
        chineses,
        brasileiros,
        mexicanos,
        arabes,
        italiano
      ] = await Promise.all([
        listRestaurants("Comida japonesa"),
        listRestaurants("Comida chinesa"),
        listRestaurants("Comida brasileira"),
        listRestaurants("Comida mexicana"),
        listRestaurants("Comida arabe"),
        listRestaurants("Comida italiana")
      ]);

      if (!alive) return;

      setListaRestauranteJaponeses(japoneses ?? []);
      setListaRestaurantesChineses(chineses ?? []);
      setListaRestaurantesBrasileiros(brasileiros ?? []);
      setListaRestaurantesMexicanos(mexicanos ?? []);
      setListaRestaurantesArabes(arabes ?? []);
      setlistaRestaurantesItaliano(italiano ?? []) 
    } catch (e: any) {
      if (!alive) return;
      console.error(e);
      setError(e?.message ?? "Falha ao carregar restaurantes.");
    } finally {
      if (alive) setIsLoading(false);
    }
  })();

  return () => {
    alive = false;
  };
}, []);


  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-center">
          <span className="flex flex-row gap-1 items-center font-semibold cursor-pointer">
            R. Valentina penteado de freitas 86 <ChevronDown size={16} />
          </span>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="flex flex-row gap-1 items-center font-bold text-lg">
            Veja lista de Restaurantes
          </span>
          <div className="w-1/3">
            <Input label="" placeholder="Pesquisar por nome..." />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center mt-6">
        <div className="grid grid-cols-3 gap-2 justify-between w-[100%]">
          {tiposComida.map((item, index) => (
            <div
              key={index}
              className="bg-purple-500/50 hover:bg-purple-500/90 transition rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm border border-white/10"
            >
              <ReactCountryFlag
                countryCode={item.bandeira}
                svg
                style={{ width: "2em", height: "2em" }}
                title={item.nome}
              />
              <span className="mt-2 font-medium text-white">{item.nome}</span>
            </div>
          ))}
        </div>
      </section>
      <RestaurantCarousel title={"Japones"} itens={listaRestaurantesJaponeses} />
      <RestaurantCarousel title={"Brasileiro"} itens={listaRestaurantesBrasileiros} />
      <RestaurantCarousel title={"Italiano"} itens={listaRestaurantesItaliano} />
      <RestaurantCarousel title={"Mexicana"} itens={listaRestaurantesMexicanos} />
      <RestaurantCarousel title={"Árabe"} itens={listaRestaurantesArabes} />
      <RestaurantCarousel title={"Chinesa"} itens={listaRestaurantesChineses} />
    </>
  );
}
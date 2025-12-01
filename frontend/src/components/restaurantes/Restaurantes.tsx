import { Input } from "@/core/components/Input";
import { ChevronDown, House, Search } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { RestaurantCarousel } from "./CarrosselRestaurante";
import { IRestaurantsDTO } from "@/models/Restaurants";
import { useEffect, useState } from "react";
import { listRestaurants } from "@/services/homeRestaurants.service.";
import { searchEstablishmentByName } from "@/services/estabelecimentos.services";
import router from "next/router";

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
    let alive = true;
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

  const [name, setName] = useState("");
  const [rest, setRest] = useState<IRestaurantsDTO[]>([])
  useEffect(() => {

    if(name.trim() === ""){
      setRest([])
      return;
    }
    (async () => {
      const response = await searchEstablishmentByName(name)
      setRest(response);
    })();
  }, [name]);
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
          <div className="w-1/3 relative">
            <Input
              onChange={setName}
              value={name}
              label=""
              placeholder="Pesquisar por nome..."
            />

            {/* Resultados da busca */}
            <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              {rest.map((item) => (
                <button
                  key={item.id_estabelecimento}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => router.push(`/RestauranteDetalhes/${item.id_estabelecimento}`)}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt={item.nome_restaurante}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.nome_restaurante}
                    </span>
                  </div>
                </button>
              ))}
            </div>
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
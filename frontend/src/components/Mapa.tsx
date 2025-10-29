import React, { useEffect, useState } from "react";
import {APIProvider,Map,Marker,InfoWindow} from "@vis.gl/react-google-maps";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

type Restaurante = {
  id_estabelecimento: number;
  nome_restaurante: string;
  logo: string;
  telefone_restaurante: string;
  especialidade: string;
  descricao_restaurante: string;
  lat: number;
  lng: number;
};

const Mapa = () => {
  
  const router = useRouter()
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [selecionado, setSelecionado] = useState<Restaurante | null>(null);

  const mapStyle = [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "off" }] },
  ];

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/locRestaurantes");
        const data = await response.json();
        console.log(data)
        setRestaurantes(data);
      } catch (error) {
        console.error("Erro ao buscar localizações:", error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: -22.8431163, lng: -47.0623106 }}
        style={{ width: "100%", height: "100%" }}
        styles={mapStyle}
      >
        {restaurantes.map((r, i) => (
          <Marker
            key={i}
            position={{ lat: r.lat, lng: r.lng }}
            onClick={() => setSelecionado(r)}
          />
        ))}

        {selecionado && (
          <InfoWindow
            position={{ lat: selecionado.lat, lng: selecionado.lng }}
            onCloseClick={() => setSelecionado(null)}
          >
            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-[260px] border border-gray-200">
              <div className="relative">
                <img
                  src={selecionado.logo}
                  alt={selecionado.nome_restaurante}
                  className="w-full h-28 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="absolute bottom-2 left-3 text-white font-semibold text-base drop-shadow-md">
                  {selecionado.nome_restaurante}
                </h3>
              </div>

              <div className="p-3">
                <p className="text-xs text-gray-500 font-medium mb-2">
                  {selecionado.especialidade}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {selecionado.descricao_restaurante}
                </p>

                <p className="flex items-center gap-1 text-xs font-semibold text-gray-800 mb-4">
                  <Phone className="w-3.5 h-3.5 text-purple-600"/> 
                  {selecionado.telefone_restaurante}
                </p>

                <a
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 rounded-md transition-all cursor-pointer"
                  onClick={() => router.push(`/RestauranteDetalhes/${selecionado.id_estabelecimento}`)}
                >
                  Ver mais
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default Mapa;

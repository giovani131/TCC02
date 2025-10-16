import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

type Restaurante = {
  nome_restaurante: string;
  logo: string;
  telefone_restaurante: string;
  especialidade: string;
  descricao_restaurante: string;
  lat: number;
  lng: number;
};

const Mapa = () => {
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
            <div className="p-2 max-w-[220px]">
              <img
                src={selecionado.logo}
                alt={selecionado.nome_restaurante}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <h3 className="font-bold text-sm">{selecionado.nome_restaurante}</h3>
              <p className="text-xs text-gray-600">{selecionado.especialidade}</p>
              <p className="text-xs mt-2">{selecionado.descricao_restaurante}</p>
              <p className="text-xs font-medium mt-3 text-gray-700">
                📞 {selecionado.telefone_restaurante}
              </p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default Mapa;

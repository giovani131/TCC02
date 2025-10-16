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

type Poi = { key: string; location: google.maps.LatLngLiteral };

// Marcadores em sydney
const locations: Poi[] = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

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

const PoiMarkers = ({ pois }: { pois: Poi[] }) => (
  <>
    {pois.map((poi) => (
      <AdvancedMarker key={poi.key} position={poi.location}>
        <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
      </AdvancedMarker>
    ))}
  </>
);

export default Mapa;

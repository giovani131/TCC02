import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import React from "react";

const Mapa = () => {
  return (
    <APIProvider
      apiKey={"AIzaSyDkI6GdEVp23zFJDPN6BZYlNyj3ivPrrWI"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -22.8431163, lng: -47.0623106 }}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
        style={{ width: "100%", height: "500px" }}
      />
    </APIProvider>
  );
};

export default Mapa;

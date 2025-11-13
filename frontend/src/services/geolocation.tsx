"use client";
import { useEffect, useState } from "react";

export function useGeolocOneShot() {
  const [coords, setCoords] = useState<{lat:number; lng:number} | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, []);

  return { coords, error };
}

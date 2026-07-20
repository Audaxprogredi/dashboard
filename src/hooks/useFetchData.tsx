import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Diccionario con las coordenadas de las ciudades
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Quito': { latitude: -0.1807, longitude: -78.4678 },
  'Manta': { latitude: -0.9621, longitude: -80.7127 },
  'Cuenca': { latitude: -2.9001, longitude: -79.0059 },
};

export interface FetchDataResult extends OpenMeteoResponse {
  loading?: boolean;
}

export default function useFetchData(selectedOption: string | null): FetchDataResult | null {
  const [data, setData] = useState<FetchDataResult | null>(null);

  useEffect(() => {
    // 1. Establecer el estado de carga antes de la petición
    setData((prev) => (prev ? { ...prev, loading: true } : { loading: true } as FetchDataResult));

    // 2. Validar coordenadas de la ciudad
    const cityConfig = (selectedOption && CITY_COORDS[selectedOption]) 
      ? CITY_COORDS[selectedOption] 
      : CITY_COORDS['Guayaquil'];

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,wind_speed_10m`;

    // 3. Petición utilizando .then() y .catch() encadenados
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        return response.json() as Promise<OpenMeteoResponse>;
      })
      .then((jsonData) => {
        // Guardar los datos recibidos y apagar el estado de carga
        setData({ ...jsonData, loading: false });
      })
      .catch((error) => {
        // Capturar cualquier error de red o de parseo JSON
        console.error("Error al obtener los datos climáticos:", error);
        setData((prev) => (prev ? { ...prev, loading: false } : null));
      });

  }, [selectedOption]); // Se re-ejecuta cuando cambia selectedOption

  return data;
}
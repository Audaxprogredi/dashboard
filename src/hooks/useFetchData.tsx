import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface FetchDataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

// Diccionario con las coordenadas de las ciudades
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Quito': { latitude: -0.1807, longitude: -78.4678 },
  'Manta': { latitude: -0.9621, longitude: -80.7127 },
  'Cuenca': { latitude: -2.9001, longitude: -79.0059 },
};

export default function useFetchData(selectedOption: string | null): FetchDataState {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const cityConfig = selectedOption && CITY_COORDS[selectedOption]
      ? CITY_COORDS[selectedOption]
      : CITY_COORDS['Guayaquil'];

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,wind_speed_10m`;

    async function fetchWeatherData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const jsonData = (await response.json()) as OpenMeteoResponse;
        setData(jsonData);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          return;
        }

        const message = fetchError instanceof Error ? fetchError.message : String(fetchError);
        console.error('Error al obtener los datos climáticos:', message);
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();

    return () => {
      controller.abort();
    };
  }, [selectedOption]);

  return { data, loading, error };
}

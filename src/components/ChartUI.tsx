import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

interface ChartProps {
  hourly?: {
    time: string[];
    temperature_2m?: number[];
    apparent_temperature?: number[];
  };
  hourlyUnits?: {
    temperature_2m?: string;
  };
  loading?: boolean;
}

export default function ChartUI({ hourly, hourlyUnits, loading }: ChartProps) {
  if (loading) {
    return <Skeleton variant="rounded" width="100%" height={300} />;
  }

  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">No hay información disponible para el gráfico.</Typography>
      </Box>
    );
  }

  // Formatear tiempos para el eje X (ej: "00:00", "01:00")
  const formattedLabels = hourly.time.map((t) =>
    new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        Temperatura vs Temperatura Aparente ({hourlyUnits?.temperature_2m || '°C'})
      </Typography>

      <LineChart
        height={300}
        series={[
          {
            data: hourly.temperature_2m || [],
            label: `Temperatura (${hourlyUnits?.temperature_2m || '°C'})`,
            showMark: false,
          },
          {
            data: hourly.apparent_temperature || [],
            label: `Temp. Aparente (${hourlyUnits?.temperature_2m || '°C'})`,
            showMark: false,
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: formattedLabels,
          },
        ]}
      />
    </Box>
  );
}
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

  // 1. Identificar la fecha de hoy (o la del primer registro)
  const todayDateStr = new Date().toDateString();

  // 2. Obtener los índices de los elementos que corresponden únicamente al día de hoy
  let targetIndices = hourly.time
    .map((timeStr, index) => (new Date(timeStr).toDateString() === todayDateStr ? index : -1))
    .filter((index) => index !== -1);

  // Si por alguna razón no hay datos de "hoy", mostramos el primer día disponible para no romper la vista
  if (targetIndices.length === 0) {
    const firstDateStr = new Date(hourly.time[0]).toDateString();
    targetIndices = hourly.time
      .map((timeStr, index) => (new Date(timeStr).toDateString() === firstDateStr ? index : -1))
      .filter((index) => index !== -1);
  }

  // 3. Filtrar los arreglos usando solo los índices del día
  const filteredTime = targetIndices.map((i) => hourly.time[i]);
  const filteredTemp = targetIndices.map((i) => hourly.temperature_2m?.[i] ?? 0);
  const filteredApparent = targetIndices.map((i) => hourly.apparent_temperature?.[i] ?? 0);

  // 4. Formatear las etiquetas de tiempo (ej: "00:00", "01:00")
  const formattedLabels = filteredTime.map((t) =>
    new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        T° vs T° Aparente ; ({hourlyUnits?.temperature_2m || '°C'} - Día Actual)
      </Typography>

      <LineChart
        height={300}
        series={[
          {
            data: filteredTemp,
            label: `Temperatura (${hourlyUnits?.temperature_2m || '°C'})`,
            showMark: false,
          },
          {
            data: filteredApparent,
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
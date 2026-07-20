import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, type GridColDef, GridOverlay } from '@mui/x-data-grid';

interface TableProps {
  hourly?: {
    time: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    apparent_temperature?: number[];
  };
  hourlyUnits?: {
    temperature_2m?: string;
    relative_humidity_2m?: string;
  };
  loading?: boolean;
}

// Componente para mostrar un spinner centrado cuando la tabla está en estado de carga
function CustomLoadingOverlay() {
  return (
    <GridOverlay sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </GridOverlay>
  );
}

export default function TableUI({ hourly, hourlyUnits, loading }: TableProps) {
  // 1. Carga inicial: Si no hay datos y está cargando, mostramos el Skeleton completo
  if (loading && (!hourly || !hourly.time || hourly.time.length === 0)) {
    return (
      <Box sx={{ width: '100%', height: 400 }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          Pronóstico Horario
        </Typography>
        <Skeleton variant="rounded" width="100%" height={330} />
      </Box>
    );
  }

  // 2. Si terminó de cargar pero NO hay datos válidos
  if (!loading && (!hourly || !hourly.time || hourly.time.length === 0)) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', border: '1px dashed grey', borderRadius: 2 }}>
        <Typography color="error">No hay información disponible para la tabla.</Typography>
      </Box>
    );
  }

  // Mapeamos los datos de forma segura
  const rows = hourly?.time
    ? hourly.time.map((time, index) => ({
        id: index,
        time: new Date(time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        temperature: hourly.temperature_2m ? hourly.temperature_2m[index] : null,
        humidity: hourly.relative_humidity_2m ? hourly.relative_humidity_2m[index] : null,
        apparentTemp: hourly.apparent_temperature ? hourly.apparent_temperature[index] : null,
      }))
    : [];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'time', headerName: 'Fecha / Hora', width: 160 },
    {
      field: 'temperature',
      headerName: `Temperatura (${hourlyUnits?.temperature_2m || '°C'})`,
      width: 160,
      type: 'number',
    },
    {
      field: 'humidity',
      headerName: `Humedad (${hourlyUnits?.relative_humidity_2m || '%'})`,
      width: 150,
      type: 'number',
    },
    {
      field: 'apparentTemp',
      headerName: 'Temp. Aparente',
      width: 150,
      type: 'number',
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Pronóstico Horario
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{
          loadingOverlay: CustomLoadingOverlay, // 👈 Renderiza un círculo de carga en medio de la tabla
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
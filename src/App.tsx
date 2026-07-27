import { useState } from 'react';
import './App.css';
import HeaderUI from './components/HeaderUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { Grid } from '@mui/material';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {
   const [selectedOption, setSelectedOption] = useState<string | null>('Guayaquil');
   const { data, loading, error } = useFetchData(selectedOption);

   const getDescription = (value: number | undefined, unit: string | undefined) =>
      value !== undefined && unit ? `${value} ${unit}` : '';

   return (
      <Grid container spacing={4} sx={{ p: 2, justifyContent: 'left', alignItems: 'center' }}>

         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI />
         </Grid>

         <Grid size={{ xs: 12, md: 3 }}>
            <AlertUI
               description={error ?? 'No se prevén lluvias'}
               severity={error ? 'error' : 'success'}
            />
         </Grid>

         <Grid size={{ xs: 12, md: 9 }}>
            <SelectorUI onOptionSelect={setSelectedOption} />
         </Grid>

         <Grid size={{ xs: 12, md: 12 }}>
            <Grid container spacing={2}>
               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                     title='Temperatura (2m)'
                     loading={loading}
                     description={getDescription(data?.current?.temperature_2m, data?.current_units?.temperature_2m)}
                  />
               </Grid>

               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                     title='Temperatura aparente'
                     loading={loading}
                     description={getDescription(data?.current?.apparent_temperature, data?.current_units?.apparent_temperature)}
                  />
               </Grid>

               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                     title='Velocidad del viento'
                     loading={loading}
                     description={getDescription(data?.current?.wind_speed_10m, data?.current_units?.wind_speed_10m)}
                  />
               </Grid>

               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                     title='Humedad relativa'
                     loading={loading}
                     description={getDescription(data?.current?.relative_humidity_2m, data?.current_units?.relative_humidity_2m)}
                  />
               </Grid>
            </Grid>
         </Grid>

         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <ChartUI
               hourly={data?.hourly}
               hourlyUnits={data?.hourly_units}
               loading={loading}
            />
         </Grid>

         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <TableUI
               hourly={data?.hourly}
               hourlyUnits={data?.hourly_units}
               loading={loading}
            />
         </Grid>

         <Grid size={{ xs: 12, md: 12 }}>
            {/* Sección reservada para detalles adicionales */}
         </Grid>
      </Grid>
   );
}

export default App;

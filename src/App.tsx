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
   // Estado para almacenar la opción/ciudad seleccionada por el usuario
   const [selectedOption, setSelectedOption] = useState<string | null>('Guayaquil');

   // Comunicamos la opción seleccionada al custom hook
   const dataFetcherOutput = useFetchData(selectedOption);

   // Determinamos el estado de carga
   const isLoading = (dataFetcherOutput && 'loading' in dataFetcherOutput) 
     ? (dataFetcherOutput as { loading?: boolean }).loading ?? false 
     : !dataFetcherOutput?.current;

   return (
      <Grid container spacing={4} sx={{ p: 2, justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI />
         </Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 3 }}>
            <AlertUI description="No se prevén lluvias" />
         </Grid>

         {/* Selector de ciudad */}
         <Grid size={{ xs: 12, md: 9 }}>
            <SelectorUI onOptionSelect={setSelectedOption} />
         </Grid>

         {/* Indicadores Principales */}
         <Grid size={{ xs: 12, md: 12 }}>
            <Grid container spacing={2}>
               
               {/* 1. Temperatura (2m) */}
               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI
                     title='Temperatura (2m)'
                     loading={isLoading}
                     description={
                        dataFetcherOutput?.current && dataFetcherOutput?.current_units
                           ? `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`
                           : ""
                     } 
                  />
               </Grid>

               {/* 2. Temperatura Aparente */}
               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                     title='Temperatura aparente' 
                     loading={isLoading}
                     description={
                        dataFetcherOutput?.current && dataFetcherOutput?.current_units
                           ? `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`
                           : ""
                     } 
                  />
               </Grid>

               {/* 3. Velocidad del Viento */}
               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                     title='Velocidad del viento' 
                     loading={isLoading}
                     description={
                        dataFetcherOutput?.current && dataFetcherOutput?.current_units
                           ? `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`
                           : ""
                     } 
                  />
               </Grid>

               {/* 4. Humedad Relativa */}
               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                     title='Humedad relativa' 
                     loading={isLoading}
                     description={
                        dataFetcherOutput?.current && dataFetcherOutput?.current_units
                           ? `${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`
                           : ""
                     } 
                  />
               </Grid>

            </Grid>
         </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <ChartUI 
               hourly={dataFetcherOutput?.hourly} 
               hourlyUnits={dataFetcherOutput?.hourly_units}
               loading={isLoading}
            />
         </Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <TableUI 
               hourly={dataFetcherOutput?.hourly} 
               hourlyUnits={dataFetcherOutput?.hourly_units}
               loading={isLoading}
            />
         </Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>
            {/* Sección reservada para detalles adicionales */}
         </Grid>
      </Grid>
   );
}

export default App;
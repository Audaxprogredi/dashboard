import './App.css'
import HeaderUI from './components/HeaderUI';

import { Grid } from '@mui/material';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {

   return (
      <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado<HeaderUI/></Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 3 }}>Elemento: Alertas</Grid>  <Grid 
             container sx={{ justifyContent: "right", alignItems: "center" }}>

             <AlertUI description="No se preveen lluvias"/>

         </Grid>
         {/* Selector */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Selector</Grid>
                      <SelectorUI/>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         <Grid sx={{ display: { xs: "none", md: "block"}} }>Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block"}}}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
      </Grid>
   );
}

export default App;
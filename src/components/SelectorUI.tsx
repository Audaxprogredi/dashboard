import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface SelectorProps {
  onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
    const [cityInput, setCityInput] = useState('Guayaquil');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setCityInput(selectedValue);
        // Notificamos el cambio al componente padre (App.tsx)
        onOptionSelect(selectedValue);
    };

    return (
       <FormControl fullWidth>
          <InputLabel id="city-select-label">Ciudad</InputLabel>
          
          <Select
             labelId="city-select-label"
             id="city-simple-select" 
             value={cityInput}
             label="Ciudad"
             onChange={handleChange}
          >
             <MenuItem value="Guayaquil">Guayaquil</MenuItem>
             <MenuItem value="Quito">Quito</MenuItem>
             <MenuItem value="Manta">Manta</MenuItem>
             <MenuItem value="Cuenca">Cuenca</MenuItem>
          </Select>

          {cityInput && (
              <p style={{ marginTop: '8px' }}>
                 Clima en la ciudad de: <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
              </p>
          )}
       </FormControl>
    );
}
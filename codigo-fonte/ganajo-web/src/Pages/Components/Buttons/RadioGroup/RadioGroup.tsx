import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPlacement() {
  return (
    <FormControl>
      <FormLabel id="demo-form-control-label-placement">Tipos de Arroz</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel
          value="branco"
          control={<Radio />}
          label="Branco"
          labelPlacement="start"
        />
        <FormControlLabel
          value="bege"
          control={<Radio />}
          label="Bege"
          labelPlacement="start"
        />
        <FormControlLabel
          value="rosa"
          control={<Radio />}
          label="Rosa"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  );
}

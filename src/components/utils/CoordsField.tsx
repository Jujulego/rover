import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import {
  FormControl, InputLabel, TextField
} from '@material-ui/core';

import Coords from 'data/Coords';

import styles from './CoordsField.module.scss';

// Types
type Props = {
  label: String,
  value: Coords,
  disabled?: boolean,
  onChange?: (nval: Coords) => void
}

type Values = {
  x: string,
  y: string
}

// Component
const CoordsField: FC<Props> = (props) => {
  const {
    label, value,
    disabled = false,
    onChange
  } = props;

  // State
  const [values, setValues] = useState<Values>({ x: '', y: '' });

  // Functions
  function handleChange(name: keyof Values) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;

      if (val != null) {
        setValues(old => ({...old, [name]: val}));

        // Call onChange
        if (onChange != null) {
          values[name] = val;
          const x = parseInt(values.x);
          const y = parseInt(values.y);

          if (isNaN(x) || isNaN(y)) return;
          if (x === value.x && y === value.y) return;

          onChange({x, y});
        }
      }
    };
  }

  // Effects
  useEffect(() => {
    setValues({
      x: value.x.toString(),
      y: value.y.toString()
    });
  }, [value.x, value.y]);

  // Rendering
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <InputLabel shrink>{ label }</InputLabel>
      <div className={styles.fields}>
        <TextField classes={{ root: styles.field }} fullWidth disabled={disabled}
                   type="number" value={values.x} placeholder="x"
                   onChange={handleChange('x')}
        />
        <TextField classes={{ root: styles.field }} fullWidth disabled={disabled}
                   type="number" value={values.y} placeholder="y"
                   onChange={handleChange('y')}
        />
      </div>
    </FormControl>
  );
};

export default CoordsField;

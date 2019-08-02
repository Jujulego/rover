import React, { FC } from 'react';

import {
  Grid,
  FormControl, InputLabel,
  Slider, Typography
} from "@material-ui/core";

import styles from './SliderField.module.scss';

// Types
type Props = {
  label: string,
  value: number, min?: number, max?: number,
  format?: (value: number) => string,
  onChange: (value: number) => void
}

// Component
const SliderField: FC<Props> = (props) => {
  const {
    label,
    value, min, max,
    format,
    onChange
  } = props;

  // Rendering
  return (
    <FormControl component="fieldset">
      <InputLabel shrink>{ label }</InputLabel>
      <div className={styles.fields}>
        <Slider
          classes={{ root: styles.field }}
          value={value} min={min} max={max}
          onChange={(event, value) => onChange(typeof value === 'number' ? value : value[0])}
        />
      { format && (
          <Typography>{ format(value) }</Typography>
      ) }
    </div>
    </FormControl>
  )
};

export default SliderField;
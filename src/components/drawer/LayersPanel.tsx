import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  FormControl,
  FormControlLabel, InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText, MenuItem, Select,
  Switch
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Layers as LayersIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { ZoneState } from 'store/zone/types';
import { debugRover, toggleOption } from 'store/zone/actions';

import styles from 'components/drawer/Panel.module.scss';

// Types
type Props = {
  open: boolean,
  rovers: Array<string>,
  onOpen: () => void,
  onClose: () => void
}

// Component
const LayersPanel: FC<Props> = (props) => {
  const {
    open,
    rovers,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const { debug = "", options } = useSelector<AppState,ZoneState>(state => state.zone);

  // Function
  function handleClick() {
    if (open) {
      onClose();
    } else {
      onOpen()
    }
  }

  // Rendering
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><LayersIcon color="primary" /></ListItemIcon>
        <ListItemText primary="Layers" />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse
        classes={{ wrapperInner: styles.panel }}
        in={open} timeout="auto" unmountOnExit
      >
        <FormControlLabel
          control={<Switch checked={options.coords} onChange={() => dispatch(toggleOption('coords'))} />}
          label="Afficher les coordonnées"
        />
        <FormControlLabel
          control={<Switch checked={options.distance} onChange={() => dispatch(toggleOption('distance'))} />}
          label="Afficher les distances"
        />
        <FormControlLabel
          control={<Switch checked={options.height} onChange={() => dispatch(toggleOption('height'))} />}
          label="Afficher les hauteurs"
        />
        <FormControlLabel
          control={<Switch checked={options.slope} onChange={() => dispatch(toggleOption('slope'))} />}
          label="Afficher les pentes"
        />
        <FormControl component="fieldset">
          <InputLabel>Debug rover</InputLabel>
          <Select value={debug} onChange={(e) => dispatch(debugRover(e.target.value as string || undefined))}>
            <MenuItem value=""><em>Aucun</em></MenuItem>
            { rovers.map(r => (
              <MenuItem key={r} value={r}>{ r }</MenuItem>
            )) }
          </Select>
        </FormControl>
      </Collapse>
    </>
  );
};

export default LayersPanel;

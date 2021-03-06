import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse, FormControl, InputLabel,
  ListItem, ListItemIcon, ListItemText, MenuItem, Select
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Map as MapIcon
} from '@material-ui/icons';

import Coords from 'data/Coords';

import { AppState } from 'store';
import { moveZone, setZoom, stopTracking } from 'store/zone/actions';
import { loadLevel } from 'store/zone/thunks';
import { ZoneState } from 'store/zone/types';

import CoordsField from 'components/utils/CoordsField';
import SliderField from 'components/utils/SliderField';

import levels from 'assets/levels';
import styles from './Panel.module.scss';

// Types
type Props = {
  open: boolean,
  onOpen: () => void,
  onClose: () => void
}

// Component
const MapPanel: FC<Props> = (props) => {
  const {
    open,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const { level, center, zoom } = useSelector<AppState,ZoneState>(state => state.zone);

  // Function
  function handleClick() {
    if (open) {
      onClose();
    } else {
      onOpen()
    }
  }

  function handleMove(c: Coords) {
    dispatch(moveZone(c));
    dispatch(stopTracking());
  }

  // Rendering
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><MapIcon color="primary" /></ListItemIcon>
        <ListItemText primary="Carte" />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse
        classes={{ wrapperInner: styles.panel }}
        in={open} timeout="auto" unmountOnExit
      >
        <FormControl component="fieldset">
          <InputLabel>Niveau</InputLabel>
          <Select value={level ? level.name : ''} onChange={(e) => dispatch(loadLevel(levels[e.target.value as string]))}>
            { Object.keys(levels).map(n => (
              <MenuItem key={n} value={n}>{ n }</MenuItem>
            )) }
          </Select>
        </FormControl>
        <CoordsField label="Center" value={center} onChange={handleMove} />
        <SliderField label="Zoom"
          value={zoom * 20} min={10} max={20}
          format={value => `\u00D7${value / 20}`}
          onChange={(value) => dispatch(setZoom(value / 20))}
        />
      </Collapse>
    </>
  );
};

export default MapPanel;

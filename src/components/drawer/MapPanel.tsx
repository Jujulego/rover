import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  ListItem, ListItemIcon, ListItemText,
  FormControlLabel, Switch
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Map as MapIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { moveZone, toggleOption, setZoom } from 'store/zone/actions';
import { ZoneState } from 'store/zone/types';

import CoordsField from 'components/utils/CoordsField';
import SliderField from 'components/utils/SliderField';

import styles from 'components/drawer/MapPanel.module.scss';

// Types
type Props = {
  open: boolean,
  onOpen: () => void,
  onClose: () => void
}

// Component
const MapPanel: FC<Props> = (props) => {
  const { open, onOpen, onClose } = props;

  // Redux
  const dispatch = useDispatch();
  const { center, zoom, options } = useSelector<AppState,ZoneState>(state => state.zone);

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
        <ListItemIcon><MapIcon /></ListItemIcon>
        <ListItemText primary="Carte" />
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
          control={<Switch checked={options.height} onChange={() => dispatch(toggleOption('height'))} />}
          label="Afficher les hauteurs"
        />
        <CoordsField label="Center" value={center} onChange={(c) => dispatch(moveZone(c))} />
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

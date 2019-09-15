import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  FormControlLabel,
  ListItem, ListItemIcon, ListItemText,
  Switch
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Layers as LayersIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { ZoneState } from 'store/zone/types';
import { toggleOption } from 'store/zone/actions';

import styles from 'components/drawer/Panel.module.scss';

// Types
type Props = {
  open: boolean,
  onOpen: () => void,
  onClose: () => void
}

// Component
const LayersPanel: FC<Props> = (props) => {
  const {
    open,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const { options } = useSelector<AppState,ZoneState>(state => state.zone);

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
          control={<Switch checked={options.height} onChange={() => dispatch(toggleOption('height'))} />}
          label="Afficher les hauteurs"
        />
        <FormControlLabel
          control={<Switch checked={options.tracks} onChange={() => dispatch(toggleOption('tracks'))} />}
          label="Afficher les traces"
        />
      </Collapse>
    </>
  );
};

export default LayersPanel;

import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  ListItem, ListItemIcon, ListItemText,
  FormControlLabel, Switch
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { moveZone, toggleOption } from 'store/zone/actions';
import { ZoneState } from 'store/zone/types';

import CoordsField from 'components/utils/CoordsField';

import styles from './Settings.module.scss';

// Types
type Props = { onOpenDrawer ?: () => void }

// Component
const Settings: FC<Props> = (props) => {
  const { onOpenDrawer } = props;

  // State
  const [open, setOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { center, options } = useSelector<AppState,ZoneState>(state => state.zone);

  // Function
  function handleClick() {
    setOpen(!open);

    if (onOpenDrawer) onOpenDrawer();
  }

  // Rendering
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Paramètres" />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse classes={{ wrapperInner: styles.panel }}
                in={open} timeout="auto" unmountOnExit>
        <CoordsField label="center" value={center} onChange={(c) => dispatch(moveZone(c))} />
        <FormControlLabel
          control={<Switch checked={options.coords} onChange={() => dispatch(toggleOption('coords'))} />}
          label="Afficher les coordonnées"
        />
        <FormControlLabel
          control={<Switch checked={options.height} onChange={() => dispatch(toggleOption('height'))} />}
          label="Afficher les hauteurs"
        />
      </Collapse>
    </>
  );
};

export default Settings;

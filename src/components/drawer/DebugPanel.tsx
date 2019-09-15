import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  FormControl, InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText, MenuItem, Select
} from '@material-ui/core';
import {
  BugReport as BugReportIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { ZoneState } from 'store/zone/types';
import { debugRover } from 'store/zone/actions';

import styles from 'components/drawer/Panel.module.scss';

// Types
type Props = {
  open: boolean,
  rovers: Array<string>,
  onOpen: () => void,
  onClose: () => void
}

// Component
const DebugPanel: FC<Props> = (props) => {
  const {
    open,
    rovers,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const { debug = "" } = useSelector<AppState,ZoneState>(state => state.zone);

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
        <ListItemIcon><BugReportIcon color="primary" /></ListItemIcon>
        <ListItemText primary="Debug" />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse
        classes={{ wrapperInner: styles.panel }}
        in={open} timeout="auto" unmountOnExit
      >
        <FormControl component="fieldset">
          <InputLabel>Rover</InputLabel>
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

export default DebugPanel;

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse,
  ListItem, ListItemIcon, ListItemText,
  FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

import rovers, { RoverColor } from 'assets/rovers';

import { AppState } from 'store';
import { RoverState } from 'store/rovers/types';

import styles from './RoverPanel.module.scss';
import { setRoverColor } from "store/rovers/actions";

// Types
type Props = {
  open: boolean,
  name: string,
  onOpen: () => void,
  onClose: () => void
}

// Component
const RoverPanel: FC<Props> = (props) => {
  const {
    open, name,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const rover = useSelector<AppState,RoverState>(state => state.rovers[name]);

  // Function
  function handleClick() {
    if (open) {
      onClose();
    } else {
      onOpen()
    }
  }

  // Rendering
  return rover ? (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <img height={24} width={24} src={rovers[rover.color]} alt={`${rover.color} rover`} />
        </ListItemIcon>
        <ListItemText primary={`Rover ${name}`} />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse
        classes={{ wrapperInner: styles.panel }}
        in={open} timeout="auto" unmountOnExit
      >
        <FormControl component="fieldset">
          <InputLabel>Couleur</InputLabel>
          <Select value={rover.color} onChange={(e) => dispatch(setRoverColor(name, e.target.value as RoverColor))}>
            <MenuItem value="blue">Bleu</MenuItem>
            <MenuItem value="green">Vert</MenuItem>
            <MenuItem value="pink">Rose</MenuItem>
            <MenuItem value="white">Blanc</MenuItem>
            <MenuItem value="yellow">Jaune</MenuItem>
          </Select>
        </FormControl>
      </Collapse>
    </>
  ) : null;
};

export default RoverPanel;
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  Collapse,
  ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

import rovers from 'assets/rovers';

import { AppState } from 'store';
import { RoverState } from 'store/rovers/types';

import styles from './RoverPanel.module.scss';

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
  return (
    <>
      { rover && (
        <ListItem button onClick={handleClick} disabled>
          <ListItemIcon>
            <img height={24} width={24} src={rovers[rover.color]} alt={`${rover.color} rover`} />
          </ListItemIcon>
          <ListItemText primary={`Rover ${name}`} />
          { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
        </ListItem>
      ) }
      <Collapse in={open} timeout="auto" unmountOnExit>
      </Collapse>
    </>
  );
};

export default RoverPanel;
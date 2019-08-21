import React, { FC, DragEvent } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Divider, Drawer,
  List, ListItem
} from '@material-ui/core';

import themes from 'assets/themes/themes';

import { AppState } from 'store';

import styles from './EditDrawer.module.scss';

// Types
type Sample = 'ice' | 'rock' | 'sand'

// Components
const EditDrawer: FC = () => {
  // Redux
  const open = useSelector<AppState,boolean>(state => state.zone.editing);

  // Functions
  function handleDragSample(type: Sample) {
    return (event: DragEvent<HTMLImageElement>) => {
      console.log('drag', type);
      event.dataTransfer.setData('text/plain', type);
    };
  }

  // Rendering
  return (
    <Drawer
      anchor="right" open variant="permanent"
      classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
    >
      <List>
        <ListItem classes={{ root: styles.sample }}>
          <img src={themes.ice.getImage()} alt="ice" draggable onDragStart={handleDragSample('ice')} />
        </ListItem>
        <ListItem classes={{ root: styles.sample }}>
          <img src={themes.rock.getImage()} alt="rock" draggable onDragStart={handleDragSample('rock')} />
        </ListItem>
        <ListItem classes={{ root: styles.sample }}>
          <img src={themes.sand.getImage()} alt="sand" draggable onDragStart={handleDragSample('sand')} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default EditDrawer;
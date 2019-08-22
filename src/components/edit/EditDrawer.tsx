import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Drawer,
  List, ListItem
} from '@material-ui/core';

import themes from 'assets/themes/themes';

import { AppState } from 'store';
import { handleDrag } from 'store/zone/DropData';

import styles from './EditDrawer.module.scss';
import { FloorType } from 'data/Map';

// Components
const EditDrawer: FC = () => {
  // Redux
  const open = useSelector<AppState,boolean>(state => state.zone.editing);

  // Functions
  function handleDragSample(type: FloorType) {
    return handleDrag({ kind: 'type', type });
  }

  // Rendering
  return (
    <Drawer
      anchor="right" open variant="permanent"
      classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
    >
      <List>
        <ListItem classes={{ root: styles.sample }}>
          <img src={themes.hole.getImage()} alt="hole" draggable onDragStart={handleDragSample('hole')} />
        </ListItem>
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
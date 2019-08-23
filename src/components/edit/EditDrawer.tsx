import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  IconButton,
  Divider, Drawer,
  List, ListItem
} from '@material-ui/core';

import {
  Undo as UndoIcon,
} from '@material-ui/icons';

import themes from 'assets/themes/themes';

import { AppState } from 'store';
import { undo } from 'store/zone/thunks';
import { handleDrag } from 'store/zone/DropData';

import styles from './EditDrawer.module.scss';
import { FloorType } from 'data/Map';

// Components
const EditDrawer: FC = () => {
  // Redux
  const dispatch = useDispatch();

  const open = useSelector((state: AppState) => state.zone.editing);
  const history = useSelector((state: AppState) => state.zone.history);

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
        <ListItem classes={{ root: styles.button }}>
          <IconButton color="primary" disabled={history.length === 0} onClick={() => dispatch(undo())}>
            <UndoIcon />
          </IconButton>
        </ListItem>
        <Divider component="hr" />
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

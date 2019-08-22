import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar as MaterialAppBar,
  IconButton, Toolbar, Typography
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import { AppState } from 'store';
import { drawer } from 'store/drawer/actions';

import styles from 'components/AppBar.module.scss';
import { setEditing } from 'store/zone/actions';

// Component
const AppBar : FC = () => {
  // Redux
  const opened = useSelector<AppState,boolean>(state => state.drawer.open);
  const editing = useSelector<AppState,boolean>(state => state.zone.editing);
  const hasMap = useSelector<AppState,boolean>(state => state.zone.map !== undefined);
  const dispatch = useDispatch();

  // Rendering
  return (
    <>
      <MaterialAppBar position="fixed" className={styles.appbar}>
        <Toolbar>
          <IconButton
            className={styles.menuBtn}
            edge="start"
            color="inherit"
            onClick={() => dispatch(drawer.toggle())}
          >
            { opened ? <ArrowBackIcon /> : <MenuIcon /> }
          </IconButton>
          <Typography variant="h6" noWrap>Rover</Typography>
          <div className={styles.actions}>
            <IconButton
              color="inherit" disabled={!hasMap}
              onClick={() => dispatch(setEditing(!editing))}
            >
              { editing ? <CloseIcon /> : <EditIcon /> }
            </IconButton>
          </div>
        </Toolbar>
      </MaterialAppBar>
    </>
  );
};

export default AppBar;

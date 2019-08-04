import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CssBaseline, AppBar, Toolbar,
  Typography, IconButton
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import data from 'assets/map';

import { Map } from 'data/Map';
import { SimpleRover, StupidRover } from 'data/rovers';

import { addRover } from 'store/rovers/actions';

import Drawer from './drawer/Drawer';

import Zone from 'containers/map/Zone';

import styles from './App.module.scss';

// Constants
//const map = Map.loadMap(data);
const map = new Map([
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
  [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }]
]);

// Component
const App: FC = () => {
  // State
  const [open, setOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    const start = { x: 1, y: 1 };
    const end = { x: 5, y: 5 };

    dispatch(addRover('stupid', new StupidRover(map, start, end, 'right'), 'blue'));
    dispatch(addRover('simple', new SimpleRover(map, start, end), 'pink'));
  }, []);

  // Rendering
  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" className={styles.appbar}>
        <Toolbar>
          <IconButton
            className={styles.menuBtn}
            edge="start"
            color="inherit"
            onClick={() => setOpen(!open)}
          >
            { open ? <ArrowBackIcon /> : <MenuIcon /> }
          </IconButton>
          <Typography variant="h6" noWrap>Rover</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onOpen={() => setOpen(true)}>
        <Zone map={map} />
      </Drawer>
    </div>
  );
};

export default App;

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

import data from 'assets/levels/map';

import Map from 'data/Map';
import { ChristelleRover, PathRover, SimpleRover, StupidRover } from 'data/rovers';

import { addRover } from 'store/rovers/actions';

import Drawer from './drawer/Drawer';

import Zone from 'containers/map/Zone';

import styles from './App.module.scss';

// Constants
const START = { x: 0, y: 0 };
const END = { x: 6, y: 6 };

//const MAP = Map.loadMap(data);
const MAP = new Map([
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
    // rovers
    dispatch(addRover('stupid', new StupidRover(MAP, START, END, 'right'), 'blue'));
    dispatch(addRover('christelle', new ChristelleRover(MAP, START, END), 'pink'));
    dispatch(addRover('simple', new SimpleRover(MAP, START, END), 'green'));
    dispatch(addRover('path', new PathRover(MAP, START, END), 'white'));
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
        <Zone map={MAP} target={END} />
      </Drawer>
    </div>
  );
};

export default App;

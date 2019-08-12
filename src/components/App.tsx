import React, { FC, useState } from 'react';
import {
  CssBaseline, AppBar, Toolbar,
  Typography, IconButton
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import Drawer from './drawer/Drawer';

import Floor from './map2/Floor';

import styles from './App.module.scss';
import Direction from 'data/Direction';

// Component
const App: FC = () => {
  // State
  const [open, setOpen] = useState(false);

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
        <Floor type='ice' borders={{ [Direction.B]: true }} />
        <Floor type='hole' />
      </Drawer>
    </div>
  );
};

export default App;

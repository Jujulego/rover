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

import Map from 'containers/map/Map';

import styles from './App.module.scss';

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
        <Map />
      </Drawer>
    </div>
  );
};

export default App;

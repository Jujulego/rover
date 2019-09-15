import React, { FC } from 'react';

import { CssBaseline } from '@material-ui/core';

import AppBar from './AppBar';
import Drawer from './drawer/Drawer';
import EditDrawer from './edit/EditDrawer';

import Map from 'containers/map/Map';

import styles from './App.module.scss';

// Component
const App: FC = () => {
  // Rendering
  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar />
      <Drawer>
        <Map />
      </Drawer>
      <EditDrawer />
    </div>
  );
};

export default App;

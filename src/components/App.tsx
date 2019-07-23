import React, { ChangeEvent, FC, useState } from 'react';
import clsx from 'clsx';
import {
  CssBaseline, AppBar, Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Typography, IconButton
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';

import { Coords } from "../data/Coords";
import { Map } from '../data/Map';

import Zone from './map/Zone';

import styles from './App.module.scss';
import Toolbar from "@material-ui/core/Toolbar";

// Constants
const map = new Map([
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }]
]);

// Types
type State = Coords;

// Component
const App: FC = () => {
  // State
  const [zone, setZone] = useState<State>({ x: 2, y: 2 });
  const [open, setOpen] = useState(false);

  // Events
  const handleChange = (name: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setZone({ ...zone, [name]: parseInt(event.target.value) })
  };

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Rover</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        variant="permanent"
        classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Paramètres"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={styles.content}>
        <Zone map={map} center={zone} onMove={setZone} />
      </main>
    </div>
  );
};

export default App;
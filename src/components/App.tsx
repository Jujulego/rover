import React, { FC, useState } from 'react';
import {
  CssBaseline, AppBar, Toolbar,
  Typography, IconButton
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon
} from '@material-ui/icons';

import { Map } from 'data/Map';

import Drawer from './drawer/Drawer';

import Zone from 'containers/map/Zone';

import styles from './App.module.scss';

// Constants
const map = new Map([
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'ice'  }, { floor: 'ice'  }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'ice'  }, { floor: 'ice'  }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }]
]);

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
        <Zone map={map} />
      </Drawer>
    </div>
  );
};

export default App;

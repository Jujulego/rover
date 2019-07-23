import React, { ChangeEvent, useState } from 'react';
import {
    Grid, Paper,
    TextField
} from '@material-ui/core';

import { Coords } from "../data/Coords";
import { Map } from '../data/Map';

import Zone from './map/Zone';

import styles from './App.module.scss';

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
const App: React.FC = () => {
    // State
    const [zone, setZone] = useState<State>({ x: 2, y: 2 });

    // Events
    const handleChange = (name: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setZone({ ...zone, [name]: parseInt(event.target.value) })
    };

    // Rendering
    return (
        <Grid container className={styles.app}>
            <Grid item xs="auto" className={styles.panel} component={Paper} square>
                <TextField
                    label="x" value={zone.x} type="number"
                    fullWidth

                    onChange={handleChange('x')}
                />
                <TextField
                    label="y" value={zone.y} type="number"
                    fullWidth

                    onChange={handleChange('y')}
                />
            </Grid>
            <Grid item xs className={styles.grid}>
                <Zone map={map} center={zone} onMove={setZone} />
            </Grid>
        </Grid>
    );
};

export default App;

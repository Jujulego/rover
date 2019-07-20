import React, { ChangeEvent, useState } from 'react';
import {
    Grid, Paper,
    TextField
} from '@material-ui/core';

import { Map } from '../data/Map';

import Zone from './map/Zone';

import styles from './App.module.scss';

// Constants
const map = new Map([
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'hole' }, { floor: 'sand' }, { floor: 'sand' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'hole' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }],
  [{ floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }, { floor: 'rock' }]
]);

// Types
type State = { x: number, y: number, size: number };

// Component
const App: React.FC = () => {
    // State
    const [zone, setZone] = useState<State>({ x: 2, y: 2, size: 5 });

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
                <TextField
                    label="size" value={zone.size} type="number"
                    inputProps={{ min: 1 }}
                    fullWidth

                    onChange={handleChange('size')}
                />
            </Grid>
            <Grid item xs className={styles.grid}>
                <Zone map={map} center={{ x: zone.x, y: zone.y }} size={zone.size} />
            </Grid>
        </Grid>
    );
};

export default App;

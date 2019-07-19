import React, { ChangeEvent, useState } from 'react';
import {
    Grid, Paper,
    TextField
} from '@material-ui/core';

import Zone from './Zone';

import styles from './App.module.scss';

// Types
type State = { x: number, y: number, size: number };

// Component
const App: React.FC = () => {
    // State
    const [zone, setZone] = useState<State>({ x: 0, y: 0, size: 9 });

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
                <Zone center={{ x: zone.x, y: zone.y }} size={zone.size} />
            </Grid>
        </Grid>
    );
};

export default App;

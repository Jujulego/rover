import React, { FC } from 'react';

import { Coords } from '../data/types';

import Case from './Case';

import styles from './Zone.module.scss';

// Component
const Zone: FC<{ center: Coords, size: number }> = (props) => {
    const { center, size } = props;

    // Rendering
    const topleft: Coords = {
        x: center.x - ((size - size % 2) / 2),
        y: center.y - ((size - size % 2) / 2),
    };

    const cases = [];
    for (let x = 0; x < size; ++x) {
        for (let y = 0; y < size; ++y) {
            cases.push(
                <div style={{ gridColumn: x + 1, gridRow: y + 1 }}>
                    <Case coords={{ x: topleft.x + x, y: topleft.y + y }} />
                </div>
            )
        }
    }

    return (
        <div className={styles.grid}>
            { cases }
        </div>
    );
};

export default Zone;

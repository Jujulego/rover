import React, { FC } from 'react';

import { Coords, generateZone } from '../data/coords';

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
                <div className={styles.case} style={{ gridColumn: x + 1, gridRow: y + 1 }}>
                    <Case coords={{ x: topleft.x + x, y: topleft.y + y }} />
                </div>
            )
        }
    }

    return (
        <div className={styles.grid}>
            { generateZone(center, size, (c, i, j) => (
                <div key={`${i}${j}`} className={styles.case} style={{ gridColumn: i + 1, gridRow: j + 1 }}>
                    <Case coords={c} />
                </div>
            )) }
        </div>
    );
};

export default Zone;

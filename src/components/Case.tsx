import React, { FC } from 'react';

import { Coords } from '../data/types';

// Component
const Case: FC<{ coords: Coords }> = (props) => {
    const { coords } = props;

    return (
        <div>
            { coords.x } { coords.y }
        </div>
    )
};

export default Case;

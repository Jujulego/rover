import React, { FC, memo } from 'react';

import themes from 'assets/themes/themes';

import Coords, { equal } from 'data/Coords';
import Direction, { DMove } from 'data/Direction';
import Map, { Case } from 'data/Map';

import styles from './Floor.module.scss';

// Types
type Props = {
  pos: Coords,
  map: Map
}

// Constants
const BORDERS: Array<DMove | Direction.N> = [
  Direction.TLA,
  Direction.T,
  Direction.TRA,
  Direction.L,
  Direction.N,
  Direction.R,
  Direction.BLA,
  Direction.B,
  Direction.BRA
];

// Component
const Floor: FC<Props> = (props) => {
  const { pos, map } = props;
  const { floor } = map.get(pos) as Case;

  // Rendering
  const borders = map.borders(pos);

  return (
    <div className={styles.floor}>
      { BORDERS.map(dir => (
        <div key={dir}>
          { (dir === Direction.N || borders[dir].length === 0) ? <img src={themes[floor].getImage()} alt={floor} /> : borders[dir].map(layer => {
            if (layer.type === 'end' && layer.height === -1) return null;
            if (layer.type === 'hole' && layer.height !== -1) return null;
            if (layer.type === 'end' && floor === 'hole') return null;
            if (layer.type === 'end') return <img key={layer.height} src={themes[floor].getImage(layer.dir)} alt={floor} />;
            return <img key={layer.height} src={themes[layer.type].getImage(layer.dir)} alt={layer.type} />;
          }) }
        </div>
      )) }
    </div>
  );
};

function areEquals(pp: Props, np: Props): boolean {
  return equal(pp.pos, np.pos) && pp.map === np.map;
}

export default memo(Floor, areEquals);

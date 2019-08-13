import React, { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import targetImg from 'assets/themes/target.png';

import Coords from 'data/Coords';
import Map from 'data/Map';

import { CASE_SIZE } from './constants';
import Floor from './Floor';
import styles from './Case.module.scss';

// Props
type Props = {
  pos: Coords, map: Map, target?: boolean,
  coords?: boolean, height?: boolean, unknown?: boolean,
  onClick?: MouseEventHandler<HTMLDivElement>
}

// Component
const Case : FC<Props> = (props) => {
  const {
    pos, map, target,
    coords, height, unknown,
    onClick
  } = props;
  const data = map.get(pos);

  // Rendering
  if (!data) return null;

  return (
    <div
      className={clsx(styles.case, { [styles.unknown]: unknown })}
      style={{ top: pos.y * CASE_SIZE, left: pos.x * CASE_SIZE }}

      onClick={onClick}
    >
      <Floor type={data.floor} borders={map.borders2(pos)} cliffs={map.cliffs(pos)} />
      { (coords || height) && (
        <div className={styles.data}>
          { coords && <Typography classes={{ root: styles.tl }}>({pos.x},{pos.y})</Typography> }
          { height && <Typography classes={{ root: styles.bl }}>{data.height}</Typography> }
        </div>
      ) }
      { target && (
        <img className={styles.target} src={targetImg} alt="target" />
      )}
    </div>
  )
};

export default Case;

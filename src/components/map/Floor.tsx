import React, { FC } from 'react';
import clsx from 'clsx';

import { FloorType, Borders } from 'data/Map';

import styles from './Floor.module.scss';
import { DIRECTIONS } from "data/constants";

// Types
type Props = {
  type: FloorType,
  borders?: Borders
};

// Component
const Floor: FC<Props> = (props) => {
  const { type, borders = {} } = props;

  // Rendering
  const bordersStyle: { [name in string]: boolean } = {};
  DIRECTIONS.forEach(dir => {
    bordersStyle[styles[dir]] = borders[dir] || false;
  });

  return (
    <div className={clsx(styles.floor, styles[type], bordersStyle)}>
      <div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  );
};

export default Floor;

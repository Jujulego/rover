import React, { FC } from 'react';
import clsx from 'clsx';

import { FloorType, Borders } from 'data/Map';

import styles from './Floor.module.scss';
import { DIRECTIONS } from "data/constants";

// Types
type Props = {
  type: FloorType,
  borders?: Borders,
  unknown?: boolean | null,
  className?: string,
};

// Component
const Floor: FC<Props> = (props) => {
  const {
    type, borders = {},
    unknown = false,
    className
  } = props;

  // Rendering
  const bordersStyle: { [name in string]: boolean } = {};
  DIRECTIONS.forEach(dir => {
    bordersStyle[styles[dir]] = borders[dir] || false;
  });

  return (
    <div className={clsx(styles.floor, styles[type], bordersStyle, { [styles.unknown]: unknown }, className)}>
      <div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  );
};

export default Floor;

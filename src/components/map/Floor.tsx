import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './Floor.module.scss';

// Types
type Props = {
  type: 'rock' | 'hole',
  borders?: {
    top?: boolean,
    left?: boolean,
    bottom?: boolean,
    right?: boolean,
    topLeft?: boolean,
    topRight?: boolean,
    bottomLeft?: boolean,
    bottomRight?: boolean
  }
};

// Component
const Floor: FC<Props> = (props) => {
  const { type, borders = {} } = props;

  return (
    <div className={classNames(styles.floor, styles[type], {
      [styles.top]: borders.top,
      [styles.right]: borders.right,
      [styles.bottom]: borders.bottom,
      [styles.left]: borders.left,
      [styles.topLeft]: borders.topLeft,
      [styles.topRight]: borders.topRight,
      [styles.bottomLeft]: borders.bottomLeft,
      [styles.bottomRight]: borders.bottomRight
    } )}>
      <div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  );
};

export default Floor;
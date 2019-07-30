import React, { FC } from 'react';
import clsx from 'clsx';

import { Drawer as MaterialDrawer, List } from '@material-ui/core';

import Settings from './Settings';

import styles from './Drawer.module.scss';

// Props
type Props = {
  open: boolean,
  onOpen: () => void
}

// Component
const Drawer: FC<Props> = (props) => {
  const {
    children,
    open, onOpen
  } = props;

  // Rendering
  return (
    <>
      <MaterialDrawer
        open={open}
        variant="permanent"
        classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
      >
        <List component="nav">
          <Settings onOpenDrawer={onOpen} />
        </List>
      </MaterialDrawer>
      <main className={clsx(styles.content, { [styles.close]: !open })}>
        { children }
      </main>
    </>
  );
};

export default Drawer;

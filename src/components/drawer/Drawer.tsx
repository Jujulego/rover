import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  Divider,
  Drawer as MaterialDrawer, List
} from '@material-ui/core';

import MapPanel from './MapPanel';
import RoverPanel from './RoverPanel';

import styles from './Drawer.module.scss';

// Types
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

  // State
  const [panel, setPanel] = useState<string | null>(null);

  // Functions
  const panelProps = (name: string) => ({
    open: panel === name,
    onOpen: () => setPanel(name),
    onClose: () => setPanel(null)
  });

  // Effects
  useEffect(() => {
    if (!open) setPanel(null);
  }, [open]);

  useEffect(() => {
    if (panel != null) onOpen();
  }, [panel]);

  // Rendering
  return (
    <>
      <MaterialDrawer
        open={open}
        variant="permanent"
        classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
      >
        <List component="nav">
          <MapPanel {...panelProps('map')} />
          <Divider component="hr" />
          <RoverPanel {...panelProps('rover')} name="test" />
        </List>
      </MaterialDrawer>
      <main className={clsx(styles.content, { [styles.close]: !open })}>
        { children }
      </main>
    </>
  );
};

export default Drawer;

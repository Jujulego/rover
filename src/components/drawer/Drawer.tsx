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

type PanelsState = { [name: string]: boolean }

// Initial state
const initalPanelsState: PanelsState = {};

// Component
const Drawer: FC<Props> = (props) => {
  const {
    children,
    open, onOpen
  } = props;

  // State
  const [panels, setPanels] = useState<PanelsState>(initalPanelsState);

  // Functions
  function setPanel(name: string, state: boolean) {
    if (state) onOpen();
    setPanels(old => ({ ...old, [name]: state }));
  }

  // Effects
  useEffect(() => {
    if (!open) setPanels(initalPanelsState);
  }, [open]);

  // Rendering
  return (
    <>
      <MaterialDrawer
        open={open}
        variant="permanent"
        classes={{ paper: clsx(styles.drawer, { [styles.close]: !open }) }}
      >
        <List component="nav">
          <MapPanel
            open={panels.settings}
            onOpen={() => setPanel('settings', true)}
            onClose={() => setPanel('settings', false)}
          />
          <Divider component="hr" />
          <RoverPanel
            open={panels.rover} name="test"
            onOpen={() => setPanel('rover', true)}
            onClose={() => setPanel('rover', false)}
          />
        </List>
      </MaterialDrawer>
      <main className={clsx(styles.content, { [styles.close]: !open })}>
        { children }
      </main>
    </>
  );
};

export default Drawer;

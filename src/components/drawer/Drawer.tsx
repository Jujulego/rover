import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Divider,
  Drawer as MaterialDrawer, List
} from '@material-ui/core';

import { AppState } from 'store';
import { RoversState } from 'store/rovers/types';

import AddRover from './AddRover';
import MapPanel from './MapPanel';
import LayersPanel from './LayersPanel';
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

  // Redux
  const rovers = useSelector<AppState,RoversState>(state => state.rovers);

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
          <LayersPanel {...panelProps('layers')} rovers={Object.keys(rovers)} />
          { Object.keys(rovers).map((rover) => (
            <Fragment key={rover}>
              <Divider component="hr" />
              <RoverPanel {...panelProps(`rover-${rover}`)} name={rover} />
            </Fragment>
          )) }
          <Divider component="hr" />
          <AddRover />
        </List>
      </MaterialDrawer>
      <main className={clsx(styles.content, { [styles.close]: !open })}>
        { children }
      </main>
    </>
  );
};

export default Drawer;

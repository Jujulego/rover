import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Divider,
  Drawer as MaterialDrawer, List
} from '@material-ui/core';

import { AppState } from 'store';
import { openDrawer } from 'store/drawer/actions';
import { RoversState } from 'store/rovers/types';

import AddRover from './AddRover';
import DebugPanel from './DebugPanel';
import LayersPanel from './LayersPanel';
import MapPanel from './MapPanel';
import RoverPanel from './RoverPanel';

import styles from './Drawer.module.scss';

// Component
const Drawer: FC = (props) => {
  const { children } = props;

  // State
  const [panel, setPanel] = useState<string | null>(null);

  // Redux
  const rovers = useSelector<AppState,RoversState>(state => state.rovers);
  const open = useSelector<AppState,boolean>(state => state.drawer.open);
  const dispatch = useDispatch();

  // Functions
  const panelProps = (name: string) => ({
    open: panel === name,
    onOpen: () => {
      setPanel(name);
      if (!open) dispatch(openDrawer());
    },
    onClose: () => setPanel(null)
  });

  // Effects
  useEffect(() => {
    if (!open) setPanel(null);
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
          <MapPanel {...panelProps('map')} />
          <Divider component="hr" />
          <LayersPanel {...panelProps('layers')} />
          <Divider component="hr" />
          <DebugPanel {...panelProps('debug')} rovers={Object.keys(rovers)} />
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
      <main className={styles.content}>
        { children }
      </main>
    </>
  );
};

export default Drawer;

import React, { FC, ReactChild } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse, ButtonGroup, Button, Grid,
  ListItem, ListItemIcon, ListItemText,
  Select, MenuItem,
  Typography
} from '@material-ui/core';
import {
  BugReport as BugReportIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayArrowIcon,
  Refresh as RefreshIcon,
  Stop as StopIcon
} from '@material-ui/icons';

import rovers, { RoverColor } from 'assets/rovers';

import { round2 } from 'utils';

import { AppState } from 'store';
import { RoverState } from 'store/rovers/types';
import { playRover, setRoverColor, restartRover, stopRover } from 'store/rovers/actions';
import { launchRover } from 'store/rovers/thunks';
import { moveZone, trackRover, stopTracking, debugRover } from 'store/zone/actions';

import CoordsData from 'components/utils/CoordsData';

import styles from './RoverPanel.module.scss';

// Types
type Props = {
  open: boolean,
  name: string,
  onOpen: () => void,
  onClose: () => void
}

// Constants
const LABEL_XS = 4;

// Components
const Data: FC<{ label: string, children: ReactChild }> = (props) => (
  <Grid container alignItems="center" spacing={1} wrap="nowrap">
    <Grid item xs={LABEL_XS}><Typography>{ props.label }</Typography></Grid>
    <Grid item xs>{ props.children }</Grid>
  </Grid>
);

const RoverPanel: FC<Props> = (props) => {
  const {
    open, name,
    onOpen, onClose
  } = props;

  // Redux
  const dispatch = useDispatch();
  const rover = useSelector<AppState,RoverState>(state => state.rovers[name]);
  const track = useSelector<AppState,string | undefined>(state => state.zone.track);

  // Function
  function handleClick() {
    if (open) {
      onClose();
    } else {
      onOpen()
    }
  }

  function handleLocate(name: 'pos' | 'start' | 'target') {
    return () => {
      dispatch(moveZone(rover.data[name]));
      dispatch(stopTracking())
    };
  }

  function handleTrack() {
    if (track === name) {
      dispatch(moveZone(rover.data.pos));
      dispatch(stopTracking());
    } else {
      dispatch(trackRover(name));
    }
  }

  function handleStep() {
    dispatch(playRover(name));
  }

  function handlePlayStop() {
    if (rover.active) {
      dispatch(stopRover(name));
    } else {
      dispatch(launchRover(name));
    }
  }

  async function handleDebug() {
    await dispatch(debugRover(name));

    if (!rover.active) {
      dispatch(launchRover(name));
    }
  }

  function handleRestart() {
    dispatch(restartRover(name));
  }

  // Rendering
  return rover ? (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <img height={24} width={24} src={rovers[rover.color]} alt={`${rover.color} rover`} />
        </ListItemIcon>
        <ListItemText primary={<span>Rover <em>"{ name }"</em></span>} />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse
        classes={{ wrapperInner: styles.panel }}
        in={open} timeout="auto" unmountOnExit
      >
        <Data label="Position">
          <CoordsData
            className={styles.data}
            coords={rover.data.pos} onLocate={handleLocate('pos')}
            tracking={track === name} onTrack={handleTrack}
          />
        </Data>
        <Data label="Départ">
          <CoordsData className={styles.data} coords={rover.data.start} onLocate={handleLocate('start')} />
        </Data>
        <Data label="Cible">
          <CoordsData className={styles.data} coords={rover.data.target} onLocate={handleLocate('target')} />
        </Data>
        <Data label="Energie">
          <Typography>{ round2(rover.data.energy) } / { rover.data.gaugeSize }</Typography>
        </Data>
        <Data label="Attente">
          <Typography>{ rover.data.wait }</Typography>
        </Data>
        <Data label="Couleur">
          <Select value={rover.color} onChange={(e) => dispatch(setRoverColor(name, e.target.value as RoverColor))} fullWidth>
            <MenuItem value="blue">Bleu</MenuItem>
            <MenuItem value="green">Vert</MenuItem>
            <MenuItem value="pink">Rose</MenuItem>
            <MenuItem value="white">Blanc</MenuItem>
            <MenuItem value="yellow">Jaune</MenuItem>
          </Select>
        </Data>
        <div className={styles.buttons}>
          <Button
            classes={{ root: styles.step }}
            variant="outlined" fullWidth disabled={rover.active || rover.data.arrived}
            onClick={handleStep}
          >
            Step
          </Button>
          <ButtonGroup
            classes={{ root: styles.grp }}
            variant="outlined" disabled={rover.data.arrived}
          >
            <Button
              classes={{ root: styles.play }}
              color={rover.active ? 'secondary' : 'primary'}
              onClick={handlePlayStop}
            >
              { rover.active ? (
                <StopIcon className={styles.btnIcon} />
              ) : (
                <PlayArrowIcon className={styles.btnIcon} />
              ) }
              { rover.active ? 'Stop' : 'Play' }
            </Button>
            <Button
              color="primary" size="small"
              onClick={handleDebug}
            >
              <BugReportIcon />
            </Button>
          </ButtonGroup>
        </div>
        <Button
          variant="outlined" color="secondary" fullWidth
          onClick={handleRestart} disabled={rover.active}
        >
          <RefreshIcon className={styles.btnIcon} />
          Restart
        </Button>
      </Collapse>
    </>
  ) : null;
};

export default RoverPanel;

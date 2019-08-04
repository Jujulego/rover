import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse, Button,
  ListItem, ListItemIcon, ListItemText,
  FormControl, InputLabel, Select, MenuItem,
  Typography
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

import rovers, { RoverColor } from 'assets/rovers';

import { AppState } from 'store';
import { RoverState } from 'store/rovers/types';
import { playRover, setRoverColor, restartRover } from 'store/rovers/actions';
import { moveZone, trackRover, stopTracking } from 'store/zone/actions';

import CoordsData from 'components/utils/CoordsData';

import styles from './RoverPanel.module.scss';

// Types
type Props = {
  open: boolean,
  name: string,
  onOpen: () => void,
  onClose: () => void
}

// Component
const RoverPanel: FC<Props> = (props) => {
  const {
    open, name,
    onOpen, onClose
  } = props;

  // Refs
  const [playing, setPlaying] = useState<number | null>(null);

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
      dispatch(stopTracking())
    } else {
      dispatch(trackRover(name))
    }
  }

  function handleStep() {
    dispatch(playRover(name));
  }

  function handlePlayStop() {
    if (playing == null) {
      setPlaying(setInterval(() => {
        dispatch(playRover(name));
      }, 750) as unknown as number);
    } else {
      clearInterval(playing);
      setPlaying(null);
    }
  }

  function handleRestart() {
    if (playing != null) {
      clearInterval(playing);
      setPlaying(null);
    }

    dispatch(restartRover(name))
  }

  // Effects
  useEffect(() => {
    if (playing != null) {
      if (rover.data.arrived) {
        clearInterval(playing);
        setPlaying(null);
      }
    }
  }, [rover.data.pos.x,rover.data.pos.y]);

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
        <CoordsData className={styles.data}
          label="Position" coords={rover.data.pos} onLocate={handleLocate('pos')}
          tracking={track === name} onTrack={handleTrack}
        />
        <CoordsData className={styles.data} label="Départ" coords={rover.data.start} onLocate={handleLocate('start')} />
        <CoordsData className={styles.data} label="Cible" coords={rover.data.target} onLocate={handleLocate('target')} />
        <div className={styles.data}>
          <Typography>Energie: {Math.round(rover.data.energy * 100) / 100}</Typography>
        </div>
        <FormControl component="fieldset">
          <InputLabel>Couleur</InputLabel>
          <Select value={rover.color} onChange={(e) => dispatch(setRoverColor(name, e.target.value as RoverColor))}>
            <MenuItem value="blue">Bleu</MenuItem>
            <MenuItem value="green">Vert</MenuItem>
            <MenuItem value="pink">Rose</MenuItem>
            <MenuItem value="white">Blanc</MenuItem>
            <MenuItem value="yellow">Jaune</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.buttons}>
          <Button
            classes={{ root: styles.step }}
            variant="outlined" fullWidth disabled={playing != null || rover.data.arrived}
            onClick={handleStep}
          >
            Step
          </Button>
          <Button
            classes={{ root: styles.play }}
            color={ playing ? 'secondary' : 'primary' }
            variant="outlined" fullWidth disabled={rover.data.arrived}
            onClick={handlePlayStop}
          >
            { playing ? 'Stop' : 'Play' }
          </Button>
        </div>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleRestart}>Restart</Button>
      </Collapse>
    </>
  ) : null;
};

export default RoverPanel;
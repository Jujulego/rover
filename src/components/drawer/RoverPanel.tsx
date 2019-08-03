import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Collapse, Button, IconButton,
  ListItem, ListItemIcon, ListItemText,
  FormControl, InputLabel, Select, MenuItem,
  Typography
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  LocationSearching as LocationSearchingIcon,
  LocationOff as LocationOffIcon,
  LocationOn as LocationOnIcon
} from '@material-ui/icons';

import rovers, { RoverColor } from 'assets/rovers';

import { AppState } from 'store';
import { RoverState } from 'store/rovers/types';
import { playRover, setRoverColor } from 'store/rovers/actions';
import { moveZone, trackRover, stopTracking } from 'store/zone/actions';

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

  function handleLocation() {
    dispatch(moveZone(rover.data.pos));
    dispatch(stopTracking())
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
        <div className={styles.data}>
          <Typography>Position: x = {rover.data.pos.x} y = {rover.data.pos.y}</Typography>
          <IconButton size="small" onClick={handleTrack}>
            { (track === name) ? <LocationOffIcon /> : <LocationOnIcon /> }
          </IconButton>
          <IconButton size="small" onClick={handleLocation}><LocationSearchingIcon /></IconButton>
        </div>
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
            variant="outlined" fullWidth disabled={playing != null}
            onClick={handleStep}
          >
            Step
          </Button>
          <Button
            classes={{ root: styles.play }}
            color={ playing ? 'secondary' : 'primary' }
            variant="outlined" fullWidth
            onClick={handlePlayStop}
          >
            { playing ? 'Stop' : 'Play' }
          </Button>
        </div>
      </Collapse>
    </>
  ) : null;
};

export default RoverPanel;
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid,
  ListItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField,
  FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';

import rovers, { RoverColor } from 'assets/rovers';
import roversAI from 'data/rovers';

import Coords, { isCoords } from 'data/Coords';
import Level from 'data/Level';
import Map from 'data/Map';

import { AppState } from 'store';
import { addRover } from 'store/rovers/actions';

import CoordsField from 'components/utils/CoordsField';

// Types
type FormState = {
  name: string,
  color: RoverColor,
  algo: string,
  start: Coords
}

type ErrorsState = { [name in keyof FormState]?: string }

// Component
const AddRover: FC = () => {
  // State
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', color: 'blue', algo: '', start: { x: 0, y: 0 } });
  const [errors, setError] = useState<ErrorsState>({});

  // Redux
  const level = useSelector<AppState,Level | undefined>(state => state.zone.level);
  const map = useSelector<AppState,Map | undefined>(state => state.zone.map);
  const dispatch = useDispatch();

  // Functions
  function closeDialog() {
    setDialog(false);
    setError({});
  }

  function addError(field: keyof FormState, error: string) {
    setError(old => ({ ...old, [field]: error }));
  }

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<{ value: unknown }> | Coords) => {
    setError(({ [field]: _, ...others }) => others);

    if (isCoords(event)) {
      setForm(old => ({ ...old, [field]: event }));
    } else {
      event.persist();
      setForm(old => ({ ...old, [field]: event.target.value }));

      if (field === 'algo' && form.name === '') {
        setForm(old => ({ ...old, name: event.target.value as string }))
      }
    }
  };

  function handleAdd() {
    if (!level || !map) return;

    // Validation
    if (form.name === '') {
      addError('name', 'Ce champ est requis');
      return;
    }
    if (form.algo === '') {
      addError('algo', 'Ce champ est requis');
      return;
    }

    // Add rover
    dispatch(addRover(form.name, new roversAI[form.algo](map, form.start, level.target), form.color));
    closeDialog();
  }

  // Rendering
  return (
    <>
      <ListItem button onClick={() => setDialog(true)} disabled={!level}>
        <ListItemIcon><AddIcon color="primary" /></ListItemIcon>
        <ListItemText>Ajouter un rover</ListItemText>
      </ListItem>
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogTitle>Ajouter un rover</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  label="Nom" type="text" required fullWidth
                  value={form.name} error={!!errors.name} helperText={errors.name}
                  onChange={handleChange('name')}
                />
              </Grid>
              <Grid item xs={6} container spacing={1} alignItems="center">
                <Grid item xs="auto">
                  <img height={48} width={48} src={rovers[form.color]} alt={`${form.color} rover`} />
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth>
                    <InputLabel>Couleur</InputLabel>
                    <Select value={form.color} onChange={handleChange('color')}>
                      <MenuItem value="blue">Bleu</MenuItem>
                      <MenuItem value="green">Vert</MenuItem>
                      <MenuItem value="pink">Rose</MenuItem>
                      <MenuItem value="white">Blanc</MenuItem>
                      <MenuItem value="yellow">Jaune</MenuItem>
                    </Select>
                    { errors.color && (
                      <FormHelperText error>{ errors.color }</FormHelperText>
                    ) }
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl required fullWidth>
                <InputLabel>Algorithme</InputLabel>
                <Select value={form.algo} onChange={handleChange('algo')}>
                  { Object.keys(roversAI).map(k => (
                    <MenuItem key={k} value={k}>{ k }</MenuItem>
                  )) }
                </Select>
                { errors.algo && (
                  <FormHelperText error>{ errors.algo }</FormHelperText>
                ) }
              </FormControl>
            </Grid>
            <Grid item>
              <CoordsField
                label="Depart"
                value={form.start}
                onChange={handleChange('start')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={closeDialog}>
            Annuler
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRover;

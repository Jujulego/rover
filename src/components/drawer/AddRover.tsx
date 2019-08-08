import React, { FC, useState } from 'react';

import {
  ListItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@material-ui/core";
import {
  Add as AddIcon
} from "@material-ui/icons";

// Component
const AddRover: FC = () => {
  // State
  const [dialog, setDialog] = useState(false);

  // Functions
  function closeDialog() {
    setDialog(false);
  }

  // Rendering
  return (
    <>
      <ListItem button onClick={() => setDialog(true)}>
        <ListItemIcon><AddIcon color="primary" /></ListItemIcon>
        <ListItemText>Ajouter un rover</ListItemText>
      </ListItem>
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogTitle>Ajouter un rover</DialogTitle>
        <DialogContent>
          <TextField label="Nom" required />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={closeDialog}>
            Annuler
          </Button>
          <Button color="primary" onClick={closeDialog}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRover;
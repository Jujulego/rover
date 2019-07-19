import React from 'react';
import { Grid } from '@material-ui/core';

import Zone from './components/Zone';

// Component
const App: React.FC = () => {
  return (
    <Grid container>
      <Grid item>
        <Zone center={{ x: 0, y: 0 }} size={9} />
      </Grid>
    </Grid>
  );
};

export default App;

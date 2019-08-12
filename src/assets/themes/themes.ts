import { FloorType } from 'data/Map';
import Theme from 'data/Theme';

import ice from './ice';
import rock from './rock';
import sand from './sand';
import hole from './hole';

// themes
const themes: { [name in FloorType]: Theme } = {
  ice, rock, sand, hole
};

export default themes;

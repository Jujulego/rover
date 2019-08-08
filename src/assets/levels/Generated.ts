import Level from 'data/Level';
import Map from 'data/Map';

import map from './map';

// Level
class GeneratedLevel extends Level {
  // Methods
  async loadMap(): Promise<Map> {
    return Map.loadMap(map);
  }
}

export default new GeneratedLevel("generated");

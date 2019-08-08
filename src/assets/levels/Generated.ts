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

export default new GeneratedLevel("generated", { x: 0, y: 0 }, { x: 150, y: 192 });

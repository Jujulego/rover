import Map from './Map';
import Coords from './Coords';

// Class
abstract class Level {
  // Properties
  readonly name: string;
  readonly start: Coords;
  readonly target: Coords;

  // Constructor
  constructor(name: string, start: Coords, target: Coords) {
    this.name = name;
    this.start = start;
    this.target = target;
  }

  // Methods
  abstract async loadMap(): Promise<Map>;
}

export default Level;

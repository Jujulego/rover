import Map from './Map';

// Class
abstract class Level {
  // Properties
  readonly name: string;

  // Constructor
  constructor(name: string) {
    this.name = name;
  }

  // Methods
  abstract loadMap(): Map;
}

export default Level;

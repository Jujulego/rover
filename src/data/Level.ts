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
  abstract async loadMap(): Promise<Map>;
}

export default Level;

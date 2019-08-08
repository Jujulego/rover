import Level from 'data/Level';
import Map from 'data/Map';

// Level
class SimpleLevel extends Level {
  // Methods
  async loadMap(): Promise<Map> {
    return new Map([
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }]
    ]);
  }
}

export default new SimpleLevel("simple");

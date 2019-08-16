import Level from 'data/Level';
import Map from 'data/Map';

// Level
class MountainLevel extends Level {
  // Methods
  async loadMap(): Promise<Map> {
    return new Map([
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 1 }, { floor: "rock", height: 3 }, { floor: "rock", height: 3 }, { floor: "rock", height: 4 }, { floor: "rock", height: 5 }, { floor: "rock", height: 8 }],
      [{ floor: "rock", height: 0 }, { floor: "sand", height: 1 }, { floor: "ice",  height: 2 }, { floor: "rock", height: 3 }, { floor: "rock", height: 4 }, { floor: "rock", height: 4 }, { floor: "rock", height: 5 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 1 }, { floor: "rock", height: 2 }, { floor: "rock", height: 3 }, { floor: "sand", height: 3 }, { floor: "rock", height: 3 }, { floor: "rock", height: 3 }],
      [{ floor: "hole", height: 0 }, { floor: "rock", height: 1 }, { floor: "rock", height: 2 }, { floor: "sand", height: 2 }, { floor: "sand", height: 2 }, { floor: "rock", height: 2 }, { floor: "rock", height: 2 }],
      [{ floor: "hole", height: 0 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }, { floor: "rock", height: 1 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "ice",  height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }],
      [{ floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }, { floor: "rock", height: 0 }]
    ]);
  }
}

export default new MountainLevel("mountain", { x: 0, y: 0 }, { x: 6, y: 6 });

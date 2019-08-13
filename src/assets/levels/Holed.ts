import Level from 'data/Level';
import Map from 'data/Map';

// Level
class HoledLevel extends Level {
  // Methods
  async loadMap(): Promise<Map> {
    return new Map([
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 1 }, { floor: "sand", height: 2 }, { floor: "sand", height: 2 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 1 }, { floor: "sand", height: 2 }, { floor: "sand", height: 2 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }, { floor: "sand", height: 1 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "hole", height: 0 }, { floor: "hole", height: 0 }, { floor: "hole", height: 0 }, { floor: "hole", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "hole", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "hole", height: 0 }, { floor: "sand", height: 0 }, { floor: "hole", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "hole", height: 0 }, { floor: "sand", height: 0 }]
    ]);
  }
}

export default new HoledLevel("hole", { x: 0, y: 0 }, { x: 4, y: 6 });

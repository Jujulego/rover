import Level from 'data/Level';
import Map from 'data/Map';

// Level
class SimpleLevel extends Level {
  // Methods
  async loadMap(): Promise<Map> {
    return new Map([
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }],
      [{ floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }, { floor: "sand", height: 0 }]
    ]);
  }
}

export default new SimpleLevel("simple", { x: 0, y: 0 }, { x: 6, y: 6 });

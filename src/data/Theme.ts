import { DBorder } from './Direction';

// Class
class Theme {
  // Attributes
  private readonly floor: string;
  private readonly borders?: { [name in DBorder]: string };

  // Constructor
  constructor(floor: string, borders?: { [name in DBorder]: string }) {
    this.floor = floor;
    this.borders = borders;
  }

  // Properties
  get hasBorders(): boolean {
    return this.borders !== undefined;
  }

  // Methods
  getImage(dir?: DBorder): string {
    return this.borders && dir ? this.borders[dir] : this.floor;
  }
}

export default Theme;
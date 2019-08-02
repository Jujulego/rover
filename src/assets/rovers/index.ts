import blueRover from 'assets/rovers/blue.png';
import greenRover from 'assets/rovers/green.png';
import pinkRover from 'assets/rovers/pink.png';
import whiteRover from 'assets/rovers/white.png';
import yellowRover from 'assets/rovers/yellow.png';

// Types
export type RoverColor = 'blue' | 'green' | 'pink' | 'white' | 'yellow';

// Content
const rovers: { [name in RoverColor]: string } = {
  blue: blueRover,
  green: greenRover,
  pink: pinkRover,
  white: whiteRover,
  yellow: yellowRover
};

export default rovers;
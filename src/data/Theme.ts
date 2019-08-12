import { DBorder } from './Direction';

// Class
export default interface Theme {
  floor: string,
  borders: { [name in DBorder]: string }
}

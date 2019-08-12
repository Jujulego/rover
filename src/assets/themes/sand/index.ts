import Direction from 'data/Direction';
import Theme from 'data/Theme';

import floor from './floor.png';
import borderT from './border-t.png';
import borderTL from './border-tl.png';
import borderL from './border-l.png';
import borderBL from './border-bl.png';
import borderB from './border-b.png';
import borderBR from './border-br.png';
import borderR from './border-r.png';
import borderTR from './border-tr.png';
import borderTLAngle from './border-tl-angle.png';
import borderBLAngle from './border-bl-angle.png';
import borderBRAngle from './border-br-angle.png';
import borderTRAngle from './border-tr-angle.png';

// Theme
export default new Theme(floor, {
  [Direction.T]:   borderT,
  [Direction.TL]:  borderTL,
  [Direction.L]:   borderL,
  [Direction.BL]:  borderBL,
  [Direction.B]:   borderB,
  [Direction.BR]:  borderBR,
  [Direction.R]:   borderR,
  [Direction.TR]:  borderTR,
  [Direction.TLA]: borderTLAngle,
  [Direction.BLA]: borderBLAngle,
  [Direction.BRA]: borderBRAngle,
  [Direction.TRA]: borderTRAngle
});

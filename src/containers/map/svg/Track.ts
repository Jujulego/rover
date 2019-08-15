import { connect } from 'react-redux';

import { AppState } from 'store';

import Track from 'components/map/svg/Track';

// Type
interface Props {
  name: string
}

// Component
function mapStateToProps(state: AppState, own: Props) {
  const rover = state.rovers[own.name];

  return {
    pos: rover.data.pos,
    track: rover.track,
    color: rover.color
  }
}

export default connect(mapStateToProps)(Track);
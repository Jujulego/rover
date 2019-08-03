import { Dispatch } from 'redux';
import { connect } from "react-redux";

import { Coords } from 'data/Coords';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';

import Zone from 'components/map/Zone';

// Component
function mapStateToProps(state: AppState) {
  let center = state.zone.center;
  if (state.zone.track) {
    const tracked = state.rovers[state.zone.track];

    if (tracked) {
      center = tracked.data.pos;
    }
  }

  return {
    center,
    zoom: state.zone.zoom,
    options: state.zone.options,
    rovers: state.rovers
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMove: (center: Coords) => dispatch(moveZone(center))
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone)

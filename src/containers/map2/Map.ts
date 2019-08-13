import { connect } from "react-redux";

import { AppState } from 'store';

import Map from 'components/map2/Map';

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
    map: state.zone.map,
    target: state.zone.level ? state.zone.level.target : { x: 0, y: 0 },
    center, zoom: state.zone.zoom
  };
}

export default connect(mapStateToProps)(Map)

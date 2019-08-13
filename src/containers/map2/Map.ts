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
    target: state.zone.level && state.zone.level.target,
    center, zoom: state.zone.zoom, options: state.zone.options,
  };
}

export default connect(mapStateToProps)(Map)

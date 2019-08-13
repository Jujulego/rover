import { connect } from "react-redux";

import { AppState } from 'store';

import Map from 'components/map2/Map';

// Component
function mapStateToProps(state: AppState) {
  return {
    map: state.zone.map,
    center: state.zone.center,
    zoom: state.zone.zoom
  };
}

export default connect(mapStateToProps)(Map)

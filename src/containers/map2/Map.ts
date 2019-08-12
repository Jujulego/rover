import { connect } from "react-redux";

import { AppState } from 'store';

import Map from 'components/map2/Map';

// Component
function mapStateToProps(state: AppState) {
  return {
    map: state.zone.map
  };
}

export default connect(mapStateToProps)(Map)

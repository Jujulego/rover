import { Dispatch } from 'redux';
import { connect } from "react-redux";

import { Coords } from 'data/Coords';

import { AppState } from 'store';
import { moveZone } from 'store/zone/actions';

import Zone from 'components/map/Zone';

// Props
type Props = {
  rover: string
}

// Component
const mapStateToProps = (state: AppState, ownProps: Props) => ({
  center: state.zone.center,
  zoom: state.zone.zoom,
  options: state.zone.options,
  rover: state.rovers[ownProps.rover]
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMove: (center: Coords) => dispatch(moveZone(center))
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone)

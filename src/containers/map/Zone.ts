import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Coords } from "../../data/Coords";

import { AppState } from "../../store";
import { moveZone } from "../../store/zone/actions";

import Zone from "../../components/map/Zone";

// Components
const mapStateToProps = (state: AppState) => ({
  center: state.zone.center
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMove: (center: Coords) => dispatch(moveZone(center))
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone)
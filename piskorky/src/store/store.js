import { createStore } from 'redux';
import App from '../components/app';


// ////////////////////////REdUX//////////////////


function changeHeight(e) {
  return {
    type: 'CHANGE_HEIGHT',
    Rheight: parseInt(e.target.value, 10),
  };
}


function changeWidth(e) {
  return {
    type: 'CHANGE_WIDTH',
    Rwidth: parseInt(e.target.value, 10),
  };
}

function changeHits(e) {
  return {
    type: 'CHANGE_HITS',
    Rhits: parseInt(e.target.value, 10),
  };
}

function changeTurnary() {
  return {
    type: 'CHANGE_TURNARY',
  };
}

function changePositions(e) {
  // alert(e)
  return {
    type: 'CHANGE_POSITIONS',
    pos: e,
  };
}

function reducer(
  state =
  {
    Rheight: 3, Rwidth: 3, Rhits: 3, Rturnary: true, Rpositions: [],
  },
  action,
) {
  switch (action.type) {
    case 'CHANGE_HEIGHT':
      return Object.assign({}, state, { Rheight: action.Rheight });

    case 'CHANGE_WIDTH':
      return Object.assign({}, state, { Rwidth: action.Rwidth });

    case 'CHANGE_HITS':
      return Object.assign({}, state, { Rhits: action.Rhits });

    case 'CHANGE_TURNARY':
      return Object.assign({}, state, { Rturnary: !state.Rturnary });
    case 'CHANGE_POSITIONS':
      return Object.assign({}, state, { Rpositions: action.pos });

    default:
      return state;
  }
}
export const store = createStore(reducer);
export function mapStateToProps(state) {
  return {
    Rheight: state.Rheight,
    Rwidth: state.Rwidth,
    Rhits: state.Rhits,
    Rturnary: state.Rturnary,
    Rpositions: state.Rpositions,

  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeHeight: e => dispatch(changeHeight(e)),
    onChangeWidth: e => dispatch(changeWidth(e)),
    onChangeHits: e => dispatch(changeHits(e)),
    onTurnaryChange: () => dispatch(changeTurnary()),
    onPositionChange: e => dispatch(changePositions(e)),
  };
}

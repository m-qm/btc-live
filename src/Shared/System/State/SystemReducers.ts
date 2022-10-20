import { AnyAction } from 'redux';
import {
  CLEAR_SESSION,
  SystemActionTypes, SystemStateInterface, UPDATE_SESSION, UPDATE_USERINFO,
} from '../SystemTypes';
import { INITIAL_STATE } from './StateTypes';

export default function systemReducer(state:SystemStateInterface = INITIAL_STATE, action: SystemActionTypes | AnyAction): SystemStateInterface {
  switch (action.type) {
    case UPDATE_USERINFO: {
      return {
        ...state,
        userInfo: state.userInfo,
      };
    }
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action,
      };
    }
    case CLEAR_SESSION: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}

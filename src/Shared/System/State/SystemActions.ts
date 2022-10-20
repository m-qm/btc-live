import {
  CLEAR_SESSION, SystemActionTypes, UPDATE_SESSION, UserInfoInterface,
} from '../SystemTypes';

export function updateSession(userInfo: UserInfoInterface): SystemActionTypes {
  return {
    type: UPDATE_SESSION,
    loggedIn: true,
    userInfo,
  };
}

export function clearSession(): SystemActionTypes {
  return {
    type: CLEAR_SESSION,
  };
}

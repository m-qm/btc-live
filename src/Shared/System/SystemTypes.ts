export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const CLEAR_SESSION = 'CLEAR_SESSION';

export enum UserRoleEnum {
    User = 'USER'
}

export type UserInfoInterface = {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    balance: number;
    KYC: boolean;
}

export type TokenInterface = {
    name: string;
}

export interface SystemStateInterface {
    loggedIn: boolean;
    userInfo: UserInfoInterface;
}

export interface SystemStateSelectorInterface {
    System: SystemStateInterface
}

export interface UpdateSessionAction extends SystemStateInterface{
    type: typeof UPDATE_SESSION;
}

export interface ClearSessionAction{
    type: typeof CLEAR_SESSION;
}

interface UpdateUserInfoAction {
    type: typeof UPDATE_USERINFO;
    payload: Partial<UserInfoInterface>;
}

export type SystemActionTypes =
    | UpdateSessionAction
    | ClearSessionAction
    | UpdateUserInfoAction

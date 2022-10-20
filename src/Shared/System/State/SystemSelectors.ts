import { SystemStateInterface, SystemStateSelectorInterface, UserRoleEnum } from '../SystemTypes';

export const systemStateSelector = ({ System }: SystemStateSelectorInterface): SystemStateInterface => System;

export const getUserRoleByString = (dataRole: string): UserRoleEnum => {
  let role: UserRoleEnum;
  switch (dataRole.split(' ')[0]) {
    case UserRoleEnum.User:
      role = UserRoleEnum.User;
      break;
    default:
      throw new Error('User role is not supported');
  }

  return role;
};

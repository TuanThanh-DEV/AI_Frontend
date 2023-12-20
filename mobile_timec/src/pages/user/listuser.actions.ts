import { ActionType } from '../../util/types';
import { User } from './User';
import { asyncRequests } from '../../data/dataApi';
import { ListUserState } from './listuser.state';

export const loadListUser = () => async (dispatch: React.Dispatch<any>) => {
  const users = await asyncRequests.get("/user/listAll");
  dispatch(setListUserData({users:users}));
};

export const setListUserData = (users: Partial<ListUserState>) => ({
  type: 'set-list-user-data',
  users
} as const);



export type ListUserActions =
  ActionType<typeof setListUserData>   

import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as userReducer } from './user/user.slice';
import { reducer as profileReducer } from './profile/profile.slice';
export const reducers = {
	user: userReducer,
	profile: profileReducer,
	toastr: toastrReducer,
};
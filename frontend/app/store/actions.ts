import * as userActions from './user/user.actions'
import * as profileActions from './profile/profile.actions';

export const allActions = {
	...userActions,
	...profileActions
}

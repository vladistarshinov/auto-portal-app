import { errorCatch } from '../api/api.helper';
import { toastr } from 'react-redux-toastr';

export const toastError = (error: any, title?: string) => {
	const msg = errorCatch(error);
	toastr.error(title || 'Error request', msg);
	throw msg;
};

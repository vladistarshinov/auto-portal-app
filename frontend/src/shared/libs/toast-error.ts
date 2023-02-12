import { toastr } from 'react-redux-toastr'

import { errorCatch } from '../api/api.helper'

export const toastError = (error: any, title?: string) => {
	const msg = errorCatch(error)
	toastr.error(title || 'Error request', msg)
	throw msg
}

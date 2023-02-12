import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { toastr } from "react-redux-toastr"

import instance from "./interceptors"
import { errorCatch } from "./api.helper"

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data

	const onError = (error: AxiosError<T>) => {
		toastr.error(
			'Logout',
			errorCatch(error)
		)

		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
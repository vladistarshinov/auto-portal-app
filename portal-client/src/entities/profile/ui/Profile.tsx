import { FC, useState, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toastr } from "react-redux-toastr"
import {
	Box,
	Grid,
	Card,
	Button,
	CardContent,
	FormControl,
	Typography,
	TextField
} from "@mui/material"

import Heading from "@/shared/ui/heading/Heading"
import { toastError } from "@/shared/libs/toast-error"
import AccountDataFields from "@/processes/auth/ui/AccountDataFields"
import ChangePasswordModal from "@/features/change-password/ui/ChangePasswordModal"
import { IProfileInput } from "./profile.interface"
import { ProfileService } from "../model/profile.service"


const Profile: FC = () => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState(null)
	const type = 'profile'
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading } = useQuery(['profile'], () => ProfileService.getProfile(), {
		onSuccess({ data }) {
			setValue('email', data.email)
			setValue('firstName', data.firstName)
			setValue('lastName', data.lastName)
		},
		onError(error) {
			toastError(error, 'Get profile')
		},
	})


	const { mutateAsync: editProfile } = useMutation(
		['update profile'],
		(data: IProfileInput) => ProfileService.updateProfile(data),
		{
			onSuccess() {
				toastr.success('Update profile', 'update was successful')
			},
			onError(error) {
				toastError(error, 'Update profile')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await editProfile(data)
	}

	return (
		<Grid container display="inline-flex" justifyContent="space-around" paddingTop='5%'>
			<ChangePasswordModal
				open={open}
				setOpen={(bool: boolean) => setOpen(bool)}
			/>
			<Grid item lg={3} md={3} sm={6} mr={2}>
				<Card>
					<CardContent>
						<Heading title='Профиль' />
						<Box display="flex" flexDirection="column">
							<form onSubmit={handleSubmit(onSubmit)}>
								<AccountDataFields
									type={type}
									formState={formState}
									register={register}
									isPasswordRequired
								/>
								<Box display="flex" flexDirection="column">
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
										onClick={() => setOpen(true)}
									>
										Изменить пароль
									</Button>
									<Button
										type='submit'
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
									>
										Обновить
									</Button>
								</Box>
							</form>
						</Box>
					</CardContent>
				</Card>
				{/* */}
			</Grid>
		</Grid>
	)
}

export default Profile
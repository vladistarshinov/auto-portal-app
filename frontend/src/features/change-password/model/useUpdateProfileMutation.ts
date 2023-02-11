import { ProfileService } from "@/entities/profile/model/profile.service";
import { IProfileInput } from "@/entities/profile/ui/profile.interface";
import { toastError } from "@/shared/libs/toast-error";
import { useMutation } from "@tanstack/react-query";
import { toastr } from "react-redux-toastr";

export const useUpdateProdileMutation = (user: any, newPassword: string) => {
	const { mutateAsync } = useMutation(
		['update profile'],
		(data: IProfileInput) => ProfileService.updateProfile({ email: user!.email, password: newPassword }),
		{
			onSuccess() {
				toastr.success('Update profile', 'update was successful');
			},
			onError(error) {
				toastError(error, 'Update profile');
			},
		}
	)

	return { mutateAsync }
};
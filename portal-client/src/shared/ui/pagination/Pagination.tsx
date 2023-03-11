import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import {Stack, Pagination } from "@mui/material"
import { IMeta } from "@/shared/api/types/meta.types"

interface IPagination<T> {
	list: T
	page: number
	setPage: Dispatch<SetStateAction<number>>
}

const PaginationWrapper = <T extends IMeta>(
	{list, page, setPage}: IPagination<T>
):  JSX.Element | null => {
	return (
		list.total > list.per_page ? (
			<Stack display='flex' justifyContent='center' spacing={2}>
				<Pagination
					count={Math.ceil(list.total / list.per_page)}
					page={page}
					onChange={(e: ChangeEvent<unknown>, value: number) => setPage(value)}
				/>
			</Stack>
		) : null
	)
}

export default PaginationWrapper
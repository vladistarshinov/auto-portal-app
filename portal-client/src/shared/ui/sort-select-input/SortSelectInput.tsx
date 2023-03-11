import { Dispatch, FC, SetStateAction } from "react"
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import { EnumAutoSort, EnumAutoSortTitle } from "@/entities/auto/model/auto.types"

interface ISortSelectDropdown {
	sortType: EnumAutoSort
	setSortType: Dispatch<SetStateAction<EnumAutoSort>>
}

const SortSelectDropdown: FC<ISortSelectDropdown> = ({ sortType, setSortType }) => {
	return (
		<Box>
			<Select
				value={sortType}
				onChange={(e: SelectChangeEvent) => setSortType(e.target.value as EnumAutoSort)}
				labelId="demo-select-small"
				id="demo-select-small"
			>
				{(
					Object.keys(EnumAutoSort) as Array<keyof typeof EnumAutoSort>
				).map(key => {
					return (
						<MenuItem key={EnumAutoSort[key]} value={EnumAutoSort[key]}>
							{EnumAutoSortTitle[key]}
						</MenuItem>
					)
				})}
			</Select>
		</Box>
	)
}

export default SortSelectDropdown

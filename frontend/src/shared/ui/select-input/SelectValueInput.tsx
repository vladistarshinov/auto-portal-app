import { FC, useState } from "react"
import {
	Select,
	InputBase,
	MenuItem,
	Box,
	FormControl,
	SelectChangeEvent
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { carBodies, carBrands, carTransmissions } from "@/shared/helpers/cars-data"

interface ISelectInput {
	value: string
	onChange: (e: SelectChangeEvent) => void
	field: string
	title: string
}

const CustomSelectInput: FC<ISelectInput> = ({ value, onChange, field, title }) => {
	const [content, setContent] = useState(null)
	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		"& .MuiInputBase-input": {
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: "1px solid #ced4da",
			fontSize: 16,
			padding: "10px 26px 10px 12px",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
			"&:focus": {
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	}))


	return (
		<Box display='flex' flexDirection='column'>
			<small style={{ color: '#fff' }}>{title}</small>
			<FormControl sx={{ minWidth: 200 }} size="small">
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					value={value}
					onChange={onChange}
					input={<BootstrapInput />}
				>
					<MenuItem value="">
						<em>Сбросить</em>
					</MenuItem>
					{field === 'brand' &&
						carBrands.map(b =>
							<MenuItem key={b.slug} value={b.title}>{b.title}</MenuItem>
					)}
					{field === 'transmission' &&
						carTransmissions.map(t =>
							<MenuItem key={t.slug} value={t.title}>{t.title}</MenuItem>
					)}
					{field === 'body' &&
						carBodies.map(cb =>
							<MenuItem key={cb.slug} value={cb.title}>{cb.title}</MenuItem>
					)}
				</Select>
			</FormControl>
		</Box>
	)
}

export default CustomSelectInput

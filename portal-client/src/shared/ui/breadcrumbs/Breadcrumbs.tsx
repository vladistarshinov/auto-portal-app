import { FC } from "react"
import { Box, Breadcrumbs, Link } from "@mui/material"

interface INavElements {
	title: string
	url?: string
}

const BreadCrumbs: FC<{navElements: INavElements[]}> = ({ navElements }) => {
	return (
		<Box role="presentation" sx={{ my: 3 }}>
			<Breadcrumbs aria-label="breadcrumb">
				{navElements !== [] &&
					navElements.map((elem, idx) => (
						<Link
							underline="hover"
							color={
								idx === navElements.length - 1 ? "text.primary" : "inherit"
							}
							href={elem.url ? `${elem.url}` : "/"}
						>
							{elem.title}
						</Link>
					))}
			</Breadcrumbs>
		</Box>
	)
}

export default BreadCrumbs
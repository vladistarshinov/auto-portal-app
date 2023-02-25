import { FC } from "react"
import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface IModalWrapper {
	open: boolean
	setOpen: any
	title: string
}

const ModalWrapper: FC<IModalWrapper> = ({ open, setOpen, title, children }) => {

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{
					"& .MuiPaper-rounded": {
						borderRadius: 3,
					},
					"& .MuiDialog-paper": {
						"&::-webkit-scrollbar": {
							width: 6,
							height: 6,
						},
						"&::-webkit-scrollbar-button": {
							backgroundColor: "transparent",
						},
						"&::-webkit-scrollbar-track-piece": {
							backgroundColor: "transparent",
						},
						"&::-webkit-scrollbar-thumb:vertical": {
							borderRadius: 16,
							height: 4,
							backgroundColor: "#C0C0C0",
						},
						"&::-webkit-scrollbar-thumb:horizontal": {
							borderRadius: 16,
							height: 4,
							backgroundColor: "#C0C0C0",
						},
					},
				}}
			>
				<Box sx={{ padding: 1 }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							textAlign: "center",
							position: "relative",
							paddingTop: 1,
						}}
					>
						<DialogTitle
							sx={{
								padding: "12px 16px",
							}}
						>
							<IconButton
								aria-label="close"
								onClick={() => handleClose()}
								sx={{
									position: 'absolute',
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
							<Typography
								variant="h4"
								sx={{
									fontSize: 22,
									lineHeight: "28px",
								}}
							>
								{title}
							</Typography>
						</DialogTitle>
					</Box>
					<DialogContent sx={{ padding: "0 16px" }}>{children}</DialogContent>
				</Box>
			</Dialog>
		</>
	)
}

export default ModalWrapper
import { FC } from "react"
import { Button } from "@mui/material"
import { usePrintInvoice } from "../usePrintInvoice"

const PrintInvoiceButton: FC<{ order: any }> = ({order}) => {
	const {download} = usePrintInvoice(order)

	return (
		<Button sx={{ mt: 2 }} variant='outlined' onClick={download}>Распечатать</Button>
	)
}

export default PrintInvoiceButton
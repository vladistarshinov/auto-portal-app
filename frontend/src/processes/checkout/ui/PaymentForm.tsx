import { useCheckout } from "@/processes/checkout/model/useCheckout";
import { useActions } from "@/shared/hooks/useActions";
import CheckoutSteps from "@/widgets/chechout-steps/CheckoutSteps";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const PaymentForm: FC = () => {

	const router = useRouter()
	const {savePaymentMethod} = useActions()
	const {paymentMethod: payment} = useCheckout()
	const [paymentMethod, setPaymentMethod] = useState("card");

	const submitHandler = () => {
		savePaymentMethod(paymentMethod)
		router.push("/placeorder");
	};

	return (
			<>
				<Box>
					<FormControl
						component="fieldset"
						onChange={(e: any) => {}}
					>
						<FormLabel component="legend">Выберите способ оплаты</FormLabel>
						<RadioGroup
							aria-label="gender"
							defaultValue={paymentMethod}
							name="radio-buttons-group"
						>
							<FormControlLabel
								value="cash"
								control={<Radio />}
								label="Наличные"
							/>
							<FormControlLabel
								value="card"
								control={<Radio />}
								label="Кредитная карта"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
				<Button
					variant="outlined"
					sx={{ mt: 3 }}
					color="inherit"
					onClick={submitHandler}
				>
					<Link sx={{ textDecoration: 'none', color: 'black' }}>
						Продолжить
					</Link>
				</Button>
			</>
	);
};

export default PaymentForm;
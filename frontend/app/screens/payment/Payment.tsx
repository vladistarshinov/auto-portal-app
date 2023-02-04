import CheckoutSteps from "@/components/chechout-steps/CheckoutSteps";
import { useActions } from "@/hooks/useActions";
import { useOrder } from "@/hooks/useOrder";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const Payment: FC = () => {

	const router = useRouter()
	const {savePaymentMethod} = useActions()
	const {paymentMethod: payment} = useOrder()
	const [paymentMethod, setPaymentMethod] = useState("card");

	const submitHandler = () => {
		savePaymentMethod(paymentMethod)
		router.push("/placeorder");
	};

	return (
		<Box flexDirection={"column"} marginX={10}>
			<CheckoutSteps currentStep={1} />
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Оплата
			</Typography>
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
		</Box>
	);
};

export default Payment;

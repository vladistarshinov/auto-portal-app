import CheckoutSteps from "@/components/chechout-steps/CheckoutSteps";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Typography } from "@mui/material";
import { FC, useState } from "react";

const Payment: FC = () => {


	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const submitHandler = (e: any) => {
		e.preventDefault();
		//dispatch
		//history.push("/placeorder");
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
						defaultValue="female"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="PayPal"
							control={<Radio />}
							label="PayPal"
						/>
						<FormControlLabel
							value="Кредитная карта"
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
			>
				<Link sx={{ textDecoration: 'none', color: 'black' }} href={'/placeorder'}>
					Продолжить
				</Link>
			</Button>
		</Box>
	);
};

export default Payment;

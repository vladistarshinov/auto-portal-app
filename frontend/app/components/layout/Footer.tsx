import { FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Footer: FC = () => {
	const CustomizedFooter = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    background-color: #f8f9fa;
    border-top: 0.1rem rgba(0, 0, 0, 0.05) solid;
    color: rgba(0, 0, 0, 0.5);
  `;

	return (
		<CustomizedFooter>
			<Container>
				<Box sx={{ textAlign: "center", py: 1 }}>
					Copyright &copy; IGadgetShop
				</Box>
			</Container>
		</CustomizedFooter>
	);
};

export default Footer;
import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../product-card/ProductCard";
import Heading from "@/shared/ui/heading/Heading";

const ProductList: FC<{products: any}> = ({ products }) => {
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Все товары'></Heading>
			</Box>
			<Box>
				{products?.res?.map((product: any) => (
					<Grid
						item
						display="inline-grid"
						container
						direction="row"
						key={product._id}
						xs={12}
						sm={6}
						md={6}
						lg={4}
						xl={3}
					>
						<ProductCard product={product} />
					</Grid>
				))}
			</Box>
		</>
	);
};

export default ProductList;

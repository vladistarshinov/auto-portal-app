import {FC, useState} from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { genEndOfNoun } from "@/utils/gen-end-of-noun";
import Image from 'next/image';
import Rating from "@/shared/ui/rating/Rating";

const ProductCard: FC<{ product: any }> = ({ product }) => {

	return (
		<Card sx={{ my: 3, mx: 2, cursor: 'pointer' }}>
			<Link href={`/products/${product.slug}`}>
				<Box sx={{ width: '200px', height: '200px', position: 'relative', margin: '1rem auto' }}>
					<Image
						layout='fill'
						draggable={false}
						priority
						src={product.imageUrl}
						alt={product.title}
					/>
				</Box>
			</Link>
			<CardContent
				sx={{
					padding: "6px",
					height: "40px",
				}}
			>
				<Typography
					sx={{ textAlign: "center" }}
					variant="h5"
					color="text.muted"
				>
					{product.title}
				</Typography>
			</CardContent>
			<CardActions sx={{ flexDirection: "column" }} disableSpacing>
				<Box display="inline-flex" alignItems="center">
					<Rating value={product.rating} />
					<Typography sx={{ ml: 2 }} variant="body2">
						{product.countOfReviews}{" "}
						{genEndOfNoun(product.countOfReviews, "отзыв", "отзыва", "отзывов")}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
					<Typography variant="h6" sx={{ textDecoration: 'line-through' }}>{product.oldPrice} RUB</Typography>
					<Typography variant="h5">{product.price} RUB</Typography>
				</Box>
			</CardActions>
		</Card>
	);
};

export default ProductCard;

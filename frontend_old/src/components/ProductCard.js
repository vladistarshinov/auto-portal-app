import * as React from "react";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "../ui/components/Rating";
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ my: 3, mx: 2 }}>
      <Link href={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt="Paella dish"
        />
      </Link>
      <CardContent
        sx={{
          padding: "6px",
          height: "60px",
        }}
      >
        <Typography
          sx={{ textAlign: "center" }}
          variant="body1"
          color="text.muted"
        >
          {product.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: "column" }} disableSpacing>
        <Typography variant="h5">{product.price} $</Typography>
        <Box display="inline-flex" alignItems="center">
          <Rating value={product.rating} />
          <Typography sx={{ ml: 2 }} variant="body2">
            {product.numReviews}{" "}
            {genEndOfNoun(product.numReviews, "отзыв", "отзыва", "отзывов")}
          </Typography>
          <Hidden mdDown>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Hidden>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;

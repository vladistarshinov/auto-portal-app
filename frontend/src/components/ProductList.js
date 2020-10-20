import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const ProductList = ({ product }) => {

    const productNameLink = {
        color: '#203040', 
        textDecoration: 'none'
    };

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>

            <Card.Body>
                <Link className="text-center" style={productNameLink} to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="d-inline-flex">
                    <Rating 
                        value={product.rating}
                    />
                    <span className="reviews">{product.numReviews} отзывов</span>
                </Card.Text>

                <Card.Text as="h4" className="text-center">
                    {product.price} $
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductList;

import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {

    const productNameLink = {
        color: '#203040', 
        textDecoration: 'none'
    };

    const reviews = {
        marginLeft: '.25rem'
    };

    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </a>

            <Card.Body>
                <a style={productNameLink} href={`/product/${product._id}`} className="text-center">
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="div" className="d-inline-flex">
                    <Rating 
                        value={product.rating}
                    />
                    <span style={reviews}>{product.numReviews} отзывов</span>
                </Card.Text>

                <Card.Text as="h4" className="text-center">
                    {product.price} $
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;

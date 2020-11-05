import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import styled from 'styled-components';

const ProductList = ({ product }) => {

    const productNameLink = {
        color: '#203040', 
        textDecoration: 'none'
    };

    const ProductName = styled.strong`
        font-size: 0.9rem;
    `;

    const Reviews = styled.span`
        margin-left: 0.25rem;
    `;

    return (
        <Card className="my-3 p-3 rounded d-flex align-center">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>

            <Card.Body>
                <Link className="text-center" style={productNameLink} to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <ProductName>{product.name}</ProductName>
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="d-inline-flex">
                    <Rating 
                        value={product.rating}
                    />
                    <Reviews>{product.numReviews} {genEndOfNoun(product.numReviews, "отзыв", "отзыва", "отзывов")}</Reviews>
                </Card.Text>

                <Card.Text as="h4" className="text-center p-3">
                    {product.price} $
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductList;

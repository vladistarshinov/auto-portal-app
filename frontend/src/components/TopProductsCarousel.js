import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../ui/components/Loader';
import Message from './Message';
import { listOfTopProduct } from '../redux/actions/product.actions';
import styled from 'styled-components';

const TopProductsCarousel = () => {
    const dispatch = useDispatch();

    const productTop = useSelector(state => state.productTop);
    const { loading, products, error } = productTop;

    useEffect(() => {
        dispatch(listOfTopProduct());
    }, [dispatch]);

    const CarouselElement = styled.div`
        display: flex;
        justify-content: center;
        & .carousel {
            &-item-next,
            &-item-prev,
            &-item.active {
                display: flex;
            }
            &-caption {
                position: absolute;
                top: 0;
    
                h4 {
                    color: #fff;
                }
            }
        }
    `;

    const CarouselImage = {
        height: '300px',
        padding: '40px',
        margin: '40px',
        borderRadius: '50%'
    };

    return (
        loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
            <Carousel pause="hover" className="bg-dark">
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <CarouselElement>
                                <Image style={CarouselImage} src={product.image} alt={product.name} fluid />
                                {/* <CarouselElement> */}
                                    <Carousel.Caption className="carousel-caption">
                                        <h4>{product.name} (${product.price})</h4>
                                    </Carousel.Caption>
                                {/* </CarouselElement> */}
                            </CarouselElement>
                        </Link>
                    </Carousel.Item>
                ))};
            </Carousel>
        )
    );
};

export default TopProductsCarousel;
import React from 'react';
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";

const Cart = ({ match, history }) => {

    const productId = match.params.id;

    const backToDetailPageAction = () => {
        history.push(`/product/${productId}`);
    }

    return (
        <>
            <Button className="btn btn-light my-3 text-capitalize" onClick={backToDetailPageAction}>
                <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                Назад
            </Button>
            <Row>
                
            </Row>
        </>
    );
};

export default Cart;

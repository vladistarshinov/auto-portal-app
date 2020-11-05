import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from 'styled-components';

const Footer = () => {
    const FooterElement = styled.footer`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#f8f9fa;
        border-top: .1rem rgba(0,0,0,.05) solid;
        color: rgba(0,0,0,.5);
    `;

    return (
        <FooterElement>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; IGadgetShop
                    </Col>
                </Row>
            </Container>
        </FooterElement>
    )
};

export default Footer;

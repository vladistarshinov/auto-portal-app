import React from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';

const AuthForm = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
};

export default AuthForm;

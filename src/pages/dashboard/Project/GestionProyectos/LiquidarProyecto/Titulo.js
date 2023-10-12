import React from 'react';
import { Col, Row } from 'react-bootstrap';
const Titulo = (props) => {
    return (
        <>
            {props?.title1?.length > 0 ? (
                <>
                    <Row className="mt-4 bg-info text-white">
                        <Col md={10}>
                            <p className="text-dark-50">{props?.title1}</p>
                        </Col>
                        <Col className="text-left" lg={2}>
                            <p className="text-dark-50 text-center mt-4 fw-bold">$ {props?.title2}</p>
                        </Col>
                    </Row>
                </>
            ) : (
                ''
            )}
        </>
    );
};
export default Titulo;

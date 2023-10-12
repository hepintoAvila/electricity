/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import { Row, Col, } from 'react-bootstrap';
 import { Link } from 'react-router-dom';

const HorizontalSteps = (props) => {
  return (
    <>
       <Row className="justify-content-center">
    <Col lg={7} md={10} sm={11}>
      <div className="horizontal-steps mt-2 mb-2 pb-3">
        <div className="horizontal-steps-content">
          <div className={`step-item ${props.contentInit}`}>
            <Link to={`/dashboard/GestionProyecto/asignarApu?p=${props.idProyecto}`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
              <span
                data-toggle="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="20/08/2018 07:24 PM">
                  {props.titleInit}
              </span>
            </Link>
          </div>
          <div className={`step-item ${props.contentEnd}`}>
            <Link to={`/dashboard/GestionProyecto/asignarApu?p=${props.idProyecto}`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
              <span
                data-toggle="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="21/08/2018 11:32 AM">{props.titleEnd}
              </span>
            </Link>
          </div>
        </div>

        <div className="process-line" style={{ width: '33%' }}></div>
      </div>
    </Col>
  </Row>
  </>
  );
}
export default HorizontalSteps;

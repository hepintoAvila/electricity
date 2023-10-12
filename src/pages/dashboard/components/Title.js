// @flow
import React, { useContext } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { DashboardContext } from '../../../layouts/context/DashboardContext';


/**
 * PageTitle
 */
const Title = ()=> {
  const {itemUrl,itemsmenuprincipal} = useContext(DashboardContext)
      const breadCrumbItems=
        [
          // eslint-disable-next-line no-undef
          { label: itemsmenuprincipal.length===0 ?'Bienvenidos':itemUrl.toUpperCase()+' / '+itemsmenuprincipal.toUpperCase(), path: '/'+itemsmenuprincipal.toUpperCase()+'/'+itemUrl.toUpperCase().replace('/', '')+ '/', active: true },
          // eslint-disable-next-line no-undef
          {title:itemsmenuprincipal.length===0 ?'Bienvenidos, para comenzar seleccione uno de los items del menu principal':itemsmenuprincipal.toUpperCase().replace('/', '')+'-' + itemUrl.toUpperCase().replace('/', '')}
        ]
    return (
        <Row>
            <Col>
                <div className="page-title-box text-black">
                    <div className="page-title-right">
                        <Breadcrumb className="m-0">
                            <Breadcrumb.Item href="/" className="text-black">Inicio</Breadcrumb.Item>
                                    <Breadcrumb.Item active key='1' className="text-black">
                                            {breadCrumbItems[0]?.label}
                                    </Breadcrumb.Item>

                        </Breadcrumb>
                    </div>

                </div>
            </Col>
        </Row>
    );
};

export default Title;

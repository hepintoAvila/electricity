import React from 'react';
import {Card} from 'react-bootstrap';
const TitleProyecto = (props) => {
  //console.log('BasicTable', props)
  return (
    <>
      {props?.title?.length > 0 ?
        <Card>
          <Card.Body>
            <div className="p-1 text-sm-end">
              <span className="btn btn-info mb-0 me-5 p-2">
                <i className="mdi mdi-tray-plus"></i>{props?.title}</span>
            </div>
          </Card.Body>
        </Card> : ''}
    </>)
};
export default TitleProyecto;

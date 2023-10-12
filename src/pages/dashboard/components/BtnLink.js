// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BtnLink = (props) => {
    const q = props?.q?.length > 0 ? props?.q : '';
    const popover = (
        <Popover id={props.key}>
            <Popover.Header as="h3">{props.titulo}</Popover.Header>
            <Popover.Body>{props.descripcion}</Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            {props.permisos === 'S' ? (
                <Link to={`${props?.url}p=${props?.row}${q}`} key={props.key} className="action-icon">
                    <i className={`${props.icon} pt-2`}></i>
                </Link>
            ) : (
                ''
            )}
        </OverlayTrigger>
    );
};
export default BtnLink;

// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { useContext } from 'react';

const BtnActions = (props) => {
    const { itemUrl, itemsmenuprincipal } = useContext(DashboardContext);
    const popover = (
        <Popover id={props.key}>
            <Popover.Header as="h3">{props.titulo}</Popover.Header>
            <Popover.Body>{props.descripcion}</Popover.Body>
        </Popover>
    );
    let Ids = localStorage.getItem('Ids');
    const idUrls = JSON.parse(Ids);
    let q = Number(idUrls?.q) === 0 ? props?.row : idUrls?.q;
    const url = `?p=${props.row}`;
    const urlb = `/dashboard/${itemUrl}/${itemsmenuprincipal}`;
    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props.key}>
            {props.permisos === 'S' ? (
                <Link
                    key={props.key}
                    to={Number(idUrls?.p) > 0 ? url : urlb}
                    className="action-icon "
                    onClick={() => props?.toggleActions(props.row, props.titulo)}>
                    <i className={`${props?.icon} pt-2`}></i>
                </Link>
            ) : (
                ''
            )}
        </OverlayTrigger>
    );
};
export default BtnActions;

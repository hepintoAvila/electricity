// @flow
import { useContext } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

const BtnConsultaLiquidaciones = (props) => {
    const q = props?.q?.length > 0 ? props?.q : props?.row;
    const { pagesInSearch } = useContext(DashboardContext);
    const id = pagesInSearch();
    let str = '#/dashboard/GestionProyecto/ConsultarLiquidaciones?p=';
    const idProyecto = id?.replace(str, '');

    const popover = (
        <Popover id={props.key}>
            <Popover.Header as="h3">{props.titulo}</Popover.Header>
            <Popover.Body>{props.descripcion}</Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            {props.permisos === 'S' ? (
                <Link to={`${props?.url}p=${idProyecto}&q=${q}`} key={props.key} className="action-icon">
                    <i className={`${props.icon} pt-2`}></i>
                </Link>
            ) : (
                ''
            )}
        </OverlayTrigger>
    );
};
export default BtnConsultaLiquidaciones;

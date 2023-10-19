/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useEffect, useState } from 'react';
import { Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
 
type TaskItemProps = {
    task: {
        id: number,
        Descripcion: string,
        status: string,
        Unidad: string,
        image: string,
        idCategoria: string,
        ValorUnitario: number,
        Cantidad: number,
        Codigo: string,
        maj: string,
    },
};

// task item
const TaskItemB = (props: TaskItemProps): React$Element<any> => {
    const valor = props?.task?.ValorUnitario || 0;
    const task = props.task || {};

    const [valorUnitario, setState] = useState(0);
    const [totalValorUnitario, setValorUnitario] = useState(0);


    useEffect(() => {
       
            const total = Number(valorUnitario) * Number(valor);
            setValorUnitario(total);
            props.setCoutPage({ Total: Number(props.currentCout + total) });
            if (valorUnitario >= 2) {
                props.update(task.id, props.idProyecto, total, valorUnitario);
            }

        
    }, [valorUnitario]);

    return (
        <Card className="mb-0 bg-info tex-white">
            <Card.Body className="p-3">
                <p className="mb-0 text-white">
                    <small className="float-end text-white">
                        {'$ '}
                        {task?.ValorUnitario}
                    </small>
                    <br />
                </p>
                <h5 className="mt-2 mb-2 badge bg-primary text-wrap text-capitalize lh-1 text-start">
                    <a href="/" className="card-descripcion text-white">
                        {task?.Descripcion?.toLowerCase().replace(/\w\S*/g, (w) =>
                            w.replace(/^\w/, (c) => c.toUpperCase())
                        )}
                    </a>
                </h5>

                <p className="mb-0">
                    <span
                        className={classNames('badge', {
                            'bg-danger': task.Unidad === 'UN',
                            'bg-secondary': task.Unidad === 'ML',
                            'bg-success': task.Unidad === 'GL',
                        })}
                        style={{ width: '85%' }}>
                        <input
                            value={valorUnitario}
                            name={task.id}
                            placeholder={task.Cantidad}
                            type="number"
                            min={0}
                            key={task.id}
                            onChange={(e) => {
                                setState(e.target.value);
                            }}
                            className="form-control w-auto ms-1"
                        />
                    </span>
                </p>
                <Dropdown className="float-end " align="end">
                    <Dropdown.Toggle variant="link" className="tex-white card-drop arrow-none cursor-pointer p-0 ">
                        <i className="mdi mdi-dots-vertical font-18 tex-white"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={<Tooltip>Editar Productos Asignados a Esta APU</Tooltip>}>
                                <Link
                                    to={`/dashboard/GestionProyecto/EditarProyecto?p=${props.idProyecto}&q=${task.id}`}
                                    className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                                    <i className="mdi mdi-exit-to-app me-1"></i>Editar
                                </Link>
                            </OverlayTrigger>
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={<Tooltip>Eliminar Productos Asignados a Esta APU</Tooltip>}>
                                <button
                                    className="btn btn-link p-0 text-secondary shadow-none px-0 py-2"
                                    id="addNewTodo"
                                    onClick={() => props.borrar(task.id, props.idProyecto)}>
                                    <i className="mdi mdi-delete me-1"></i>Delete
                                </button>
                            </OverlayTrigger>
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                    </Dropdown.Menu>
                </Dropdown>

                <p className="mb-0">
                    <img
                        src={
                            task.image
                                ? task.image
                                : 'https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1'
                        }
                        alt={task.Codigo}
                        className="rounded-circle avatar-lg img-thumbnail w-25"
                        style={{ height: '80px' }}
                    />
                    <span className="align-middle bg-danger text-white">
                        <b>
                            {' $ '}
                            {props.convertirACifraDecimal(Number(totalValorUnitario))}
                        </b>
                    </span>
                </p>
            </Card.Body>
        </Card>
    );
};

export default TaskItemB;

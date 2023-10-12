// @flow
import React from 'react';
import { Card, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';

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
const TaskItem = (props: TaskItemProps): React$Element<any> => {
    const task = props?.task || {};
    props.setDatos(task);

    return (
        <Card className="mb-0">
            <Card.Body className="p-3">
                <p className="mb-0">
                    <small className="float-end text-muted">{task.maj}</small>
                    <br />
                </p>
                <h5 className="mt-2 mb-2 badge bg-primary text-wrap text-capitalize lh-1 text-start">
                    <a href="/" className="card-descripcion">
                        {task.Descripcion.toLowerCase().replace(/\w\S*/g, (w) =>
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
                        })}>
                        {task.Codigo}-{task.id}
                    </span>
                </p>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle
                        variant="link"
                        className="text-muted card-drop arrow-none cursor-pointer p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical font-18"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={<Tooltip>Ver Productos Asignados</Tooltip>}>
                                <button
                                    className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                                    id="addNewTodo"
                                    onClick={() => props.newTask('Pending', 'todoTasks', task.id)}>
                                    <i className="mdi mdi-exit-to-app me-1">Ver Productos</i>
                                </button>
                            </OverlayTrigger>
                        </Dropdown.Item>
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
                    <span className="align-middle">
                        <b>
                            {' $ '}
                            {props?.task?.ValorUnitario}
                        </b>
                    </span>
                </p>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;

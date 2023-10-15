/* eslint-disable react/style-prop-object */
/* eslint-disable no-sequences */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import classNames from 'classnames';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
//import HorizontalSteps from '../../../../components/HorizontalSteps/HorizontalSteps';
import TitleProyecto from '../../../../components/TitleProyect/TitleProyect';
import TaskItem from './Task';
import { convertirACifraDecimal, multiplicar } from '../../../../../../utils/convertirACifraDecimal';
import Pagination from '../Pagination';
import TaskItemB from './TaskItemB';
import VistaPrevia from '../../../GestionPrecios/AnalisisPreciosUnitarios/VistaPrevia';
import { useGestionProyecto } from '../../../../../../hooks/useGestionProyecto';
import Swal from 'sweetalert2';

// components

type StateType = {
    todoTasks: Array<any>,
    inprogressTasks: Array<any>,
    totalTasks: number,
    newTaskModal: boolean,
    newTask: any,
    currentCout: any,
};
const defaultAvatar = 'https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1';
// kanban
const Kanban = (props): React$Element<React$FragmentType> => {
    const { setItemsUpdate, add, update, borrar, pagesInSearch } = useContext(DashboardContext);
    const idProyecto = props?.data?.data?.idProyecto || 0;
    const task = props?.data?.data?.ApusAsignadas || [];
    const ApusNoAsignadas = props?.data?.data?.ApusNoAsignadas || [{}];
    const DatosProyect = props?.data?.data?.DatosProyect || [{}];
    const { query, itemsGestionarProyecto } = useGestionProyecto();
    const [currentCout, setCoutPage] = useState({ Total: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(200);
    const [searchTerm, setSearchTerm] = useState('');
    const [datos, setDatos] = useState([]);
    console.log(datos)
    //const [subrows, setsubRows] = useState([]);
    const [subNumRows, setsubNumRows] = useState([]);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;

    const [state, setState] = useState<StateType>({
        todoTasks: ApusNoAsignadas,
        inprogressTasks: task,
        totalTasks: task.length + ApusNoAsignadas.length,
        newTaskModal: false,
        newTask: null,
    });

    /**
     * Toggles the new task modal
     */
    const toggleNewTaskModal = () => {
        setState({
            ...state,
            newTaskModal: !state.newTaskModal,
        });
    };

    /**
     * Creates new empty task with given status
     */
    const newTask = (status, queue, id) => {
        const datosTask = state?.todoTasks.filter((t) => t.id === id);
        //setsubRows(datosTask.subRows)
        setsubNumRows(datosTask[0]?.subRows?.datos?.length);
        if (id > 0)
            setState({
                ...state,
                newTask: { dueDate: new Date(), image: defaultAvatar, status: status, queue: queue, id: id },
                newTaskModal: true,
                datosTask: datosTask[0]?.subRows,
            });
        setItemsUpdate(datosTask[0]?.subRows);
    };

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};

        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    /**
     * Gets the list
     */
    const getList = (id) => state[id];

    /**
     * On drag end
     */
    const extraerNumero = (cadena) => {
        // Utilizamos una expresión regular para buscar el número después de un prefijo que termine en "-"
        const regex = /SA(\d+)-/;
        const resultado = cadena.match(regex);
      
        if (resultado && resultado[1]) {
          // El número se encuentra en la posición 1 del resultado
          const numero = resultado[1];
          return numero;
        } else {
          // Si no se encuentra ningún número después de un prefijo que termine en "-", retornamos null
          return null;
        }
      }
 
 
      
      
      
      
    const onDragEnd = (result) => {
        
        const { source, destination } = result;
       // const lista = [...state]
        //const datosTask = lista?.filter((t) => t.id === source.droppableId);
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList(source.droppableId), source.index, destination.index);

            let localState = { ...state };

            localState[source.droppableId] = items;
            setState(localState);
        } else {
            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
            const localState = { ...state, ...result };
            const cadena = state?.todoTasks[source?.index]?.Descripcion
            const numeroExtraido = extraerNumero(cadena);
            //console.log('result',numeroExtraido,cadena)
            setState(localState);
            add(numeroExtraido, idProyecto);
        }
    };
    const currentTasks = state.todoTasks?.slice(indexOfFirstTask, indexOfLastTask);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredTasks = currentTasks.filter((task) => {
        const Descripcion = task?.Descripcion?.toLowerCase();
        const Codigo = task?.Codigo?.toLowerCase();
        return Descripcion.includes(searchTerm.toLowerCase()) || Codigo.includes(searchTerm.toLowerCase());
    });

    const cambiarEstado = () => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/asignarApu?p=';
        const idProyecto = id?.replace(str, '');
        query('GestionProyecto', 'LiquidarProyecto', [
            {
                opcion: 'cambiarEstado',
                obj: 'LiquidarProyecto',
                idProyecto: idProyecto,
            },
        ]);
    };

    useEffect(() => {
        if (itemsGestionarProyecto[0]?.status === '202') 
        Swal.fire('' + itemsGestionarProyecto[0].menssage + '');
    }, [itemsGestionarProyecto]);

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <TitleProyecto
                        title={DatosProyect[0]?.Nombre ? DatosProyect[0]?.Nombre : 'Ingrese nuevamente a esta opcion'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="board">
                            {/* todo */}
                            <Row className="overflow-auto">
                                <Droppable droppableId="todoTasks">
                                    {(provided, snapshot) => (
                                        <>
                                            <div>
                                                <div className={classNames('mt-2 mb-3')}>
                                                    <span className="d-flex align-items-center">
                                                        
                                                        {/* Search :{' '} <input
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            placeholder={`${state.todoTasks.length} registros...`}
                                                            className="form-control w-auto ms-1"
                                    />*/}
                                                    </span>
                                                </div>
                                                <h5 className="mt-0 task-header">TODO ({state.todoTasks.length})</h5>
                                            </div>
                                            <div className="tasks" ref={provided.innerRef}>
                                                {state.todoTasks?.length === 0 && (
                                                    <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                                                )}
                                                {filteredTasks?.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <TaskItem
                                                                    task={item}
                                                                    setDatos={setDatos}
                                                                    convertirACifraDecimal={convertirACifraDecimal}
                                                                    newTask={newTask}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}

                                                {provided.placeholder}
                                            </div>
                                            <Pagination
                                                tasksPerPage={tasksPerPage}
                                                totalTasks={ApusNoAsignadas.length}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}></Pagination>
                                        </>
                                    )}
                                </Droppable>
                            </Row>
                            <Row className="overflow-auto">
                                {/* in progress */}
                                <Droppable droppableId="inprogressTasks">
                                    {(provided, snapshot) => (
                                        <>
                                            <div>
                                                <span className="d-flex align-items-center bg-primary pt-2">
                                                    <h5 className="mt-0 task-header text-uppercase">
                                                        {state.inprogressTasks?.length-1 === 0 ? (
                                                            <p className="text-center text-muted pt-2 mb-0">
                                                                HAGA CLIK SOTENIDO EN LA TARJETA DE LA APU Y ARRASTRELA
                                                                HACIA ABAJO,AL AREA GRIS, PARA ADJUNTARLA AL PROYECTO
                                                            </p>
                                                        ) : (
                                                            `+(${state.inprogressTasks?.length-1})  Total Seleccionadas:
                                                            `
                                                        )}
                                                    </h5>
                                                </span>
                                            </div>
                                            <div
                                                ref={provided.innerRef}
                                                className="tasks bg-secondary w-auto shadow-none h-auto">
                                                {state.inprogressTasks?.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <TaskItemB
                                                                    task={item}
                                                                    idProyecto={idProyecto}
                                                                    borrar={borrar}
                                                                    newTask={newTask}
                                                                    update={update}
                                                                    setCoutPage={setCoutPage}
                                                                    currentCout={currentCout.Total}
                                                                    convertirACifraDecimal={convertirACifraDecimal}
                                                                    multiplicar={multiplicar}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </>
                                    )}
                                </Droppable>
                            </Row>
                        </div>
                    </DragDropContext>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <Button variant="primary" type="submit" disabled={false} onClick={() => cambiarEstado()}>
                        CAMBIAR ESTADO DEL PROYECTO
                    </Button>
                </Col>{' '}
                <Col sm={9}></Col>
            </Row>
            {/* new task model */}
            {state.newTask && (
                <Modal show={state.newTaskModal} onHide={toggleNewTaskModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <h4 className="modal-description">{state?.datosTask[0]?.Descripcion}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {subNumRows > 0 ? (
                            <VistaPrevia />
                        ) : (
                            <div class="alert alert-danger" role="alert">
                                Esta APU un no tiene información asignada!
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </React.Fragment>
    );
};

export default Kanban;

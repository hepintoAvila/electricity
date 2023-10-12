import { Modal, Pagination, Row } from 'react-bootstrap';
import BtnActions from '../BtnActions';
import React from 'react';
import BtnLink from '../BtnLink';

const BtnSeccionAction = (props, children) => {
    const isbtnLink = props?.obj?.isbtnLink || 'N';
    //const itemsmenuprincipal = props?.obj?.itemsmenuprincipal || '';
    const descripcionbtnLink = props?.obj?.descripcionbtnLink || '';
    const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';
    const titulobtnLink = props?.obj?.titulobtnLink || '';
    const urlbtnLink = props?.obj?.urlbtnLink || '';
    const AddPermiso = props?.obj?.AddPermiso || 'N';
    const ListVista = props?.obj?.ListVista || 'N';
    //const EliminarSubItems = props?.obj?.EliminarSubItems || 'N';

    return (
        <React.Fragment>
            <Modal show={props?.obj?.open} onHide={props?.obj?.toggleSignUp}>
                <Modal.Body>{props?.children ? props?.children : null}</Modal.Body>
            </Modal>
            <Row>
                <Pagination className="pagination-rounded mx-auto" size="sm">
                    <Pagination.Item>
                        {props?.obj?.localPermiso?.update === 'S' ? (
                            <BtnActions
                                permisos={'S'}
                                key={`1${props?.obj?.row}`}
                                toggleActions={props?.obj?.toggleSignUp}
                                row={props?.obj?.row}
                                titulo={'EDITAR'}
                                descripcion={`Editar ${descripcionbtnaction}`}
                                icon={'mdi mdi-square-edit-outline'}
                            />
                        ) : (
                            ''
                        )}
                    </Pagination.Item>
                    <Pagination.Item>
                        {props?.obj?.localPermiso?.delete === 'S' ? (
                            <BtnActions
                                permisos={'S'}
                                key={`2${props?.obj?.row}`}
                                toggleActions={props?.obj?.eliminar}
                                row={props?.obj?.row}
                                titulo={'ELIMINAR'}
                                descripcion={`Eliminar ${descripcionbtnaction}`}
                                icon={'mdi mdi-delete'}
                            />
                        ) : (
                            ''
                        )}
                    </Pagination.Item>
                    {isbtnLink === 'S' && props?.obj?.localPermiso?.add === 'S' ? (
                        <Pagination.Item>
                            <BtnLink
                                permisos={'S'}
                                key={`3${props?.obj?.row}`}
                                row={props?.obj?.row}
                                url={urlbtnLink}
                                titulo={`${titulobtnLink}`}
                                descripcion={`${descripcionbtnLink}`}
                                icon={'mdi mdi-account-cash'}
                            />
                        </Pagination.Item>
                    ) : (
                        ''
                    )}
                    <Pagination.Item>
                        {AddPermiso === 'S' ? (
                            <BtnActions
                                permisos={'S'}
                                key={`4${props?.obj?.row}`}
                                toggleActions={props?.obj?.toggleSignUp}
                                row={props?.obj?.row}
                                titulo={'ADD'}
                                descripcion={`ADD ${descripcionbtnaction}`}
                                icon={'mdi mdi-plus'}
                            />
                        ) : (
                            ''
                        )}
                    </Pagination.Item>
                    <Pagination.Item>
                        {ListVista === 'S' ? (
                            <BtnActions
                                permisos={'S'}
                                key={`5${props?.obj?.row}`}
                                toggleActions={props?.obj?.toggleSignUp}
                                row={props?.obj?.row}
                                titulo={'VISTA'}
                                descripcion={`VISTA ${descripcionbtnaction}`}
                                icon={'mdi mdi-printer'}
                            />
                        ) : (
                            ''
                        )}
                    </Pagination.Item>
                </Pagination>
            </Row>
        </React.Fragment>
    );
};
export default BtnSeccionAction;

// @flow
import React, { useRef, useEffect, forwardRef, useContext, useState } from 'react';
import { Alert, Button, Form, Pagination } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import { VerticalForm } from '../../../components';
import { queryFormSend } from '../../../redux/actions';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { useGestionFinanciera } from '../../../hooks/useGestionFinanciera';
import FormInput from './FormInput';

// components

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

const FormAdd = (props) => {
    const { setActions, openActions } = useContext(DashboardContext);
    const { query } = useGestionFinanciera();
    const [items, setItems] = useState([
        {
            Descripcion: props?.items?.Descripcion ? props?.items?.Descripcion : '',
            Cantidad: props?.items?.Cantidad ? props?.items?.Cantidad : '',
            ValorUnitario: props?.items?.ValorUnitario ? props?.items?.ValorUnitario : '',
            accion: props?.obj?.accion,
            opcion: props?.obj?.opcion,
            tipo: props?.obj?.tipo,
            id: props?.obj?.id ? props?.obj?.id : '',
        },
    ]);
    const dispatch = useDispatch();
    const { loading, queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    const schemaResolver = yupResolver(yup.object().shape({}));
    const onSubmit = () => {
        dispatch(queryFormSend(...items));
        setTimeout(function () {
            query('GestionFinanciera', 'OrdenCompra', [{ opcion: 'consultar', obj: 'OrdenCompra' }]);
            setActions(openActions);
        }, 2000);
    };
    return (
        <>
            {queryForm ? (
                <Redirect to={`${props?.obj?.urlBase}${props?.obj?.tipo}${props?.obj?.urlVariables}`}></Redirect>
            ) : null}
            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            <div className="table-responsive">
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <table class="table table-primary">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Valor</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    <Form.Group className="mb-3" controlId="Cantidad">
                                        <Form.Control
                                            required
                                            type="number"
                                            name="Cantidad"
                                            placeholder="Digite la Cantidad"
                                            value={items[0]?.Cantidad}
                                            onChange={(e) => setItems([{ ...items[0], Cantidad: e.target.value }])}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, digite el Telefono.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td colspan="2">
                                    <Form.Group className="mb-3" controlId="ValorUnitario">
                                        <Form.Control
                                            required
                                            type="number"
                                            name="ValorUnitario"
                                            placeholder="Digite el Valor Unitario"
                                            value={items[0]?.ValorUnitario}
                                            onChange={(e) => setItems([{ ...items[0], ValorUnitario: e.target.value }])}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, digite el Valor Unitario.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <Form.Group className="mb-3" controlId="Descripcion">
                                        <FormInput
                                            label="Descripción"
                                            type="textarea"
                                            name="Descripcion"
                                            containerClass={'mb-3'}
                                            key="Descripcion"
                                            value={items[0]?.Descripcion}
                                            onChange={(e) => setItems([{ ...items[0], Descripcion: e.target.value }])}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, digite la Descripcion.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}></td>
                                <td>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        Adjuntar
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </VerticalForm>
            </div>
        </>
    );
};
type TableProps = {
    isSearchable?: boolean,
    isSortable?: boolean,
    pagination?: boolean,
    isSelectable?: boolean,
    isExpandable?: boolean,
    isVisible?: boolean,
    numtable?: number,
    pageSize: number,
    columns: Array<any>,
    data: Array<any>,
    searchBoxClass?: string,
    tableClass?: string,
    theadClass?: string,
    sizePerPageList: {
        text: string,
        value: number,
    }[],
};

const Table = (props: TableProps): React$Element<React$FragmentType> => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const numtable = props['numtable'] || '0';
    //const IdItems = props['IdItems'] || '';
    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;
    const table = `Table_Export_${numtable}`;

    return (
        <>
            <div class="col-12 mb-3">
                <FormAdd obj={props?.obj} />
            </div>

            <div className="row justify-content-start">
                <div class="col-8">
                    {isSearchable && (
                        <GlobalFilter
                            preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                            globalFilter={dataTable.state.globalFilter}
                            setGlobalFilter={dataTable.setGlobalFilter}
                            searchBoxClass={props['searchBoxClass']}
                        />
                    )}
                </div>
            </div>

            <div className="table-responsive">
                <table
                    id={table}
                    {...dataTable.getTableProps()}
                    className={classNames('table table-striped', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, i) => {
                            dataTable.prepareRow(row);
                            //console.log(i);

                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={classNames(
                                        Number(row?.original?.id) > 0 ? '' : 'bg-success text-white'
                                    )}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

export default Table;

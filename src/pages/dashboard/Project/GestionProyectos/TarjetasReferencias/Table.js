/* eslint-disable array-callback-return */
// @flow
import React from 'react';
import { Col, Row } from 'react-bootstrap';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

// components
import Drop from './Drop';
import Basic from './Basic';
import Pagination from './Pagination';


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

type TableProps = {
  isSearchable?: boolean,
  isSortable?: boolean,
  pagination?: boolean,
  isSelectable?: boolean,
  isExpandable?: boolean,
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

  const dataTable = useTable(
    {
      columns: props['columns'],
      data: props['data'],
      initialState: { pageSize: props['pageSize'] || 4 },
    },
    isSearchable && useGlobalFilter,
    isSortable && useSortBy,
    isExpandable && useExpanded,
    pagination && usePagination,
    isSelectable && useRowSelect
  );
  //let rows = pagination ? dataTable.page : dataTable.rows;

  //console.log('dataTable',rows)
  return (
    <>
      {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={props['searchBoxClass']}
        />
      )}

      {pagination &&
        <>
          <Row>
            <Col lg={5}> <Drop rows={dataTable} data={props.data} /></Col><Col lg={7}> <Basic /></Col>
          </Row>
          <Row>
            <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />
          </Row></>
      }
    </>
  );
};

export default Table;

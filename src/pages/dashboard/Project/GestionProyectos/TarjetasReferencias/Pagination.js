// @flow
import React from 'react';

const Pagination = ({ tasksPerPage, totalTasks, currentPage, onPageChange ,children}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            {pageNumber<11?
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>:''}

          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Pagination;

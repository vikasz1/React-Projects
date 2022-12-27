import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage)
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li key={page} className={currentPage===page ? "page-item active":"page-item"}>
              <a className="page-link" onClick={() => props.onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

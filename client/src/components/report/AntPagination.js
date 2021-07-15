import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

const AntPagination = ({ count, setPage }) => {
  const onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
  };

  return (
    <Pagination
      defaultCurrent={1}
      defaultPageSize={4}
      total={count}
      showQuickJumper={true}
      onChange={onPageChange}
    />
  );
};

AntPagination.propTypes = {};

export default AntPagination;

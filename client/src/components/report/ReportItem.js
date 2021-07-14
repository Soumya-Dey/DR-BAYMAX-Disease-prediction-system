import React from 'react';
import PropTypes from 'prop-types';

const ReportItem = ({ report }) => {
  return (
    <div className='report-item'>
      <p className='x-small'>
        {new Date(report.created).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
        })}
      </p>
    </div>
  );
};

ReportItem.propTypes = {};

export default ReportItem;

import React from 'react';
import PropTypes from 'prop-types';

import symptomObj from '../../utils/symptomObject';

const ReportItem = ({ report }) => {
  return (
    <div className='report-item'>
      <div className='top-div'>
        <p className='x-small'>
          {new Date(report.created).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
          })}
        </p>
        <a
          className='x-small'
          title='Search on Google'
          target='_blank'
          href={`https://www.google.com/search?q=${report.disease.toLowerCase()}`}
        >
          <i class='fas fa-external-link-alt ext-link'></i>
        </a>
      </div>
      <p className='lead'>
        <span className='text-primary'>{report.disease}</span> with{' '}
        <span className='text-primary'>
          {Math.floor(+report.probability * 100)}%
        </span>{' '}
        chance
      </p>
      <div className='symp-chosen'>
        {report.symptoms.map((symp, i) => (
          <p key={i}>{symptomObj[symp]}</p>
        ))}
      </div>
    </div>
  );
};

ReportItem.propTypes = {};

export default ReportItem;

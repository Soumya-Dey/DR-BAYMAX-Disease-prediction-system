import React, { Fragment } from 'react';
import loading from './loading.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={loading}
        style={{
          width: '100px',
          margin: '80px auto',
          padding: '14px',
          display: 'block',
          background: '#f9f9f9',
          borderRadius: '50%',
          boxShadow: '0 0 8px 2px rgba(0,0,0,0.2)',
        }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AntSelect from './AntSelect';

const DashboardInput = (props) => {
  const [symptoms, setSymptoms] = useState([]);

  return (
    <div className='input-container'>
      <p className='lead'>Select your symptoms</p>
      <form className='form mb-4' /*onSubmit={(event) => onSubmit(event)}*/>
        <div className='form-group'>
          <AntSelect symptoms={symptoms} setSymptoms={setSymptoms} />
        </div>
        <p className='x-small mb-3'>Note: Select at least 3 symptoms</p>
        <input
          type='submit'
          className='btn btn-outline-x-large '
          value='Continue'
        />
      </form>

      <div className='menu'>
        <a
          className='x-small text-dark'
          //   onClick={logout}
          href='/dashboard'
          title='Logout'
        >
          Diagnose
        </a>
        <a
          className='x-small text-dark'
          //   onClick={logout}
          href='/dashboard'
          title='Logout'
        >
          Browse
        </a>
      </div>
    </div>
  );
};

DashboardInput.propTypes = {};

export default DashboardInput;

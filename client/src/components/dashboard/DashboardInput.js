import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AntSelect from './AntSelect';
import Result from './Result';
import { getPrediction } from '../../actions/prediction';
import { Fragment } from 'react';

const DashboardInput = ({ getPrediction }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [clicked, setClicked] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    getPrediction(symptoms);
    setSymptoms([]);
    if (symptoms.length >= 3) setClicked(true);
  };

  return (
    <div className={`input-container${clicked ? ' result-container' : ''}`}>
      {!clicked ? (
        <Fragment>
          <p className='lead'>Select your symptoms</p>
          <form className='form mb-2' onSubmit={(event) => onSubmit(event)}>
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
        </Fragment>
      ) : (
        <Result setClicked={setClicked} />
      )}
    </div>
  );
};

DashboardInput.propTypes = {
  getPrediction: PropTypes.func.isRequired,
};

export default connect(null, { getPrediction })(DashboardInput);

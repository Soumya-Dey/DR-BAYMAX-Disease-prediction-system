import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clearPrediction } from '../../actions/prediction';
import symptomObj from '../../utils/symptomObject';
import Spinner from '../layouts/Spinner';

const Result = ({
  clearPrediction,
  setClicked,
  prediction: { loading, prediction },
}) => {
  return (
    <Fragment>
      {loading || prediction === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <button
            className='btn btn-light mb-2'
            onClick={() => {
              setClicked(false);
              clearPrediction();
            }}
          >
            Predict Again
          </button>
          <div className='symp-chosen'>
            {prediction.prediction &&
              prediction.prediction.symptoms.map((symp, i) => (
                <p className='mr-05' key={i}>
                  {symptomObj[symp]}
                </p>
              ))}
          </div>
          <div className='prediction my'>
            There is around{' '}
            <span>{Math.floor(+prediction.prediction.probability * 100)}%</span>{' '}
            chance that you have <span>{prediction.prediction.disease}</span>{' '}
            <a
              className='small'
              title='Search on Google'
              target='_blank'
              href={`https://www.google.com/search?q=${prediction.prediction.disease.toLowerCase()}`}
            >
              <i className='fas fa-external-link-alt ext-link'></i>
            </a>
          </div>
          <p className='pred-desc mb-2'>
            {prediction.description.length > 230
              ? `${prediction.description.substring(0, 230)}...`
              : prediction.description}
            &nbsp;
            <a
              className='x-small'
              title='Search on Google'
              target='_blank'
              href={`https://www.google.com/search?q=${prediction.prediction.disease.toLowerCase()}`}
            >
              Know more
            </a>
          </p>
          <div>
            <p className='medium text-primary'>Precautions to take</p>
            <div className='precautions'>
              {prediction.prediction &&
                prediction.precautions.map((prec, i) => (
                  <p className='mr' key={i}>
                    {prec}
                  </p>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Result.propTypes = {
  prediction: PropTypes.object.isRequired,
  clearPrediction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  prediction: state.prediction,
});

export default connect(mapStateToProps, { clearPrediction })(Result);

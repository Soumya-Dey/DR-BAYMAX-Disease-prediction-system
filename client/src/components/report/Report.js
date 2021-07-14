import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import ReportItem from './ReportItem';
import { getAllPredictions, clearPrediction } from '../../actions/prediction';

const Report = ({
  clearPrediction,
  getAllPredictions,
  prediction: { loading, predictions },
}) => {
  useEffect(() => {
    clearPrediction();
    getAllPredictions();
  }, [clearPrediction, getAllPredictions]);

  return (
    <div className='dashboard'>
      {loading || predictions === null ? (
        <Spinner />
      ) : predictions.count > 0 ? (
        <Fragment>
          <Link to='/dashboard' className='btn btn-light mb-2'>
            Go Back
          </Link>
          <div>
            {predictions.reports.map((report, i) => (
              <ReportItem report={report} key={i} />
            ))}
          </div>
        </Fragment>
      ) : (
        'No Previous Report found...'
      )}
    </div>
  );
};

Report.propTypes = {
  getAllPredictions: PropTypes.func.isRequired,
  prediction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  prediction: state.prediction,
});

export default connect(mapStateToProps, { clearPrediction, getAllPredictions })(
  Report
);

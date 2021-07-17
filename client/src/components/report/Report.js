import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import ReportItem from './ReportItem';
import AntPagination from './AntPagination';
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

  const [page, setPage] = useState(1);

  return (
    <div className='dashboard'>
      {loading || predictions === null ? (
        <Spinner />
      ) : predictions.count > 0 ? (
        <Fragment className='mb-4'>
          <Link to='/dashboard' className='btn btn-light mb-2'>
            Go Back
          </Link>
          <p className='medium'>
            Your Previous Reports{' '}
            <span className='x-small'>{predictions.count} report(s)</span>
          </p>
          <div className='report-div'>
            {predictions.reports
              .slice((page - 1) * 4, (page - 1) * 4 + 4)
              .map((report, i) => (
                <ReportItem report={report} key={i} />
              ))}
          </div>
          <AntPagination count={predictions.count || 0} setPage={setPage} />
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

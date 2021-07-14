import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardTopBar from '../dashboard/DashboardTopBar';
import { getAllPredictions } from '../../actions/prediction';

const Report = ({
  getAllPredictions,
  auth,
  prediction: { loading, predictions },
}) => {
  useEffect(() => {
    getAllPredictions();
  }, [getAllPredictions]);

  return (
    <Fragment>
      <DashboardTopBar user={auth.user} />
      <Link to='/dashboard' className='btn btn-light mb-2'>
        Go Back
      </Link>
      reports
    </Fragment>
  );
};

Report.propTypes = {
  getAllPredictions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  prediction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  prediction: state.prediction,
});

export default connect(mapStateToProps, { getAllPredictions })(Report);

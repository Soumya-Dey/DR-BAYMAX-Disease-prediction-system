import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import DashboardTopBar from './DashboardTopBar';
import DashboardInput from './DashboardInput';

const Dashboard = ({ auth }) => {
  return auth.loading || auth.user === null || !auth.isAuthenticated ? (
    <Spinner />
  ) : (
    <div className='dashboard'>
      <DashboardTopBar user={auth.user} />
      <DashboardInput />
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';
import icon from '../layouts/icon-rounded.svg';

const DashboardTopBar = ({ user, logout }) => {
  return (
    <div className='dashboard-container'>
      <div className='info-container'>
        <p className='lead m-0'>Hello, {user.name.split(' ')[0]}</p>
        <p className='x-small'>
          {new Date().toLocaleDateString('en-Us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className='logo-container'>
        <div className='logo mb'>
          <img
            src={icon}
            style={{
              width: '60px',
              margin: '0 1rem 0 0',
              display: 'block',
            }}
            alt='Dr. Baymax Icon'
          />
          <p className='medium text-primary m-0'>
            Dr.
            <br />
            Baymax
          </p>
        </div>
        <p className='x-small text-primary'>Your friendly virtual doctor</p>
      </div>

      <div className='actions-container'>
        <Link to='/dashboard' className='medium text-dark' title='Dashboard'>
          <i className='fas fa-home mr-15'></i>
        </Link>
        <Link
          to='/report'
          className='medium text-dark'
          title='Previous Reports'
        >
          <i className='fas fa-history mr-15'></i>
        </Link>
        {/* <Link
          to='/report'
          className='medium text-dark'
          title='Previous Reports'
        >
          <i className='fas fa-user-circle mr-15'></i>
        </Link> */}
        <a
          className='medium text-dark'
          onClick={logout}
          href='/login'
          title='Logout'
        >
          <i className='fas fa-sign-out-alt'></i>
        </a>
      </div>
    </div>
  );
};

DashboardTopBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(DashboardTopBar);

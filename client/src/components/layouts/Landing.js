import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import icon from './icon-rounded.svg';

const Landing = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      {/* <div className='dark-overlay'> */}
      <div className='landing-inner'>
        <img
          src={icon}
          style={{
            width: '86px',
            margin: '0 0 0 0',
            display: 'block',
          }}
          alt='Dr. Baymax Icon'
        />
        <h1 className='large text-light mt-4 hi-text'>👋 Hi</h1>
        <h1 className='x-large text-light'>I'm Dr. Baymax.</h1>
        <p className='lead text-light'>
          Your friendly virtual doctor. How are you feeling today?
        </p>
        <div className='buttons mt-2'>
          <Link
            to='/register'
            className='btn btn-accent btn-large text-light mr'
          >
            Get Started
          </Link>
          <Link to='/login' className='btn btn-light btn-large'>
            Login
          </Link>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

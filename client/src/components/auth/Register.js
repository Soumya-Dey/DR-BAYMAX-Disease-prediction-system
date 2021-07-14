import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  // for email -> {prevData, email: value}
  // for password -> {prevData, password: value}
  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2)
      props.setAlert('Passwords dont match', 'danger');
    else {
      props.register({ name, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='landing'>
        <div className='landing-inner landing-inner-light'>
          <Link to='/' className='btn btn-light mb-2'>
            Go Back
          </Link>
          <h1 className='large text-dark'>Sign Up</h1>
          <p className='lead text-dark'>
            <i className='fas fa-user-circle'></i> &nbsp;Create Your Account
          </p>
          <form className='form' onSubmit={(event) => onSubmit(event)}>
            <div className='form-group'>
              <input
                className='text-dark'
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='text-dark'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='text-dark'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(event) => onChange(event)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                className='text-dark'
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(event) => onChange(event)}
                minLength='6'
              />
            </div>
            <input
              type='submit'
              className='btn btn-primary btn-large'
              value='Register'
            />
          </form>
          <p className='mt text-dark'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

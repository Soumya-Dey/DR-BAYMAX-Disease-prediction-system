import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Landing from './components/layouts/Landing';
import Alert from './components/layouts/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Report from './components/report/Report';
import NotFound from './components/layouts/NotFound';
import PrivateRoute from './components/routes/PrivateRoute';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing} />

            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <section className='div-conatiner '>
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute exact path='/report' component={Report} />
                </section>
                <Route component={NotFound} />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Alert from './components/layouts/Alert';
import NotFound from './components/layouts/NotFound';
import PrivateRoute from './components/routes/PrivateRoute';
import store from './store';
import { setAlert } from './actions/alert';
// import setAuthToken from './utils/setAuthToken';

// if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Landing} />

            <section className='container'>
              <Alert />
              <Switch>
                <PrivateRoute exact path='/dashboard' />
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

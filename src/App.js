import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router/immutable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import './App.scss';

const App = ({ history }) => {
  return <ConnectedRouter history={history}>{Routes}</ConnectedRouter>;
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;

import React from 'react';
import { Container, Form, Button, Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginActions, {
  isLoggingIn,
  getLoginError,
  isLoggedIn,
} from '../Redux/LoginRedux';
import UserActions from '../Redux/UserRedux';
import '../App.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      infoMessage: null,
      isLoggedIn: this.props.isLoggedIn,
    };
  }

  componentDidMount() {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.signOut
    ) {
      this.props.loginReset();
      this.props.usersReset();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = prevState;

    if (
      !nextProps.isLoggingIn &&
      !nextProps.loginError &&
      nextProps.isLoggedIn
    ) {
      newState = {
        ...newState,
        isLoggedIn: true,
      };
    }

    if (nextProps.loginError) {
      let infoMessage = prevState.infoMessage;
      if (nextProps.loginError === 'unauthorizedError') {
        infoMessage = 'Invalid username or password. Please try again';
      }
      newState = {
        ...newState,
        infoMessage,
      };
    }

    return prevState === newState ? null : newState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoggedIn) {
      this.navigateToDashboardScreen();
    }
  }

  navigateToDashboardScreen = () => {
    this.props.history.push('/dashboard');
  };

  clearErrorState = () => {
    this.setState({
      infoMessage: null,
    });
  };

  setErrorMessage = (message: string) => {
    this.setState({
      infoMessage: message,
    });
  };

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.clearErrorState(event.target.value),
    );
  };

  handleLogin = () => {
    const { username, password } = this.state;

    if (username.length > 0 && password.length > 0) {
      this.clearErrorState();
      this.props.loginRequest({ username, password });
    } else {
      this.setErrorMessage('Please enter username and password');
    }
  };

  render() {
    return (
      <Container>
        <div className="Login">
          <Alert show={this.state.infoMessage} variant="danger">
            <p>{this.state.infoMessage}</p>
          </Alert>
          <Col className="justify-content-center">
            <Form.Group controlid="loginFormEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </Form.Group>

            <Form.Group controlid="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>
            <Button variant="dark" onClick={this.handleLogin}>
              Login
            </Button>
          </Col>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggingIn: isLoggingIn(state),
  loginError: getLoginError(state),
  isLoggedIn: isLoggedIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  loginRequest: ({ username, password }) =>
    dispatch(LoginActions.loginRequest({ username, password })),
  loginReset: () => dispatch(LoginActions.loginReset()),
  usersReset: () => dispatch(UserActions.userReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

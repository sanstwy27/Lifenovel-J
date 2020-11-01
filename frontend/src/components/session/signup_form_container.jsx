import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup, login } from '../../actions/session_actions';
import { removeLogin } from '../../actions/login_actions'; 
import SignupForm from './signup_form';

const mapStateToProps = ({ session, errors, ui: {login} }) => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    mobileNumber: ""
  },
  sessionErrors: errors.session,
  currentUser: session.id, 
  loginDemo: login["loginDemo"], 
});

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  removeLoginDemo: () => dispatch(removeLogin())
});

export default withRouter(
  connect( mapStateToProps, mapDispatchToProps )( SignupForm )
);

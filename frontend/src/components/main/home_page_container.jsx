import { connect } from 'react-redux';

import HomePage from './home_page';


const mapStateToProps = ({ session, entities: { users } }, ownProps) => ({
  currentUser: users[session.id]
});

export default connect(
  mapStateToProps,
  null
)(HomePage);

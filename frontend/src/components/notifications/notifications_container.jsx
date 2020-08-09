import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import Notifications from './notifications';

class NotificationsContainer extends React.Component {

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <Notifications
        users={ this.props.users }
        notifications={ this.props.notifications }
        notificationType={ this.props.notificationType }
        message={ this.props.message }
      />
    )
  }
}

const mapStateToProps = ({ entities: { users, userRelationships }, session }) => {
  const notifications = [];
  return {
    currentUser: users[session.id],
    notifications,
    users,
    notificationType: "Notifications",
    message: ""
  }
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: (userIds) => dispatch( fetchUsers(userIds) ),
});

export default connect( mapStateToProps, mapDispatchToProps)( NotificationsContainer );

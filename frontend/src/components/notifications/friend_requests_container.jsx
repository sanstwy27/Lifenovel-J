import React from 'react'; 
import { connect } from 'react-redux';
import { getPendingFriendRequests } from '../../reducers/selectors'; 
import { fetchUsers } from '../../actions/user_actions'; 
import Notifications from './notifications';

class FriendRequestsContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUsers(this.props.notifications.map(rel => rel.user1Id)); 
  }

  componentDidUpdate(prevProps) {
    let missingUsers = []; 
    this.props.notifications.forEach( rq => {
      if ( this.props.users[rq.user1Id] === undefined ) {
        missingUsers.push(rq.user1Id); 
      }
    })
    if ( missingUsers.length > 0 ) {
      prevProps.fetchUsers(missingUsers);     
    }
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
  const notifications = getPendingFriendRequests( session.id, userRelationships ); 
  return {
    currentUser: users[session.id],
    notifications, 
    users,
    message: " wants to be your friend!",
    notificationType: "Friend Requests", 
  }
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: (userIds) => dispatch( fetchUsers(userIds) ), 
});

export default connect( mapStateToProps, mapDispatchToProps)( FriendRequestsContainer );

import React from 'react';
import { Link } from 'react-router-dom';

class FriendIndexItem extends React.Component {

  render() {
    const friend = this.props.friend;
    return (
      <li className="friend">
        <Link to={`/${friend.id}`}>
          <img className="friend-profile-icon" alt="" src={ friend.profilePhoto } />
        </Link>
      </li>
    );
  }

}

export default FriendIndexItem;

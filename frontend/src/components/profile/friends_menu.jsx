import React from 'react';

const FriendsMenu = ({ relType, userRelationship,
  createUserRelationship,
  deleteUserRelationship,
  updateUserRelationship, }) => {

  const userRel = Object.assign({}, userRelationship);

  const addFriend = () => {
    userRel.relType = "pending"
    return (
      <div className="add-friend">
        <button onClick={ () => createUserRelationship(userRel) }>
          <i className="fas fa-user"></i>
          <i className="fas fa-plus"></i>
          <span>Add Friend</span>
        </button>
      </div>
    );
  };

  const removeFriend = () => {
    return (
      <div className="remove-friend">
        <button onClick={ () => deleteUserRelationship(userRelationship.id) } >
          <span>Remove Friend</span>
        </button>
      </div>
    );
  };

  const acceptFriend = () => {
    userRel.relType = "accepted"
    return (
      <div className="accept-friend">
        <button onClick={ () => updateUserRelationship(userRel) }>
          <i className="fas fa-user"></i>
          <i className="fas fa-plus"></i>
          <span>Accept Friend Request</span>
        </button>
      </div>
    );
  };

  const pendingApproval = () => {
    return (
      <div className="pending-approval">
        <button>
          <span>Pending Approval</span>
        </button>
      </div>
    );
  };

  const display = () => {
    switch( relType ) {
      case "none":
        return addFriend();
      case "friends":
        return removeFriend();
      case "request sent":
        return pendingApproval();
      case "request received":
        return acceptFriend();
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="profile-actions">
        { display() }
      </div>
    </div>
  );

};

export default FriendsMenu;

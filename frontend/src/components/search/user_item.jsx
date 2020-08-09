import React from 'react'; 
import { Link } from 'react-router-dom'; 

const UserItem = ({user}) => {
  const fullName = `${user.firstName} ${user.lastName}`; 
  return ( 
    <li className="user-item"> 
      <Link to={ `/${user.id}` }> 
        <img className="profile-icon" alt="Avatar" src={user.profilePhoto} />
        <span className="full-name">{ fullName }</span>
      </Link>
    </li>
  ); 
};

export default UserItem; 
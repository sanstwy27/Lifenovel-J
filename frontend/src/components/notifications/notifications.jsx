import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EmptyList from './empty_list';

const Notifications = ({ notifications, users, notificationType, message }) => {
  return (
    <div className="notifications">
      <h1>{notificationType}</h1>
      { notifications.length === 0 ? (
        <EmptyList />
      ) : (
      <ul>
        { notifications.map( event => {
          const user = users[event.user1Id];
            if ( user ) {
              return (
                <li key={event.id} >
                  <Link to={ `/${event.user1Id}`} className="notification-link">
                    <div className="notification-message">
                      <img alt="" src={ users[event.user1Id].profilePhoto} />
                      <div>
                        <span className="name">{`${user.firstName} ${user.lastName}`}</span>
                        <span>{ message }</span>
                      </div>
                    </div>
                    <div>{ moment(event.createdAt).fromNow() }</div>
                  </Link>
                </li>
              );
            } else {
              return <></>
            }
          })
        }
      </ul> ) }
      <div>
        <Link to="/wip">See All</Link>
      </div>
    </div>
  );
};

export default Notifications;
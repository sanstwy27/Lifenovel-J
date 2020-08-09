import React from 'react'; 

const About = ({ user, currentUser }) => { 
  if ( !user ) return null; 

  return ( 
    <div className="about">
      <div className="about-label">Name</div>
      <div >{`${user.firstName} ${user.lastName}` }</div>
      <div className="about-label">Birthday</div>
      <div>{ user.birthDate }</div>
      <div className="about-label">Email/Phone</div>
      <div>{ user.email }</div>
      <div className="about-label">Gender</div>
      <div>{ user.gender === "F" ? "Female" : "Male" }</div>
    </div> 
  ); 
}; 

export default About; 
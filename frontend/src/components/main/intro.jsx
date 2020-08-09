import React from 'react';

import login_find from '../../assets/images/login_find.png';
import login_photo from '../../assets/images/login_photo.png';
import login_timeline from '../../assets/images/login_timeline.png';

const Intro = () => (
  <div className="intro">
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/jingnali/"
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-3x"></i>
        </a>
      </li>
      <li>
        <a href="https://github.com/jli57"
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-github-square fa-3x"></i>
        </a>
      </li>
      <li>
        <a href="https://github.com/sanstwy27"
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-github-square fa-3x"></i>
        </a>
      </li>
    </ul>

    <h1>Connect with friends and the world around you on Lifenovel.</h1>

    <div>
      <img alt="" src={login_photo} />
      <p>
        <span>See photos and updates </span>
        <span>from friends in News Feed.</span>
      </p>
    </div>
    <div>
      <img alt="" src={login_timeline} />
      <p>
        <span>Share what's new </span>
        <span>in your life on your Timeline.</span>
      </p>
    </div>
    <div>
      <img alt="" src={login_find} />
      <p>
        <span>Find more </span>
        <span>more of what you are looking for with Lifenovel Search.</span>
      </p>
    </div>

  </div>
);

export default Intro;

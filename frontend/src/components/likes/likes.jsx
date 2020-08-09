import React from 'react'; 

const Likes = ({likes}) => {
  if ( likes === undefined ) return null; 

  const numLikes = likes.length; 
  const pluralize = numLikes > 1 ? "s" : ""; 

  return numLikes ? (
    <div className="post-response">
      <div className="post-feedback">
        <p>
          <span><i className="fas fa-thumbs-up"></i></span>
          { ` ${likes.length} like${pluralize}` }
        </p>
      </div>
    </div>
  ) : null 
}; 

export default Likes; 
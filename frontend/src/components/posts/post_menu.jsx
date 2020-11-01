import React from 'react';

const PostMenu = ({ post, openModal, deletePost, currentUserId }) => {

  const handleClick = (e) => {
    const pos = e.target.getBoundingClientRect(); 
    openModal( 'editPost',
      { postId: post.id,
        mode: "absolute",
        pos,
      }
    )
  }; 

  const authorOptions = (
    <ul>
      <li onClick={ handleClick } >
        <i className="fas fa-pencil-alt"></i>
        <button>Edit Post</button>
      </li>
      <li onClick={ () => deletePost(post.id) } >
        <i className="fas fa-trash-alt"></i>
        <button>Delete</button>
      </li>
    </ul>
  );

  const currenUserOptions = (
    <ul>
      <li>
        <button>Save Post</button>
      </li>
      <li>
        <button>Hide Post</button>
      </li>
    </ul>
  )

  // const profileOwnerOptions = (
  //   <ul>
  //     <li>
  //       <button>Remove Post</button>
  //     </li>
  //   </ul>
  // )

  return (
    <div className="post-menu">
      { currentUserId === post.authorId ? authorOptions : currenUserOptions }
    </div>
  );

};

export default PostMenu;

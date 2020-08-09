import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { createComment, fetchComment } from '../../actions/comment_actions';

const CreateCommentContainer = ({ comment, currentUser, submitAction, fetchComment, toggleForm, formType }) => {
  return (
    <div className="create-comment">
      <div>
        <img className="comment-profile-icon" alt="" src={currentUser.profilePhoto} />
      </div>
      <div>
        <CommentForm comment={comment} 
          submitAction={submitAction} 
          fetchComment={fetchComment} 
          toggleForm={toggleForm}
          formType={ formType }
        />
      </div>
    </div>
  );
}; 

const mapStateToProps = ( { session, entities: { users } }, ownProps ) => {
  const { postId, parentId } = ownProps; 
  return {
    comment: {  authorId: session.id,
      body: "",
      commentableId: postId ,
      commentableType: "Post",
      parentId: parentId  },
    currentUser: users[session.id],
    formType: "Create",
    toggleForm: ownProps.toggleForm
  };
}

const mapDispatchToProps = dispatch => ({
  submitAction: (comment) => dispatch(createComment(comment)), 
  fetchComment: (commentId) => dispatch(fetchComment(commentId)), 
});

export default connect( mapStateToProps, mapDispatchToProps )( CreateCommentContainer );

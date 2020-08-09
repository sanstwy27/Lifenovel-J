import React from 'react';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this); 
  }

  handleSubmit(e) {
    if ( e ) {
      e.preventDefault();
    }
    const comment = Object.assign({}, this.state);
    this.setState({ body: "" },
      () => {
        this.props.submitAction(comment)
        .then( () => this.props.toggleForm ? this.props.toggleForm(this.props.formType) : null )
        .then( () => comment.parentId ? this.props.fetchComment(comment.parentId) : null )
      }
    ); 
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value });
    }
  }

  checkSubmit(e) {
    if ( e.which === 13 && !e.shiftKey ) {
      this.handleSubmit(); 
      return false; 
    }
  }

  render() {
    return (
      <form className="comment-form" onSubmit={ this.handleSubmit } >
        <div>
          <textarea
            id={`create-comment-${this.props.comment.commentableId}`}
            type="submit"
            onChange={ this.update("body")}
            onKeyPress={ this.checkSubmit }
            value={this.state.body}
            placeholder="Write a comment..."></textarea>
            <span className="comment-input-buttons-container" id="child-comment-input-btns">
                <i onClick={e => alert("sorry, not implemented yet.")} className="far fa-smile"></i>
                <i onClick={e => alert("sorry, not implemented yet.")} className="fas fa-camera"></i>
                <i onClick={e => alert("sorry, not implemented yet.")} className="far fa-file-video"></i>
                <i onClick={e => alert("sorry, not implemented yet.")} className="far fa-sticky-note"></i>
            </span>
        </div>
      </form>
    )
  }
}

export default CommentForm;

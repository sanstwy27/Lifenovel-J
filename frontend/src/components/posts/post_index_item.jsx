import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentContainer from '../comments/create_comment_container';
import LikesContainer from '../likes/likes_container';
import share from '../../assets/images/share.png';
import Modal from '../modal/modal';
import moment from 'moment';

class PostIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    if ( this.props.postAuthor === undefined ) {
      this.props.fetchUsers([this.props.post.authorId]);
    }
    if ( this.props.pageOwner === undefined ) {
      this.props.fetchUsers([this.props.post.pageId]);
    }
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    const pos = e.target.getBoundingClientRect();
    this.props.openModal("postMenu", {postId: this.props.post.id, pos, mode: "relative" });
  }

  handleLike(e) {
    e.preventDefault();

    const { currentUserId, post, like } = this.props;

    like ?
      this.props.deleteLike(like.id) :
      this.props.createLike({ userId: currentUserId, likeableId: post.id, likeableType: "Post" })
  }

  handleComment(e) {
    e.preventDefault();
    document.getElementById(`create-comment-${this.props.post.id}`).focus();
  }

  handleShare(e) {
    e.preventDefault();

  }

  render() {
    const { post, postAuthor, like, pageOwner } = this.props;
    if ( !post  || !postAuthor || !pageOwner ) return null;

    const postDate = moment(post.createdAt);
    const currDate = moment();
    const updateDate = moment(post.updatedAt);
    const relativeDate = ` ${postDate.fromNow()} `;
    const formattedDate = ` ${postDate.format("MMM DD, YY")}`;
    const editText = updateDate.diff(postDate, "seconds") > 0 ? "(edited)" : "";
    let displayDate = currDate.diff(postDate, "days") > 7 ? formattedDate : relativeDate;
    if ( currDate.diff(postDate, "hours") >= 24 ) displayDate = displayDate.concat( ` at ${postDate.format("h:mma")}` )

    const likeClass = like ? "like-btn-container liked" : "like-btn-container";

    const showFeed = () => {
      if ( this.props.pageType === "feed" && post.authorId !== post.pageId ) {
        return (
          <div className="feed-info">
            <i className="fas fa-caret-right"></i>
            <Link to={`/${post.pageId}`}>
              { `${pageOwner.firstName} ${pageOwner.lastName}`}
            </Link>
          </div>
        );
      }
    }

    const displayPostImages = ( photoUrls ) => (
      photoUrls
      ?
      ( photoUrls.length > 1 ) ? (
        <ul>
          { photoUrls.map( (url, i) => (
              <li key={i} className={ i === 0 ? "firstImg" : "rest" }>
                <img alt="" src={ url } />
              </li>
            ))}
        </ul>
      ) : (
        photoUrls.length === 0 ? null : <img alt="" src={photoUrls[0]} />
      )
      :
      null
    );
    return (
      <li className="post">
        <div className="post-header">
          <div className="post-author-info">
            <Link to={`/${post.authorId}`}>
              <img className="post-profile-icon" alt="" src={ postAuthor.profilePhoto } />
            </Link>
            <div>
              <div className="post-author-name">
                <Link to={`/${post.authorId}`}>
                  { `${postAuthor.firstName} ${postAuthor.lastName}`}
                </Link>
                { showFeed() }
              </div>
              <p className="post-date">{ `${displayDate} ${editText}` }</p>
            </div>
          </div>

          <div className="post-menu-btn" onClick={ this.handleClick }>
            <i className="fas fa-ellipsis-h"></i>
            <Modal modalType="postMenu" id={ post.id }/>
          </div>

        </div>

        <div className="post-body">
          { post.body === "" ? null : post.body }
        </div>
        <div className="post-images">
          { displayPostImages(post.photoUrls) }
        </div>
        <div className="post-stats">
          <LikesContainer likeableId={ post.id } likeableType="Post"/>
        </div>
        <div className="post-nav">
          <nav>
            <div onClick={ this.handleLike } className={ likeClass }>
              { like ?
                <i className="fas fa-thumbs-up liked"></i> :
                <i className="far fa-thumbs-up"></i>
              }
              <span>  Like</span>
            </div>
            <div onClick={ this.handleComment }>
              <i className="far fa-comment-alt"></i><span>  Comment</span>
            </div>
            <div onClick={ this.handleShare }>
              <Link to="/wip">
                <img className="share-icon" alt="" src={ share } /> <span>  Share</span>
              </Link>
            </div>
          </nav>
        </div>
        <CommentIndexContainer postId={post.id} parentId={ null } />
        <CreateCommentContainer postId={post.id} parentId={ null } />
      </li>
    )
  }

}

export default PostIndexItem;

// <i className="far fa-share-square">

import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { filterPosts } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom';
import PostIndex from './post_index';
import { openModal } from '../../actions/modal_actions'

const mapStateToProps = ({ entities: { users, posts }, session }, ownProps) => {
  const userId = Number(ownProps.match.params.userId) || 0;
  return {
    posts: filterPosts( posts, userId),
    currentUser: users[session.id],
    userIds: [userId],
    pageType: "profile", 
  }
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (options) => dispatch( fetchPosts(options) ),
  openModal: (modal, options) => dispatch( openModal(modal, options) ),
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( PostIndex ));

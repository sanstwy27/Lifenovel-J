import * as APIUtil from "../util/post_api_util";
import { closeModal } from "./modal_actions";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";

const receivePosts = ({posts, comments, likes}) => ({
  type: RECEIVE_POSTS,
  posts,
  comments,
  likes
});

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

const removePost = (postId) => ({
  type: REMOVE_POST,
  postId
});

const receivePostErrors = (errors) => ({
  type: RECEIVE_POST_ERRORS,
  errors
});

export const fetchPosts = (options) => dispatch => (
  APIUtil.fetchPosts(options)
    .then(
        (resp) => dispatch(receivePosts({ 
            posts: resp.data.posts,
            comments: resp.data.comments,
            likes: resp.data.likes
        })),
        (errors) => dispatch(receivePostErrors(errors.responseJSON))
    )
);

export const createPost = (post) => dispatch => (
  APIUtil.createPost(post)
    .then(
      (resp) => dispatch(receivePost({ post: resp.data })),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
  )
);


export const createPhotoPost = (formData) => dispatch => (
  APIUtil.createPhotoPost(formData)
    .then(
      (resp) => dispatch(receivePost( resp.data )),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
  )
);

export const updatePost = (post) => dispatch => (
  APIUtil.updatePost(post)
    .then(
      (resp) =>  dispatch(receivePost( resp.data )), dispatch(closeModal()) ,
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
  )
);

export const deletePost = (postId) => dispatch => (
  APIUtil.deletePost(postId)
    .then(
      () => dispatch(removePost(postId)),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
    )
);

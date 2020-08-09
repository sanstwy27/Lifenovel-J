export const filterPosts = ( posts, userId ) => (
  Object.values(posts)
    .filter( post => post.pageId === userId )
    .sort( (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) )
);

export const filterFeedPosts = ( posts, friendIds ) => (
  Object.values(posts)
    .filter( post => friendIds.includes( post.pageId ) )
    .sort( (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) )
);

export const addAuthorToPosts = ( posts, users ) => (
  Object.values(posts).map( post => {
    const author = users[post.authorId];
    const author_fullname = `${author.firstName} ${author.lastName}`;
    post.author = author_fullname;
    return post;
  })
);

export const filterPostComments = ( comments, postId, parentId, n ) => (
  Object.values(comments)
    .filter( comment => comment.commentableId === postId &&
      comment.commentableType === "Post" &&
      comment.parentId === parentId )
    .sort( (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    .slice(0, n)
);

export const countPostComments = ( comments, postId ) => (
  Object.values(comments)
    .filter( comment =>
      comment.commentableId === postId && comment.commentableType === "Post" )
    .length
);

export const getRelationship = ( currentUserId, profileUserId, userRelationships ) => {
  const [rel] = Object.values(userRelationships)
  .filter( rel =>
    ( rel.user1Id ===  currentUserId && rel.user2Id === profileUserId)
    || ( rel.user1Id === profileUserId && rel.user2Id ===  currentUserId)
  );
  return rel;
};

export const getRelType = ( currentUserId, profileUserId, userRelationships  ) => {

  let rel = "none";

  if ( currentUserId === profileUserId ) {
    return "self";
  }

  const relationship = getRelationship( currentUserId, profileUserId, userRelationships) ;

  if ( relationship === undefined ) {
    rel = "none";
  } else {
    const { relType, user1Id } = relationship;
    if ( relType === "accepted" ) {
      rel = "friends";
    } else if ( relType === "pending" ) {
      if ( user1Id === currentUserId ) {
        rel = "request sent"
      } else {
        rel = "request received"
      }
    }
  }
  return rel;

};

export const filterRelationships = ( currentUserId, userRelationships, relType ) => (
  Object.values(userRelationships)
    .filter( rel =>
      ( rel.user1Id === currentUserId || rel.user2Id === currentUserId ) &&
      rel.relType === relType
    )
    .map( rel => rel.user1Id === currentUserId ? rel.user2Id : rel.user1Id )
);

export const filterFriends = ( users, friendIds, sortCallback ) => {

  return Object.values(users)
    .filter( user => friendIds.includes(user.id) )
    .sort( sortCallback ? sortCallback : (a, b) => `${a.firstName} ${a.lastName}` - `${b.firstName} ${b.lastName}` );
};



export const getPendingFriendRequests = ( currentUserId, userRelationships ) => (
  Object.values(userRelationships)
    .filter( rel => rel.user2Id === currentUserId && rel.relType === "pending" )
    .sort( (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) )
);

export const filterUsers = ( userIds, users ) => (
  userIds.map( id => users[id] )
);

export const filterLikes = ( likeableId, likeableType, likes ) => (
  Object.values(likes)
    .filter( like => like.likeableId === likeableId && like.likeableType === likeableType )
);

export const filterLikeByUser = ( currentUserId, likeableId, likeableType, likes ) => (
  Object.values(likes)
    .filter( like =>
      like.likeableId === likeableId &&
      like.likeableType === likeableType &&
      like.userId === currentUserId
    )
);
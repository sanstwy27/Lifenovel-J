import qs from 'qs'

import { service } from './axios_container'


// export const fetchComments = (comments) => (
export const fetchComments = (postIds) => (
    service.get('/comments', { 
        params: { postIds },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})  
        },
    })
)

export const fetchComment = (commentId) => (
    service.get(`/comments/${commentId}`)
)

export const createComment = (comment) => (
    service.post('/comments', { comment })
)

export const updateComment = (comment) => (
    service.put(`/comments`, { comment })
)

export const deleteComment = (commentId) => (
    service.delete(`/comments/${commentId}`)
)

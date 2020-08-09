import qs from 'qs'

import { service } from './axios_container'


export const fetchPosts = ({userIds, offset, limit}) => (
    service.get('/posts', {
        params: { userIds, offset, limit },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})  
        },
    })
)

export const createPost = (post) => (
    service.post('/posts', { post })
)

export const createPhotoPost = (formData) => {
    return service.post('/posts', formData, {
        contentType: false,
        processData: false,
    })
};

export const updatePost = (post) => (
    service.put(`/posts`, { post })
)

export const deletePost = (postId) => (
    service.delete(`/posts/${postId}`)
)

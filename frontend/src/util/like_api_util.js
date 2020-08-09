import qs from 'qs'

import { service } from './axios_container'


export const fetchLikes = ({ likeableId, likeableType }) => (
// export const fetchLikes = ({ likeableIds, likeableType }) => (
    service.get('/likes', { 
        params: { likeableId, likeableType },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})  
        },
    })
)

export const fetchLike = ( { likeableId, likeableType, userId } ) => (
    service.get(`/likes/${userId}`, { 
        params: { likeableId, likeableType },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})  
        },
    })
    //   $.ajax({
    //     method: "GET", 
    //     url: `api/likes/${likeId}`
    //   })
)

export const createLike = (like) => (
    service.post('/likes', { like })
)

// export const updateLike = (like) => (
//   $.ajax({
//     method: "PATCH",
//     url: `/api/likes/${like.id}`,
//     data: { like }
//   })
// )

export const deleteLike = ( likeId ) => (
    service.delete(`/likes/${likeId}`)
)

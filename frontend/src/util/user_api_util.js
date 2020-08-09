import qs from 'qs'

import { service } from './axios_container'


export const fetchUsers = (userIds) => (
    service.get('/users', { 
        params: { userIds },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})  
        },
    })
);

export const searchUsers = (search_text) => (
    service.post('/users/search', { search_text })
);

export const updateUser = (formData, userId) => (
    service.patch(`/users/${userId}`, formData, {
        contentType: false,
        processData: false,
    })
);
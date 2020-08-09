import { service } from './axios_container'


export const createUserRelationship = (user_relationship) => (
    service.post('/user_relationships', { user_relationship })
)

export const updateUserRelationship = (user_relationship) => (
    service.put(`/user_relationships`, { user_relationship })
)

export const deleteUserRelationship = (userRelationshipId) => (
    service.delete(`/user_relationships/${userRelationshipId}`)
)

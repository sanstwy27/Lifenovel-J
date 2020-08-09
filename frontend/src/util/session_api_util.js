import { service } from './axios_container'


export const login = (user) => (
    service.post('/session', { user })
)

export const logout = () => (
    service.delete('/session')
)

export const signup = (user) => (
    service.post('/users', { user })
)

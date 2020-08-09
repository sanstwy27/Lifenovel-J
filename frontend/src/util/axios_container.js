import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

export const service = axios.create({
    baseURL: isDev ? 'XXXXXXXX/api' : 'http://xxxxxxxxxxxxxx'
})



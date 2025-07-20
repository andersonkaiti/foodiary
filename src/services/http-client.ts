import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'https://vrw6wyq25k.execute-api.us-east-1.amazonaws.com',
})

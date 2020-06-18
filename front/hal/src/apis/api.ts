import axios from 'axios'

export default axios.create({
  baseURL: 'https://52.78.120.154:8080/api',
  // baseURL: 'https://localhost:8080/api',
  headers: {},
  // responseType: "json"
})

export const websocketUri = 'https://52.78.120.154:8080/api/webSocket'

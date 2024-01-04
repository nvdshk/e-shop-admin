import axios from 'axios'
import { base_url } from './baseUrl'

const instance = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance

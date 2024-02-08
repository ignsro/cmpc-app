import axios, { Axios, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { Log } from 'src/models/log';
import BASE_URL from '.';

const API = axios.create({baseURL:  process.env.REACT_APP_API_URL})

const LogService = {
  async getAll(): Promise<Log[]> {
    const response: AxiosResponse<Log[]> = await API.get('/log')
    return response.data
  },
  async getByID(id: number): Promise<Log> {
    const response: AxiosResponse<Log> = await API.get(`/log/${id}`)
    return response.data
  },
  async create(log: Log): Promise<Log[]> {
    const response: AxiosResponse<Log[]> = await API.post('/log', log)
    return response.data
  }
}

export default LogService
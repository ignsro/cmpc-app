import axios, { AxiosResponse } from 'axios';
import { Machine } from 'src/models/machine';
import BASE_URL from '.';

const API = axios.create({baseURL:  process.env.REACT_APP_API_URL})

const MachineService = {
  async getAll(): Promise<Machine[]> {
    const response: AxiosResponse<Machine[]> = await API.get('/machine')
    return response.data
  },
  async getByID(id: number): Promise<Machine> {
    const response: AxiosResponse<Machine> = await API.get(`/machine/${id}`)
    return response.data
  }
}

export default MachineService
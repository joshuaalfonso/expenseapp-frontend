import type { UserList } from '@/models/users';
import axios from './axiosInstance';


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'users'

export const fetchUsers = async () => {

    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as UserList[]

}
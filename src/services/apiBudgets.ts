

// import axios from "axios";
import type { BudgetDetails, BudgetList, BudgetPost } from '@/models/budgets';
import axios from './axiosInstance';


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'budgets'

export const fetchBudgets = async () => {
    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as BudgetList[]
}

export const fetchBudgetDetails = async (id: number) => {
    const { data } = await axios.get(`${baseUrl}${tableName}/${id}`);
    return data as BudgetDetails
}

export const createBudget = async (newBudget: BudgetPost) => {
    const { data } = await axios.post(`${baseUrl}${tableName}`, newBudget);
    return data;
}

export const editBudget = async (newBudget: BudgetPost) => {
    const { data } = await axios.put(`${baseUrl}${tableName}${'/' + newBudget.id}`, newBudget);
    return data;
}

export const deleteBudget = async (id: number) => {
    const { data } = await axios.delete(`${baseUrl}${tableName}${'/' + id}`);
    return data;
}
import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, password, surname, name, address, phone, sex, idSportCategory) => {
    const {data} = await $host.post('/api/user/registration', {username, password, idSportCategory, surname, name, address, phone, sex})
    return data;
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.message)
    return data.message
}

export const check = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return null
    }
    try {
        const {data} = await $authHost.get('api/user/auth')
        return data
    } catch (e) {
        localStorage.removeItem('token')
        return null
    } 
}

export const fetchCategories = async () => {
    const {data} = await $host.get('/api/user/categories')
    return data;
}

export const fetchUser = async () => {
    const {data} = await $authHost.get('/api/user')
    return data;
}

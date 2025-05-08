import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, password, surname, name, address, phone, sex, i_sport_category) => {
    const {data} = await $host.post('/api/user/registration', {username, password, role: 'ADMIN', id_sport_category: 1, surname, name, address, phone, sex, i_sport_category})
    // localStorage.setItem('token', data.token)
    // return jwtDecode(data.token)
    return data;
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.message)
    return data.message
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
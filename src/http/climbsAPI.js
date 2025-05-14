import {$authHost, $host} from "./index";

export const fetchMountains = async () => {
    const {data} = await $host.get('api/mountain')
    console.log('Mountains data from server:', data)
    return data
}

export const fetchClimbs = async (mountainId, categoryId) => {
    const {data} = await $host.get('api/climb',{params: {mountainId , categoryId }})
    console.log('Climbs data from server:', data)
    return data
}

export const fetchClimb = async (id) => {
    const {data} = await $host.get(`api/climb/${id}`)
    console.log('Climb data from server:', data)
    return data
}

export const recordAlpinistClimb = async (id) => {
    const {data} = await $authHost.post(`api/climb/${id}/record`)
    return data
}

export const fetchAlpinistClimb = async (id) => {
    const {data} = await $authHost.get(`api/climb/reservation`)
    console.log('Alpinist climb data from server:', data)
    return data
}

export const fetchClimbCategories = async () => {
    const {data} = await $host.get('api/climb/category')
    console.log('Climb categories data from server:', data)
    return data
}

export const cancelAlpinistClimb = async (id) => {
    const {data} = await $authHost.delete(`api/climb/${id}/cancel`)
    return data
}
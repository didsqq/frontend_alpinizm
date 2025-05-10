import {$authHost, $host} from "./index";

export const fetchMountains = async () => {
    const {data} = await $host.get('api/mountain')
    console.log('Mountains data from server:', data)
    return data
}

export const fetchClimbs = async (mountainId, categoryId) => {
    const {data} = await $host.get('api/climbs',{params: {mountainId , categoryId }})
    console.log('Climbs data from server:', data)
    return data
}
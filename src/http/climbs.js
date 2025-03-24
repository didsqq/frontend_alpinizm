import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

// export const createType = async (type) => {
//     const {data} = await $authHost.post('api/type', type)
//     return data
// }

export const fetchMountains = async () => {
    const {data} = await $host.get('api/mountain')
    return data
}

// export const createBrand = async (brand) => {
//     const {data} = await $authHost.post('api/brand', brand)
//     return data
// }

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category', )
    return data
}

// export const createDevice = async (device) => {
//     const {data} = await $authHost.post('api/device', device)
//     return data
// }

export const fetchClimbs = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneClimb = async (id) => {
    const {data} = await $host.get('api/climb/' + id)
    return data
}
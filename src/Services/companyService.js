import { get } from "../utils/request"

export const getCompanyById = async (id) =>{
    const result = await get(`company/${id}`);
    return result;
}
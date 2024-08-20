import { get, patch } from "../utils/request"

export const getCompanyById = async (id) =>{
    const result = await get(`company/${id}`);
    return result;
}
export const getCompanys = async (limit = -1) =>{
    const path = `company?_limit=${limit === -1 ? '': limit}`
    const result = await get(path);
    return result;
}
export const loginCompany = async (email,password)=>{
    const path = `company?email=${email}&password=${password}`;
    const result = await get(path);
    if (result && result[0].password === password){
       return result[0];
    }
    return null;
}
export const editCompany = async (company,id) =>{
    const result = await patch("company",id,company);
    return result;
}
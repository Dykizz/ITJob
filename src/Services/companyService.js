import { get, patch, post } from "../utils/request"

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
export const createCompany = async (company) =>{
    const result = await post("company",company);
    return result;
}
export const checkExistEmail = async (email) =>{
    const path = `company?email=${email}`;
    const result = await get(path);
    return result.length > 0;
}
export const checkExistPhone = async (phone) =>{
    const path = `company?phone=${phone}`;
    const result = await get(path);
    return result.length > 0;
}
export const randomToken = ()=>{
    const arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let token = '';
    for (let i = 0; i < 24 ; i++){
        let index = Math.floor(Math.random()*61);
        token += arr[index];
    }
    return token;
}
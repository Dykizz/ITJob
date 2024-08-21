import { del, get, patch, post } from '../utils/request.js'
export const getAllJob = async () =>{
    const result = await get("jobs");
    return result;
}
export const getJobById = async (id) =>{
    const result = await get("jobs/" + id);
    return result;
}
export const getJobbyCompanyId = async(id)=>{
    const result = await get("jobs?idCompany="+ id );
    return result;
}
export const createJob = async (job)=>{
    const result = await post("jobs",job);
    return result;
}
export const editJob = async (job ,id)=>{
    const result = await patch("jobs",id,job);
    return result;
}
export const deleteJob = async (id)=>{
    const result = await del("jobs",id);
    return result;
}
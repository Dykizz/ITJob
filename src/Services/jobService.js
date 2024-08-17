import { get } from '../utils/request.js'
export const getAllJob = async () =>{
    const result = await get("jobs");
    return result;
}
export const getJobById = async (id) =>{
    const result = await get("jobs/" + id);
    return result;
}
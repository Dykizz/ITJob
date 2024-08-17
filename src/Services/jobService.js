import { get } from '../utils/request.js'
export const getAllJob = async () =>{
    const result = await get("jobs");
    return result;
}
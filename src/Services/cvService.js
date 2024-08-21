import { post, get,del } from "../utils/request"

export const submitCV = async (cv)=>{
    const result = await post("cv",cv);
    return result;
}
export const getCVbyCompanyId = async(id)=>{
    const result = await get("cv?idCompany="+ id );
    return result;
}
export const getCVbyId = async (id) =>{
    const result = await get("cv/"+  id);
    return result;
}
export const deleteCv = async (id)=>{
    const result = await del("cv",id);
    return result;
}
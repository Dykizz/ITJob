import { post, get } from "../utils/request"

export const submitCV = async (cv)=>{
    const result = await post("cv",cv);
    return result;
}
export const getCVbyCompanyId = async(id)=>{
    const result = await get("cv?idCompany="+ id );
    return result;
}
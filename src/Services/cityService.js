import { get } from '../utils/request.js'
export const getListCity = ()=>{
    const result = get("city");
    return result;
}
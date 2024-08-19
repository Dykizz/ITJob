import { deleteAllCookies } from "../helpers/cookie";

export const companyReducer = (state = false, action) =>{
    switch(action.type){
        case 'LOGIN' :
            return true;
        case 'LOGOUT':
            deleteAllCookies();
            return false;
        default :
            return state;

    }
}
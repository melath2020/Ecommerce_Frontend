import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const register=async(userData)=>{
    const responce=await axios.post(`${base_url}user/register`,userData);
        return responce.data
    
}

const login=async(userData)=>{
    const responce=await axios.post(`${base_url}user/login`,userData);
    if(responce.data){
        localStorage.setItem('customer',JSON.stringify(responce.data))
        return responce.data
    }
}

export const authService={
    register,
    login
}
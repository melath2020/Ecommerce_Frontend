import axios from "axios";

const register=async(userData)=>{
    const responce=await axios.post("",userData);
    if(responce.data){
        return responce.data
    }
}

export const authService={
    register
}
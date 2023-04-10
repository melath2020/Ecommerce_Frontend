import axios from "axios";
import { base_url} from "../../utils/axiosConfig";



const getBlogs=async()=>{
    const responce=await axios.get(`${base_url}blog`);
    if(responce.data){
        return responce.data
    }
}

const getBlog=async(id)=>{
    const responce=await axios.get(`${base_url}blog/${id}`);
    if(responce.data){
        return responce.data
    }
}



export const blogService={
    getBlogs,
    getBlog
   
}
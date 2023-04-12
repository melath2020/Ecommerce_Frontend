import axios from "axios";
import { base_url} from "../../utils/axiosConfig";



const postQuery=async(contactData)=>{
    const responce=await axios.post(`${base_url}enquiry`,contactData);
    console.log(contactData)
    if(responce.data){
        return responce.data
    }
}


export const contactService={
   postQuery
    
}
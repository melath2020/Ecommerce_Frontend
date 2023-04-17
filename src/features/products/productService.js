import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";



const getProducts=async(userData)=>{
    const responce=await axios.get(`${base_url}product`);
    if(responce.data){
        return responce.data
    }
}

const getSingleProduct=async(id)=>{
    const responce=await axios.get(`${base_url}product/${id}`);
    if(responce.data){
        return responce.data
    }
}

const addToWishlist=async(prodId)=>{
    const responce=await axios.put(`${base_url}product/wishlist`,{prodId},config);
    if(responce.data){
        return responce.data
    }
}

export const productService={
    getProducts,
    addToWishlist,
    getSingleProduct
}
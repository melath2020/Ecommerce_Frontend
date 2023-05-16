import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";



const getProducts=async(data)=>{
     console.log(data)
    const responce=await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
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

const rateProduct=async(data)=>{
    const responce=await axios.put(`${base_url}product/rating`,data,config);
    if(responce.data){
        return responce.data
    }
}

export const productService={
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct
}
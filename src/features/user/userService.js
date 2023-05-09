import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

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


const getUserWishlist=async()=>{
    const responce=await axios.get(`${base_url}user/wishlist`,config);
    if(responce.data){
        return responce.data
    }
}

const addToCart=async(cartData)=>{
    const responce=await axios.post(`${base_url}user/cart`,cartData,config);
    if(responce.data){
        return responce.data
    }
}

const getCart=async()=>{
    const responce=await axios.get(`${base_url}user/cart`,config);
    if(responce.data){
        return responce.data
    }
}


const removeProductFromCart=async(cartItemId)=>{
    const responce=await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config);
    if(responce.data){
        return responce.data
    }
}

const updateProductFromCart=async(cartDetail)=>{
    const responce=await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
    if(responce.data){
        return responce.data
    }
}


const createOrder=async(orderDetail)=>{
    const responce=await axios.post(`${base_url}user/cart/create-order`,orderDetail,config);
    if(responce.data){
        return responce.data
    }
}

const getUserOrders=async()=>{
    const responce=await axios.get(`${base_url}user/getmyorders`,config)
    if(responce.data){
        return responce.data
    }
}


export const authService={
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders
}
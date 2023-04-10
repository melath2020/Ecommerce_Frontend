import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";

export const registerUser=createAsyncThunk("auth/register",async (userData,thunkAPI)=>{
    try{
        return await authService.register(userData)
    }catch(errors){
        return thunkAPI.rejectWithValue(errors)
    }
})

export const loginUser=createAsyncThunk("auth/login",async (userData,thunkAPI)=>{
    try{
        return await authService.login(userData)
    }catch(errors){
        return thunkAPI.rejectWithValue(errors)
    }
})

export const getUserProductWishlist=createAsyncThunk("user/wishlist",async (thunkAPI)=>{
    try{
        return await authService.getUserWishlist()
    }catch(errors){
        return thunkAPI.rejectWithValue(errors)
    }
})

const getCustomerfromLocalStorage=localStorage.getItem('customer')? JSON.parse(localStorage.getItem('customer')):null;

const initialState={
    user:getCustomerfromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
            if(state.isError===true){
                toast.error("Something Went wrong")
            }
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser=action.payload;
            if(state.isSuccess===true){
                toast.info("User Created Successfully")
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.error)
            }
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            if(state.isError===true){
                toast.error("Something Went wrong")
            }
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if(state.isSuccess===true){
                localStorage.setItem("token",action.payload.token)
                toast.success("User Logged In Successfully")
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.error)
            }
        }).addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading=true;
           
        }).addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist=action.payload;
           
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        })
    }
})

export default authSlice.reducer;

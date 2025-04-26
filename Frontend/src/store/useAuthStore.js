import { create } from "zustand";
import axiosInstance from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";


export const useAuthStore=create((set)=>({
authUser:null,
isSigningUp:false,
isLoggingIng:false,
isUpdatingProfile:false,
isCheckingAuth:true,

checkAuth:async()=>{
    try {
        const res=await axiosInstance.get("/auth/check")
        set({authUser:res.data})
    } catch (error) {
        
      console.log("❌ Axios Error:");
      console.log("Message:", error.message);
      console.log("Config:", error.config);
      console.log("Code:", error.code);
      console.log("Response:", error.response);
console.log(`error in checkauth ${error}`,error)
set({authUser:null});


    }
    finally{
        set({isCheckingAuth:false})
    }
},

signup:async(data)=>{
    set({isSigningUp:true})
    try {
        // console.log("Entered in signup"+data)
        const res=await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data})
        toast.success("Account created sucessfully")
        
    } catch (error) {
        toast.error(error.response.data.message);

    }
    finally{
        set({isSigningUp:false})
    }
},



}))
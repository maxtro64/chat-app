import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar=async(req,res)=>{
    try {
        const loggedUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedUserId}}).select("-password")
      
   res.status(200).json(filteredUsers);

   
   
    } catch (error) {
   console.log("Error in getUsersForSidebar: ",error.message)
    res.status(500).json({message:"Internal server error"})    
    }
}

export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ],
        })



    } catch (error) {
        console.log("Error in getMessage controller",error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const sendMessage=async()=>{
   try {
    const {text,image}=req.body
    const {id:receiverId}=req.params
    const senderId=req.user._id

let imageUrl;
if(image){
    const uploadResponse=await cloudinary.uploadResponse.upload(image);
    imageUrl=uploadResponse.secure_url;
} 

const newMessage=new Message({
    senderId,
    receiverId,
    text,
    image:imageUrl,

})
await newMessage.save();

res.status(201).json(newMessage)
} catch (error) {
    console.log("Error in sendMessage controller",error.message)
    res.status(201).json({message:"Internal server Error"})
    
   } 
}
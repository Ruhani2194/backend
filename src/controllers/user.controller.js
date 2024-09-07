import {asyncHandler} from "../utils/asyncHandler.js";
import{ApiError} from "../utils/ApiError.js"
import{User} from "../models/user.model.js"
import{uploadoncloundinary} from"../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
   const{fullName,email,username,password}=req.body
   console.log("email:",email);
   // if(fullName===""){
   //    throw new ApiError(400,"fullname is required");
   // }
   if([fullName,email,username,password].some((field)=>field?.trim()==="")){
      throw new ApiError(400,"All fields are  required");
   }
   const existedUser=User.findOne({
      $or:[{username},{email}]
})
console.log(existedUser);

   if(existedUser){
      throw new ApiError(409,"User with email or username already exists")
   }
   const avatarlocalpath=req.files?.avatar[0]?.path
   const coverimagelocalpath=req.files?.coverImage[0]?.path
   if(!avatarlocalpath){
      throw new ApiError(400,"Avatar file is required")
   }

  const avatar=await uploadoncloundinary(avatarlocalpath)
  const coverImage=await uploadoncloundinary(coverimagelocalpath)
  if(!avatar){
   throw new ApiError(400,"Avatar file is required");
  }
  const user=await User.create({
   fullName,
   avatar:avatar.url,
   coverImage:coverImage?.url||"",
   email,
   password,
   username:username.toLowerCase()
  })
  const createduser=await User.findById(user._id).select("-password -refreshToken")
  if(!createduser){
   throw new ApiError(500,"Something went wrong while registering the user")
}
return res.status(201).json(
   new ApiResponse(200,createduser,"User registered successfully")
)
})


export{registerUser}
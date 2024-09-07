import {v2 as cloudinary} from "cloudinary"
import fs from "fs"//file system 
// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    const uploadoncloundinary=async (localFilePath)=>{
        try{
if(!localFilePath) return null
//upload file on cloudinary
const response=await cloudinary.uploader.upload(localFilePath,{
    resource_type:"auto"
})
console.log("file is uploaded on cloudinary",response.url);
return response;
        }
        catch(error){
            fs.unlinkSync(localFilePath)//remove locally saved temporary file as the upload operation got failed
            return null;

        }
    }
export {uploadoncloundinary}


    // cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/olympic_flag.jpg",
        
        
    //     { public_id: "olympic_flag" },
        
    //     function(error, result) {console.log(result); });
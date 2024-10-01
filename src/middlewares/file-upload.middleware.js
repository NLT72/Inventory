import multer from "multer";

const storageupload=multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null,'Public/images/')
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+"_"+ file.originalname;
        cb(null, name);
    }
})

export const uploadfile=multer({storage: storageupload}); 
import commentModel from "../../../DB/model/comment.model.js";
import postModel from "../../../../DB/model/Post.model.js";

export const createComment=asyncHandler(async(req,res,next)=>{
   req.body.postId=req.params.id;
   req.body.userId=req.user._id;
   const post=await postModel.findById(req.params.id);
   if(!post){
    return next(new Error("invalid post id"))
}

const comment =await commentModel.create(req.body);
return res.status(201).json({message:"success",comment});

})
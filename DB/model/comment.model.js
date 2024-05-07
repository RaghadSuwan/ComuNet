import { mongoose, Schema, model, Types } from "mongoose";
const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: { type: Types.ObjectId, ref: "Post", required: true },
    },
    {
        timestamps: true,
    }
);
const commentModel = mongoose.models.comment || model("Comment", commentSchema);
export default commentModel;

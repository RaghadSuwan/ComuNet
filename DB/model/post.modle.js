import mongoose, { Schema, model, Types } from "mongoose";
const PostSchema = new mongoose.Schema(
  {

    likes: [{ type: Schema.Types.ObjectId, ref: "User" ,default:0}],
    //like:{type:Number,default:0,},
    post_type: {
      type: String,
      enum: ["owner", "customer"],
      required: [true, "type is required"],
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

    Images: [
      {
        type: Object,
        // required: [true, "sup Images is required"],
      },
    ],
    properties: [{}],
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Types.ObjectId, ref: "Subcategory", required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.models.Post || model("Post", PostSchema);
export default postModel;

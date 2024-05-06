import mongoose, { Schema, Types, model } from "mongoose";
const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);
// communitySchema.virtual("subcommunity", {
//   localField: "_id",
//   foreignField: "communityId",
//   ref: "Subcommunity",
// });

const communityModel =
  mongoose.models.Community || model("Community", communitySchema);
export default communityModel;

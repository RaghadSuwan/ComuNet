import mongoose, { Schema, model, Types } from "mongoose";
const communityPropertiesSchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Property  is required"],
  },
  value: {
    type: String,
    required: [true, "Value is required"],
  },
  customer_fill: {
    type: Boolean,
    required: [true, "Customer fill is required"],
  },
  owner_fill: {
    type: Boolean,
    required: [true, "Owner Fill is required"],
  },
  communityId: { type: Types.ObjectId, ref: "Community", required: true },
  createdBy: { type: Types.ObjectId, ref: "User" },
  updatedBy: { type: Types.ObjectId, ref: "User" },
});
const communityPropertiesModel =
  mongoose.models.communityProperties ||
  model("CommunityProperties", communityPropertiesSchema);
export default communityPropertiesModel;

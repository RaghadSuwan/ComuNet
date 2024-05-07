import mongoose, { Schema, model, Types } from "mongoose";
const valueSchema = new mongoose.Schema(
    {
        values: [{
            type: String,
            required: true,
        }],
        CommunityPropertiesId: { type: Types.ObjectId, ref: "CommunityProperties", required: true },
        createdBy: { type: Types.ObjectId, ref: "User", required: true },
        updatedBy: { type: Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);
const valueModel = mongoose.models.Value || model("Value", valueSchema);
export default valueModel;

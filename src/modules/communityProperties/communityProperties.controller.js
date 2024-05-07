import communityModel from "../../../DB/model/community.model.js";
import slugify from "slugify";
import communityPropertiesModel from "../../../DB/model/communityProperties.modle.js";

export const addProperty = async (req, res, next) => {
  const { propertyName, owner_fill, customer_fill, value } = req.body;
  const communityId = req.params.communityId;
  const community = await communityModel.findById(communityId);
  if (!community) {
    return next(new Error("Community not found"));
  }
  const existingProperty = await communityPropertiesModel.findOne({
    propertyName,
    communityId: community._id,
  });
  if (existingProperty) {
    return next(new Error("This property already exists"));
  }
  const newProperty = await communityPropertiesModel.create({
    propertyName,
    owner_fill,
    customer_fill,
    value,
    communityId: community._id,
    createdBy: req.user._id,
  });
  return res
    .status(201)
    .json({ messsage: "Property added successfully.", property: newProperty });
};
export const GetProperties = async (req, res, next) => {
  const { communityId } = req.params;
  const community = await communityModel.findById(communityId);
  if (!community) {
    return next(new Error("Community not found", { cause: 404 }));
  }
  const properties = await communityPropertiesModel.find({ communityId });
  return res.status(200).json({ message: "Success", properties });
};
export const DeleteProperty = async (req, res, next) => {
  const { communityId, id } = req.params;
  const community = await communityModel.findById(communityId);
  if (!community) {
    return next(new Error("Community not found", { cause: 404 }));
  }
  const property = await communityPropertiesModel.findByIdAndDelete(id);
  if (!property) {
    return next(new Error("Property not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "success" });
};
export const UpdateProperty = async (req, res, next) => {
  const { communityId, id } = req.params;

  // Find the community by its ID
  const community = await communityModel.findById(communityId);
  if (!community) {
    // If community is not found, return a simple error message
    return next(new Error("Community not found", { cause: 404 }));
  }

  // Find the property by its ID
  const property = await communityPropertiesModel.findById(id);
  if (!property) {
    // If property is not found, return a simple error message
    return next(new Error(`Property not found with ID ${id}`, { cause: 404 }));
  }

  // Update property fields if provided
  if (req.body.name) {
    property.name = req.body.name;
  }
  if (req.body.owner_fill) {
    property.owner_fill = req.body.owner_fill;
  }
  if (req.body.customer_fill) {
    property.customer_fill = req.body.customer_fill;
  }
  if (req.body.value) {
    property.value = req.body.value;
  }
  // Update the updatedBy field
  property.updatedBy = req.user._id;
  // Save the changes to the property
  await property.save();
  // Return success message
  return res.status(200).json({ message: "Property updated successfully" });
};

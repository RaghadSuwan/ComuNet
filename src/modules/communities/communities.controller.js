import cloudinary from "../../utils/cloudinary.js";
import communityModel from "../../../DB/model/community.model.js";
import { pagination } from "../../utils/pagination.js";
import slugify from "slugify";
import communityPropertiesModel from "../../../DB/model/communityProperties.modle.js";
import postModel from "../../../DB/model/post.modle.js";

export const CreateCommunity = async (req, res, next) => {
  const { name, description } = req.body;
  const lowercaseName = name.toLowerCase();
  if (await communityModel.findOne({ name: lowercaseName })) {
    return next(new Error("Community name already exists", { cause: 409 }));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.APP_NAME}/Communities`,
    }
  );
  const aCommunity = await communityModel.create({
    name: lowercaseName, // Use lowercaseName instead of name
    slug: slugify(lowercaseName),
    description,
    image: { secure_url, public_id },
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  return res
    .status(200)
    .json({ message: "Community created successfully", aCommunity });
};
export const GetCommunities = async (req, res, next) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  const Communities = await communityModel.find().skip(skip).limit(limit);
  //.populate('members');
  return res
    .status(200)
    .json({ message: "success", count: Communities.length, Communities });
};
export const SpecificCommunity = async (req, res, next) => {
  const { id } = req.params;
  const community = await communityModel.findById(id);
  if (!community) {
    return next(new Error("Community not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "success", community });
};
export const GetActiveCommunities = async (req, res, next) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  const communities = await communityModel
    .find({ status: "Active" })
    .skip(skip)
    .limit(limit)
    .select("name description image");
  return res
    .status(200)
    .json({ message: "success", count: communities.length, communities });
};
export const UpdateCommunity = async (req, res, next) => {
  const community = await communityModel.findById(req.params.id);
  if (!community) {
    return next(
      new Error(`Invalid community id ${req.params.id}`, { cause: 404 })
    );
  }
  if (req.body.name && req.body.name !== community.name) {
    const existingCommunity = await communityModel.findOne({
      name: req.body.name,
    });
    if (existingCommunity) {
      return next(
        new Error(`Community ${req.body.name} already exists`, { cause: 409 })
      );
    }
    const lowercaseName = req.body.name.toLowerCase();
    community.name = req.body.name;
    community.slug = slugify(lowercaseName);
  }
  
  // Update description if provided
  if (req.body.description) {
    community.description = req.body.description;
  }
  // Update status if provided
  if (req.body.status) {
    community.status = req.body.status;
  }
  // Update image if provided
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.APP_NAME}/Communities`,
      }
    );
    if (community.image && community.image.public_id) {
      await cloudinary.uploader.destroy(community.image.public_id);
    }
    community.image = { secure_url, public_id };
  }
  // Update the updatedBy field
  community.updatedBy = req.user._id;
  // Save the changes to the community
  await community.save();
  return res.status(200).json({ message: "Community updated successfully" });
};
export const DeleteCommunity = async (req, res, next) => {
  const { communityId } = req.params;
  const community = await communityModel.findByIdAndDelete(communityId);
  if (!community) {
    return next(new Error(`Community not found`, { cause: 404 }));
  }
  // await postModel.deleteMany({ categoryId });
  await communityPropertiesModel.deleteMany({ categoryId });
  return res.status(200).json({ message: "success" });
};

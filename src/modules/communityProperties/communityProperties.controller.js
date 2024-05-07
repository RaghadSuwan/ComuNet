import cloudinary from "../../utils/cloudinary.js";
import communityModel from "../../../DB/model/community.model.js";
import { pagination } from "../../utils/pagination.js";
import slugify from "slugify";
import communityPropertiesModel from "../../../DB/model/communityProperties.modle.js";
import postModel from "../../../DB/model/post.modle.js";

export const addProperty = async (req, res, next) => {
    const { propertyName, owner_fill, customer_fill, value } = req.body;
    const communityId = req.params.id;
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
    const { communityId, id } = req.params.id;
    const community = await communityModel.findById(communityId);
    if (!community) {
        return next(new Error("Community not found", { cause: 404 }));
    }
    const properties = await communityPropertiesModel.find({ id }); // استخدام communityPropertiesModel بدلاً من communityModel
    return res.status(200).json({ message: "Success", properties });
};
export const DeleteProperty = async (req, res, next) => {
    const { communityId, id } = req.params;
    const community = await communityModel.findById(communityId);
    if (!community) {
        const error = new Error("Community not found");
        error.status = 404;
        return next(error);
    }
    const property = await communityPropertiesModel.findByIdAndDelete(id);
    if (!property) {
        const error = new Error("Property not found");
        error.status = 404;
        return next(error);
    }
    return res.status(200).json({ message: "success" });
};



// export const updateProperty = async (req, res) => {
//     try {
//         const propertyId = req.params.id;
//         const updatedFields = req.body;
//         // التحقق من وجود الخاصية
//         const propertyInstance = await communityproperties.findById(propertyId);
//         if (!propertyInstance) {
//             return res
//                 .status(404)
//                 .json({ message: `Property not found with id: ${propertyId}` });
//         }
//         // التحقق من وجود اسم الخاصية المحدثة
//         if (updatedFields.propertyD) {
//             const existingProperty = await communityproperties.findOne({
//                 propertyD: updatedFields.propertyD,
//             });
//             if (existingProperty && existingProperty._id.toString() !== propertyId) {
//                 return res.status(409).json({
//                     message: `Property ${updatedFields.propertyD} name already exists`,
//                 });
//             }
//             propertyInstance.propertyD = updatedFields.propertyD;
//         }

//         // التحقق من وجود القيمة المحدثة
//         if (updatedFields.valueD) {
//             propertyInstance.valueD = updatedFields.valueD;
//         }

//         // التحقق من وجود العميل المحدث
//         if (updatedFields.customerFillD) {
//             propertyInstance.customerFillD = updatedFields.customerFillD;
//         }

//         // التحقق من وجود المالك المحدث
//         if (updatedFields.ownerFillD) {
//             propertyInstance.ownerFillD = updatedFields.ownerFillD;
//         }

//         // حفظ التغييرات
//         await propertyInstance.save();

//         return res.status(200).json({
//             message: "Property updated successfully",
//             property: propertyInstance,
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };
// export const viewProperty = async (req, res) => {
//     const { community_name } = req.params;
//     communityproperties
//         .find({ community_Name: community_name }, { __v: 0 })
//         .then((propertiesD) => {
//             res.send(propertiesD);
//         })
//         .catch((err) => {
//             res.send("something error");
//         });
// };
// export const deleteProperty = async (req, res) => {
//     const { community, id } = req.params;

//     if (!community || !id) {
//         return res.status(400).json({ msg: "Invalid community or property ID" });
//     }

//     try {
//         const result = await communityproperties.deleteOne({
//             community_Name: community,
//             _id: id, // Use _id for MongoDB ObjectId
//         });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ msg: "Property not found" });
//         }

//         return res.status(200).json({ msg: "Property deleted successfully" });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ msg: "Internal Server Error" });
//     }
// };

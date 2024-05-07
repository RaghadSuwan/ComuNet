import { Router } from "express";
import * as CPropertiesController from "./communityProperties.controller.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./communityProperties.endPoint.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./communityProperties.validation .js";
const router = Router({ mergeParams: true });


router.post("/",
    auth(endPoint.addProperty),
    asyncHandler(CPropertiesController.addProperty));
router.get("/",
    auth(endPoint.viewProperty),
    asyncHandler(CPropertiesController.GetProperties));
router.delete("/:id",
    auth(endPoint.deleteProperty),
    asyncHandler(CPropertiesController.DeleteProperty));

// router.post("/cancleCreation", communitycontroller.cancleCreation);
// router.delete(
//   "/:community/deleteProperty/:id",
//   communitycontroller.deleteProperty
// );
// router.put("/prparty/:id", communitycontroller.updateProperty); //مش شغال منيح

export default router;

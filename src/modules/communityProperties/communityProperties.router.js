import { Router } from "express";
import * as CPropertiesController from "./communityProperties.controller.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./communityProperties.endPoint.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./communityProperties.validation .js";
const router = Router({ mergeParams: true });


router.post("/",
    auth(endPoint.addProperty),
    validation(validator.add),
    asyncHandler(CPropertiesController.addProperty));
router.get("/",
auth(Object.values(roles)),
asyncHandler(CPropertiesController.GetProperties));
router.delete("/:id",
    auth(endPoint.deleteProperty),
    asyncHandler(CPropertiesController.DeleteProperty));
router.put("/:id", auth(endPoint.updateProperty), CPropertiesController.UpdateProperty);

export default router;

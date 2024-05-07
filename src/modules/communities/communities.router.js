import { Router } from "express";
import * as communitiesController from "./communities.controller.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import CPropertiesRouter from '../../modules/communityProperties/communityProperties.router.js';

import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./communities.endPoint.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./communities.validation .js";
const router = Router();

router.use('/:id', CPropertiesRouter);
router.get(
    "/",
    auth(endPoint.getAll),
    asyncHandler(communitiesController.GetCommunities)
);
router.get("/active", asyncHandler(communitiesController.GetActiveCommunities));
router.delete(
    "/:communityId",
    auth(endPoint.delete),
    asyncHandler(communitiesController.DeleteCommunity)
);
router.get(
    "/:id",
    validation(validator.specificCommunity),
    asyncHandler(communitiesController.SpecificCommunity)
);
router.post(
    "/",
    auth(endPoint.create),
    fileUpload(fileValidation.image).single("image"),
    validation(validator.createCommunity),
    asyncHandler(communitiesController.CreateCommunity)
);
router.put(
    "/:id",
    auth(endPoint.update),
    fileUpload(fileValidation.image).single("image"),
    asyncHandler(communitiesController.UpdateCommunity)
);

export default router;

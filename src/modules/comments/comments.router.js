import { Router } from "express";
import * as communitiesController from "./comments.controller.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./comments.endPoint.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./comments.validation .js";
const router = Router({ mergeParams: true });



export default router;

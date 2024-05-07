import { Router } from "express";
import * as postsController from "./posts.controller.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./posts.endPoint.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./posts.validation .js";
import commentsRouter from '../comments/comments.router.js';

const router = Router();

router.use('/:postId', commentsRouter);


export default router;

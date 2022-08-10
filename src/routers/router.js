import { Router } from "express";
import authRouter from "./authRouter.js";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js"


const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagRouter);

export default router;
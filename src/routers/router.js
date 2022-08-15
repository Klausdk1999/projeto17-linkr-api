import { Router } from "express";
import postRouter from "../routes/postsRouter.js";
import authRouter from "./authRouter.js";
import timelineRouter from "./timelineRouter.js";


const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(postRouter);

export default router;
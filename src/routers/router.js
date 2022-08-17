import { Router } from "express";
import authRouter from "./authRouter.js";
import commentRouter from "./commentRouter.js";
import followRouter from "./followRouter.js";
import likeRouter from "./likeRouter.js";
import postRouter from "./postRouter.js";
import timelineRouter from "./timelineRouter.js";

const router = Router();

router.use(authRouter);
router.use(commentRouter);
router.use(followRouter);
router.use(likeRouter);
router.use(postRouter);
router.use(timelineRouter);

export default router;
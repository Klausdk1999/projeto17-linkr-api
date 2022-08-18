import { Router } from "express";
import authRouter from "./authRouter.js";
import timelineRouter from "./timelineRouter.js";
import followRouter from "./followRouter.js";
import commentRouter from "./commentRouter.js";
import repostRouter from "./repostRouter.js";


const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(commentRouter);
router.use(followRouter);
router.use(repostRouter);

//
export default router;
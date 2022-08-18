import { Router } from "express";
import authRouter from "./authRouter.js";
import commentRouter from "./commentRouter.js";
<<<<<<< HEAD
import repostRouter from "./repostRouter.js";

=======
import followRouter from "./followRouter.js";
import likeRouter from "./likeRouter.js";
import postRouter from "./postRouter.js";
import timelineRouter from "./timelineRouter.js";
>>>>>>> 37f58f94481fe3fdcb45d9fec502df804313f91f

const router = Router();

router.use(authRouter);
router.use(commentRouter);
router.use(followRouter);
<<<<<<< HEAD
router.use(repostRouter);

//
=======
router.use(likeRouter);
router.use(postRouter);
router.use(timelineRouter);

>>>>>>> 37f58f94481fe3fdcb45d9fec502df804313f91f
export default router;
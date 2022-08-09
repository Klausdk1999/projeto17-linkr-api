import { Router } from "express";

import validateSchema from "../middlewares/validations/schemaValidation.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const router = Router();

router.post("/signup" ,validateSchema(signUpSchema), signUp);
router.post("/signin",validateSchema(signInSchema), signIn);

export default router;
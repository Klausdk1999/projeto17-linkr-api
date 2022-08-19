import { Router } from "express";

import validateSchema from "../middlewares/validations/schemaValidation.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUp, signIn} from "../controllers/authController.js";
import authenticateToken from "../middlewares/validations/tokenAuthentication.js";

const authRouter = Router();

authRouter.post("/signup" ,validateSchema(signUpSchema), signUp);
authRouter.post("/signin",validateSchema(signInSchema), signIn);



export default authRouter;
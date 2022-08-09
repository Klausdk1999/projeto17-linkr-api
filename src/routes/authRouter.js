import { Router } from "express";

import validateSchema from "../middlewares/validations/schemaValidation.js"; 

const router = Router();

//router.post("/signup" ,validateSchema(signUpSchema), signUp);
//router.post("/signin",validateSchema(signInSchema), signIn);

export default router;
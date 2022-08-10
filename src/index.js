import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import urlRouter from "./routers/urlsRouter.js";
//import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import router from "./routes/postsRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//app.use(userRouter);
//app.use(urlRouter);
app.use(authRouter);
app.use(router)



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>  console.log("Server running on port " + PORT));
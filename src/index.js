import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/router.js";
import routerPost from "./routes/postsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//app.use(userRouter);
//app.use(urlRouter);

app.use(router)



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>  console.log("Server running on port " + PORT));
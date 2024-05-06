import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import connectDB from "../../DB/connection.js";
import communitiesRouter from './communities/communities.router.js';
import { globalerrorhandler } from "../utils/errorHanding.js";
import cors from "cors";

const initapp = async (app, express) => {
  app.use(cors());
  app.use(express.json());
  connectDB();
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome.." });
  });
  app.use(express.static("./"));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/communities", communitiesRouter);

  app.get("*", (req, res) => {
    return res.status(500).json({ message: "Page not found.." });
  });
  app.use(globalerrorhandler);
};

export default initapp;

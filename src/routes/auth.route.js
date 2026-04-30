import express from "express";
import {
  showAuthPage,
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/register", showAuthPage);
authRouter.post("/register", register);

authRouter.get("/login", showAuthPage);
authRouter.post("/login", login);

authRouter.get("/logout", logout);

export default authRouter;

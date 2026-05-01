import express from "express";
import {
  showAuthPage,
  register,
  login,
  logout,
  updateUsername,
  updatePassword,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// register
authRouter.get("/register", showAuthPage);
authRouter.post("/register", register);
// login
authRouter.get("/login", showAuthPage);
authRouter.post("/login", login);
// logout
authRouter.get("/logout", logout);
// profile page
authRouter.get("/profile", authMiddleware, (req, res) => {
  res.render("profile/profile");
});
// update username
authRouter.post("/profile/username", authMiddleware, updateUsername);
// update password
authRouter.post("/profile/password", authMiddleware, updatePassword);

export default authRouter;

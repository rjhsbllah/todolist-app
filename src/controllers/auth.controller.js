import User from "../models/auth.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { generateToken } from "../helpers/jwt.js";

// show auth page
export const showAuthPage = (req, res) => {
  res.render("auth/auth", {
    layout: "layouts/auth",
  });
};

// register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    await User.create({
      username,
      password: hashedPassword,
    });

    req.flash("success", "Registrasi berhasil, silakan login");
    res.redirect("/login");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat registrasi");
    res.redirect("/register");
  }
};

// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      req.flash("error", "User tidak ditemukan");
      return res.redirect("/login");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      req.flash("error", "Password salah");
      return res.redirect("/login");
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });

    req.flash("success", "Login berhasil");
    res.redirect("/todos");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat login");
    res.redirect("/login");
  }
};

// logout
export const logout = (req, res) => {
  res.clearCookie("token");

  req.flash("success", "Berhasil logout");
  res.redirect("/login");
};

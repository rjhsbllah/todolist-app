import User from "../models/auth.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { generateToken } from "../helpers/jwt.js";

// show auth page
const showAuthPage = (req, res) => {
  res.render("auth/auth", {
    layout: "layouts/auth",
  });
};

// register
const register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Password tidak sama");
      return res.redirect("/register");
    }

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
const login = async (req, res) => {
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    req.flash("success", "Login berhasil");
    res.redirect("/todos");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat login");
    res.redirect("/login");
  }
};

// logout
const logout = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Berhasil logout");
  res.redirect("/login");
};

// update username
const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      req.flash("error", "Username tidak boleh kosong");
      return res.redirect("/profile");
    }

    const existing = await User.findOne({ username });
    if (existing) {
      req.flash("error", "Username sudah digunakan");
      return res.redirect("/profile");
    }

    await User.findByIdAndUpdate(req.user.id, { username });

    const updatedUser = await User.findById(req.user.id);
    const newToken = generateToken(updatedUser);

    res.cookie("token", newToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    req.flash("success", "Username berhasil diubah");
    res.redirect("/profile");
  } catch (err) {
    req.flash("error", "Gagal update username");
    res.redirect("/profile");
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      req.flash("error", "Password lama salah");
      return res.redirect("/profile");
    }

    if (newPassword !== confirmPassword) {
      req.flash("error", "Password tidak sama");
      return res.redirect("/profile");
    }

    const hashed = await hashPassword(newPassword);

    await User.findByIdAndUpdate(req.user.id, {
      password: hashed,
    });

    req.flash("success", "Password berhasil diubah, silakan login ulang");

    res.clearCookie("token");
    res.redirect("/login");
  } catch (err) {
    req.flash("error", "Gagal update password");
    res.redirect("/profile");
  }
};

export {
  showAuthPage,
  register,
  login,
  logout,
  updateUsername,
  updatePassword,
};

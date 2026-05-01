import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import todosRouter from "./routes/todos.route.js";
import authRouter from "./routes/auth.route.js";

import applyAppMiddleware from "./middlewares/app.middleware.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

applyAppMiddleware(app);

app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// routes
app.use("/", authRouter);
app.use("/todos", authMiddleware, todosRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

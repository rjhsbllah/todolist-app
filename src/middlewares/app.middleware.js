import express from "express";
import multer from "multer";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "express-flash";

const upload = multer();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function applyAppMiddleware(app) {
  app.use(expressEjsLayouts);
  app.set("layout", "layouts/main");

  app.use(express.static(path.join(__dirname, "../../public")));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(upload.array());

  app.use(methodOverride("_method"));

  app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.use(flash());
}

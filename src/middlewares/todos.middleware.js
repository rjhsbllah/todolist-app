import express from "express";
import bodyParser from "body-parser";
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

export default function todosMiddleware(app) {
  // Layout EJS
  app.use(expressEjsLayouts);
  app.set("layout", "layouts/main");

  // Static file
  app.use(express.static(path.join(__dirname, "../../public")));

  // Body-Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Multer
  app.use(upload.array());

  // Method Override
  app.use(methodOverride("_method"));

  // Session
  app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: true,
    }),
  );

  // Flash
  app.use(flash());
}

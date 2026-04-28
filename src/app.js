import express from "express";
import todosRouter from "./routes/todos.route.js";
import path from "path";
import { fileURLToPath } from "url";
import todosMiddleware from "./middlewares/todos.middleware.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set folder views & view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
console.log(typeof todosMiddleware);
// call middleware
todosMiddleware(app);

// routes
app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server running at port 3000`);
});

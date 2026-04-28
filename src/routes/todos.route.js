import express from "express";
import {
  getAll,
  postTodos,
  deleteTodos,
  updateTodos,
  completedBtn,
} from "../controllers/todos.controller.js";
import todos from "../models/todos.js";

const todosRouter = express.Router();

todosRouter.get("/", getAll);
todosRouter.post("/", postTodos);
todosRouter.delete("/:id", deleteTodos);
todosRouter.put("/:id", updateTodos);
todosRouter.patch("/:id/toggle", completedBtn);

export default todosRouter;

import {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
} from "../services/todosService.js";

const getAll = async (req, res) => {
  const allTodos = await getAllTodos(req.user.id);

  res.render("todos/index", {
    layout: "layouts/main",
    data: allTodos,
  });
};

const postTodos = async (req, res) => {
  try {
    await createTodo(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Tugas berhasil ditambahkan",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodos = async (req, res) => {
  try {
    await deleteTodo(req.params.id, req.user.id);

    req.flash("success", "Tugas Berhasil Dihapus");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);

    req.flash("error", "Gagal Menghapus Tugas");
    res.redirect("/todos");
  }
};

const updateTodos = async (id, data, userId) => {
  if (data.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(data.dueDate);

    if (dueDate < today) {
      throw new Error("Tanggal deadline tidak valid");
    }
  }

  return await todos.findOneAndUpdate({ _id: id, user: userId }, data, {
    new: true,
  });
};

const completedBtn = async (req, res) => {
  try {
    const todo = await toggleComplete(req.params.id, req.user.id);

    res.json({
      message: todo.completed ? "Tugas selesai" : "Tugas dibatalkan",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export { getAll, postTodos, deleteTodos, updateTodos, completedBtn };

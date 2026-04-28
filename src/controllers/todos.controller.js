import {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
} from "../services/todosService.js";

const getAll = async (req, res) => {
  const allTodos = await getAllTodos();

  res.render("todos/index", {
    layout: "layouts/main",
    data: allTodos,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const postTodos = async (req, res) => {
  try {
    await createTodo(req.body);

    return res.status(201).json({
      success: true,
      message: "Tugas berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan tugas",
    });
  }
};

const deleteTodos = async (req, res) => {
  try {
    await deleteTodo(req.params.id);

    req.flash("success", "Tugas Berhasil Dihapus");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);

    req.flash("error", "Gagal Menghapus Tugas");
    res.redirect("/todos");
  }
};

const updateTodos = async (req, res) => {
  try {
    await updateTodo(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });

    req.flash("success", "Tugas Berhasil Diedit");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);

    req.flash("error", "Gagal Edit Tugas");
    res.redirect("/todos");
  }
};

const completedBtn = async (req, res) => {
  try {
    const todo = await toggleComplete(req.params.id);

    res.json({
      message: todo.completed ? "Tugas selesai" : "Tugas dibatalkan",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAll, postTodos, deleteTodos, updateTodos, completedBtn };

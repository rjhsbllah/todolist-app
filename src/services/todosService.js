import todos from "../models/todos.js";

const getAllTodos = async (userId) => {
  return await todos.find({ user: userId }).sort({ createdAt: 1 });
};

const createTodo = async (data, userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(data.dueDate);

  if (dueDate < today) {
    throw new Error("Tanggal deadline tidak boleh sebelum hari ini");
  }

  return await todos.create({
    ...data,
    user: userId,
  });
};

const deleteTodo = async (id, userId) => {
  return await todos.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

const updateTodo = async (id, data, userId) => {
  return await todos.findOneAndUpdate({ _id: id, user: userId }, data, {
    new: true,
  });
};

const toggleComplete = async (id, userId) => {
  const todo = await todos.findOne({
    _id: id,
    user: userId,
  });

  if (!todo) {
    throw new Error("Data tidak ditemukan / bukan milik user");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(todo.dueDate);

  if (!todo.completed && dueDate < today) {
    throw new Error(
      "Tugas sudah melewati deadline dan tidak dapat diselesaikan",
    );
  }

  todo.completed = !todo.completed;
  await todo.save();

  return todo;
};

export { getAllTodos, createTodo, deleteTodo, updateTodo, toggleComplete };

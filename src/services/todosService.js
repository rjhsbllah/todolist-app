import todos from "../models/todos.js";

const getAllTodos = async () => {
  return await todos.find().sort({ createdAt: 1 });
};

const createTodo = async (data) => {
  return await todos.create(data);
};

const deleteTodo = async (id) => {
  return await todos.findByIdAndDelete(id);
};

const updateTodo = async (id, data) => {
  return await todos.findByIdAndUpdate(id, data, { new: true });
};

const toggleComplete = async (id) => {
  const todo = await todos.findById(id);

  if (!todo) {
    throw new Error("Data tidak ditemukan");
  }

  todo.completed = !todo.completed;
  await todo.save();

  return todo;
};

export { getAllTodos, createTodo, deleteTodo, updateTodo, toggleComplete };

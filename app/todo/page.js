"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // auth check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      const stored = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(stored);
    }
  }, []);

  const saveTodos = (updated) => {
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  // ADD
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const updated = [
      ...todos,
      { id: Date.now(), text: newTodo, completed: false },
    ];
    saveTodos(updated);
    setNewTodo("");
  };

  // TOGGLE
  const toggleTodo = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTodos(updated);
  };

  // DELETE
  const deleteTodo = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  // EDIT START
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // SAVE EDIT
  const saveEdit = () => {
    if (!editingText.trim()) return;

    const updated = todos.map((t) =>
      t.id === editingId ? { ...t, text: editingText } : t
    );

    saveTodos(updated);
    setEditingId(null);
    setEditingText("");
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-700">
            My Todos
          </h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        {/* ADD INPUT */}
        <div className="flex gap-2 mb-5">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* EMPTY STATE */}
        {todos.length === 0 && (
          <p className="text-center text-slate-400">
            No tasks yet ✨
          </p>
        )}

        {/* TODO LIST */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-slate-50 p-3 rounded-xl hover:shadow-sm transition"
            >
              {/* LEFT SIDE */}
              <div className="flex-1">
                {editingId === todo.id ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full border p-1 rounded"
                  />
                ) : (
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={`cursor-pointer ${
                      todo.completed
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 ml-3">
                {editingId === todo.id ? (
                  <button
                    onClick={saveEdit}
                    className="text-green-500 hover:text-green-600 text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}np
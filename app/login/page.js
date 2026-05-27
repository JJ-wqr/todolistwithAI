"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (email === "admin@test.com" && password === "1234") {
      localStorage.setItem("user", email);
      router.push("/todo");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-slate-200 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-md border border-slate-200 p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-sm text-slate-500 text-center mb-6">
          Login to continue
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-slate-300 p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-300 p-3 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition">
          Login
        </button>

        <p className="text-xs text-slate-400 mt-4 text-center">
          admin@test.com / 1234
        </p>
      </form>
    </main>
  );
}
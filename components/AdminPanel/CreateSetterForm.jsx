"use client";

import { useState } from "react";

export default function CreateSetterForm({
  onSubmit,
  onCancel,
  errorMessage,
  successMessage,
}) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    // Reset form on success
    if (!errorMessage) {
      setForm({ name: "", username: "", password: "" });
    }
  };

  return (
    <div className="mb-6 bg-zinc-800/70 rounded-lg p-6 border border-zinc-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Create New Setter
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-zinc-300 text-sm">
              Setter Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-zinc-300 text-sm">
              Setter Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-zinc-300 text-sm">
              Setter Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg px-4 py-2 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-green-400 bg-green-900/20 border border-green-800/50 rounded-lg px-4 py-2 text-sm">
            {successMessage}
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Create Setter
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-zinc-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-zinc-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

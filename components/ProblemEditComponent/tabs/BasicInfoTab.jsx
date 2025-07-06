"use client";

export default function BasicInfoTab({ problemData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b pb-2 border-zinc-700">
        Problem Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Problem Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={problemData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter a descriptive problem name"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={problemData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Author name"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Topic/Tags
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={problemData.topic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Dynamic Programming, Graphs, Strings (comma separated)"
          />
        </div>
      </div>
    </div>
  );
}

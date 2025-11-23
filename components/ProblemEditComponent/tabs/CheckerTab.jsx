"use client";

export default function CheckerTab({ problemData, setProblemData }) {
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setProblemData((prev) => ({
      ...prev,
      checker_type: newType,
      checker_precision:
        newType === "float" ? prev.checker_precision || "1e-6" : null,
    }));
  };

  const handleStrictSpaceChange = (e) => {
    setProblemData((prev) => ({
      ...prev,
      checker_strict_space: e.target.checked,
    }));
  };

  const handlePrecisionChange = (e) => {
    setProblemData((prev) => ({
      ...prev,
      checker_precision: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b pb-2 border-zinc-700">
        Checker Configuration
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Checker Type Dropdown */}
        <div>
          <label
            htmlFor="checker_type"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Type
          </label>
          <select
            id="checker_type"
            name="checker_type"
            value={problemData.checker_type || "string"}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="string">String</option>
            <option value="int">Int</option>
            <option value="float">Float</option>
          </select>
        </div>

        {/* Strict Space Checkbox - Show for String, Int, and Float */}
        {(problemData.checker_type === "string" ||
          problemData.checker_type === "int" ||
          problemData.checker_type === "float") && (
          <div className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-md border border-zinc-700">
            <div className="flex-1">
              <label
                htmlFor="checker_strict_space"
                className="font-medium text-zinc-200 cursor-pointer"
              >
                Strict Space
              </label>
              <p className="text-zinc-400 mt-1 text-sm">
                If enabled, each token and spaces are required to match exactly.
              </p>
            </div>
            <div className="flex items-center ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="checker_strict_space"
                  name="checker_strict_space"
                  type="checkbox"
                  checked={problemData.checker_strict_space || false}
                  onChange={handleStrictSpaceChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Precision Dropdown - Only for Float */}
        {problemData.checker_type === "float" && (
          <div>
            <label
              htmlFor="checker_precision"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Precision
            </label>
            <select
              id="checker_precision"
              name="checker_precision"
              value={problemData.checker_precision || "1e-6"}
              onChange={handlePrecisionChange}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="1e-4">1e-4</option>
              <option value="1e-6">1e-6</option>
              <option value="1e-8">1e-8</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

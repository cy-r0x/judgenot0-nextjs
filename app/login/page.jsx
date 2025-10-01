"use client";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/ButtonComponent/Button";
import Bar from "@/components/BarComponent/BarComponent";
import { useRouter } from "next/navigation";
import userMoudle from "@/api/user/user";

export default () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = userMoudle.Login(formData.username, formData.password);
    if (response.error) {
      return;
    }
    router.push("/");
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
        <div className="space-y-2">
          <Bar title={"Login"} center={true} />
          <div className="bg-zinc-800 inline-flex flex-col justify-center items-center p-10">
            {error && (
              <div className="mb-4 p-3 bg-red-500 text-white rounded text-center text-sm">
                {error}
              </div>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex gap-4 items-center">
                <label htmlFor="username">
                  <FaUser size={24} className="text-zinc-400" />
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="border-2 border-zinc-700 bg-zinc-900 text-center p-2 rounded w-72 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-4 items-center">
                <label htmlFor="password">
                  <FaLock size={24} className="text-zinc-400" />
                </label>
                <div className="relative w-72">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-2 border-zinc-700 bg-zinc-900 text-center p-2 rounded w-full outline-none focus:border-orange-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                name={isLoading ? "Logging in..." : "Login"}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

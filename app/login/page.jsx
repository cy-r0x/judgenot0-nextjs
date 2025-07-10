"use client";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/ButtonComponent/Button";
import Bar from "@/components/BarComponent/BarComponent";
import { useRouter } from "next/navigation";

export default () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    router.push("/");
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
        <div className="space-y-2">
          <Bar title={"Login"} center={true} />
          <div className="bg-zinc-800 inline-flex flex-col justify-center items-center p-10">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex gap-4 items-center">
                <label htmlFor="userId">
                  <FaUser size={24} className="text-zinc-400" />
                </label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="User ID"
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

              <Button name={"Login"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

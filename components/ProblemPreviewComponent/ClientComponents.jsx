"use client";
import { useState } from "react";
import Bar from "../BarComponent/BarComponent";
import Button from "../ButtonComponent/Button";
import Link from "next/link";
import CodeEditor from "@/components/EditorComponent/EditorComponent";
import NotificationComponent from "@/components/NotificationComponent/NotificationComponent";
import { compileAndRun } from "@/utils/compileRun";
import { getVerdictName } from "@/utils/verdictFormatter";

export function EditorSection({ problem, problemID }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setNotification({
        visible: true,
        message: "Source code cannot be empty",
        type: "error",
      });
      return;
    }

    if (selectedLanguage === "") {
      setNotification({
        visible: true,
        message: "Select programming language",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setNotification({ visible: false, message: "", type: "info" });

    const data = {
      submission_id: null,
      problem_id: null,
      language: selectedLanguage,
      source_code: code,
      testcases: problem.test_cases || [],
      time_limit: problem.time_limit,
      memory_limit: problem.memory_limit,
      checker_precision: problem.checker_precision,
      checker_strict_space: problem.checker_strict_space,
      checker_type: problem.checker_type,
    };

    const { data: responseData, error } = await compileAndRun(data);

    setIsSubmitting(false);

    if (error) {
      setNotification({
        visible: true,
        message: error,
        type: "error",
      });
      return;
    }

    if (responseData && responseData.result) {
      const verdictName = getVerdictName(responseData.result);
      const notificationType =
        responseData.result.toLowerCase() === "ac" ? "success" : "error";

      setNotification({
        visible: true,
        message: `Result: ${verdictName}`,
        type: notificationType,
      });
    } else {
      setNotification({
        visible: true,
        message: "Unexpected response from server",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Actions Section */}
      {/* <div className="bg-zinc-800/50 rounded-lg border border-zinc-700">
        <div className="px-4 py-3 border-b border-zinc-700">
          <h2 className="text-lg font-semibold text-white">Actions</h2>
        </div>
        <div className="p-4 flex gap-3">
          <Link href={`/edit/problem/${problemID}`}>
            <Button name={"Edit Problem"} />
          </Link>
          <Button
            name={"Share"}
            bgColor="bg-zinc-700"
            hoverColor="bg-zinc-600"
          />
        </div>
      </div> */}

      {/* Code Editor Section */}
      <div className="flex-1 flex flex-col bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 p-6 overflow-hidden">
          {/* Language Selector and Submit Button */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label
                htmlFor="language-select"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Programming Language
              </label>
              <select
                name="language"
                id="language-select"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="" disabled>
                  Select Language
                </option>
                <option value="c">GNU GCC11</option>
                <option value="cpp">GNU G++23</option>
                <option value="py">Python 3.10</option>
              </select>
            </div>
            <Button
              name={isSubmitting ? "Submitting..." : "Submit Solution"}
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </div>

          {/* Code Editor */}
          <div className="flex-1 border border-zinc-600 rounded-md overflow-hidden shadow-lg max-h-[665px]">
            <CodeEditor
              handleChange={setCode}
              selectedLanguage={selectedLanguage}
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      <NotificationComponent
        message={notification.message}
        type={notification.type}
        isVisible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
        duration={3000}
      />
    </div>
  );
}

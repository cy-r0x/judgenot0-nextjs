"use client";
import { useState, useEffect } from "react";
import CodeEditor from "@/components/EditorComponent/EditorComponent";
import Button from "@/components/ButtonComponent/Button";
import submissionModule from "@/api/submission/submission";
import { useRouter } from "next/navigation";
import NotificationComponent from "@/components/NotificationComponent/NotificationComponent";
import { compileAndRun } from "@/api/compile_run/compileRun";
import { getVerdictName } from "@/utils/verdictFormatter";

// Client-side component for copying text to clipboard
export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`absolute top-2 right-2 p-1 rounded  transition-colors ${
        copied ? "bg-orange-500" : " bg-zinc-800 hover:bg-zinc-700"
      }`}
      title="Copy to clipboard"
      disabled={copied}
    >
      {copied ? <p>Copied</p> : <p>Copy</p>}
    </button>
  );
}

// Client-side component for the editor section
export function EditorSection({ problemData, contestId }) {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  const [feedback, setFeedback] = useState({
    visible: false,
    message: "",
  });

  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const router = useRouter();

  // Effect to hide the banner after 5 seconds
  useEffect(() => {
    let timer;
    if (feedback.visible) {
      timer = setTimeout(() => {
        setFeedback((prev) => ({ ...prev, visible: false }));
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [feedback.visible]);

  const handleCompileRun = async () => {
    if (!code.trim()) {
      setNotification({
        visible: true,
        message: "Source code cannot be empty",
        type: "error",
      });
      return;
    }

    setIsCompiling(true);
    setNotification({ visible: false, message: "", type: "info" });

    const data = {
      submission_id: null,
      problem_id: null,
      language: selectedLanguage,
      source_code: code,
      testcases: problemData.test_cases || [],
      time_limit: problemData.time_limit,
      memory_limit: problemData.memory_limit,
    };

    const { data: responseData, error } = await compileAndRun(data);

    setIsCompiling(false);

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
        message: `Sample: ${verdictName}`,
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

  const handleSubmit = async () => {
    if (!code.trim()) {
      setFeedback({
        visible: true,
        message: "Source code cannot be empty",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback((prev) => ({ ...prev, visible: false }));

    const activeContestId = contestId ?? problemData.contest_id;

    const { data, error } = await submissionModule.submitSubmission({
      problem_id: problemData.id,
      contest_id: activeContestId,
      source_code: code,
      language: selectedLanguage,
    });

    if (error) {
      setFeedback({
        visible: true,
        message: error,
      });
      setIsSubmitting(false);
      return;
    }

    const submissionId =
      data?.submission_id || data?.id || data?.submission?.id;

    if (!submissionId) {
      setFeedback({
        visible: true,
        message: "Submission succeeded but no submission ID returned",
      });
      setIsSubmitting(false);
      return;
    }

    router.push(`/contests/${activeContestId}/submissions/${submissionId}`);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="w-[40%] border-l flex flex-col px-4 py-2">
      <div className="mb-3 flex justify-between items-center">
        <div>
          <select
            name="language"
            id="language-select"
            className="p-2 border rounded w-full bg-zinc-800"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-3">
          <Button
            name={isCompiling ? "Compiling..." : "Compile and Run"}
            onClick={handleCompileRun}
            disabled={isCompiling}
          />
          <Button
            name={isSubmitting ? "Submitting..." : "Submit"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex-grow">
        <CodeEditor
          handleChange={setCode}
          selectedLanguage={selectedLanguage}
        />
      </div>
      {/* Result Banner */}
      {feedback.visible ? (
        <div className="mt-3 rounded border border-red-500 px-3 py-2 text-sm text-red-300">
          {feedback.message}
        </div>
      ) : null}
      {/* Notification */}
      <NotificationComponent
        message={notification.message}
        type={notification.type}
        isVisible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
        duration={2000}
      />
    </div>
  );
}

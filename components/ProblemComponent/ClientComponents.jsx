"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "@/components/EditorComponent/EditorComponent";
import Button from "@/components/ButtonComponent/Button";

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
      className="absolute top-2 right-2 p-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
}

// Banner component for displaying submission results
function ResultBanner({ result, visible, onClose }) {
  const isAccepted = result === "Accepted";

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-md shadow-md transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${isAccepted ? "bg-green-600" : "bg-red-600"} text-white font-semibold`}
    >
      <div className="flex items-center justify-between">
        <span>{result}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

// Client-side component for the editor section
export function EditorSection({ problemData }) {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resultBanner, setResultBanner] = useState({
    visible: false,
    result: "",
  });

  // Effect to hide the banner after 5 seconds
  useEffect(() => {
    let timer;
    if (resultBanner.visible) {
      timer = setTimeout(() => {
        setResultBanner((prev) => ({ ...prev, visible: false }));
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resultBanner.visible]);

  const handleCompileRun = () => {
    console.log("Compile and Run - Problem Data:", problemData);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Encode the code in base64 UTF-8 format
      const encodedCode = btoa(unescape(encodeURIComponent(code)));

      console.log("Submitting code...");
      console.log("Encoded code length:", encodedCode.length);

      // Prepare request data
      const requestData = {
        testCases: problemData?.testCases || [],
        time: problemData?.time || 1000,
        memory: problemData?.memory || 128,
        code: encodedCode,
        language: selectedLanguage,
      };

      console.log("Trying to connect to backend via proxy...");

      const response = await axios.post("/api/submit", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Submit response:", response.data);

      // Show result banner
      if (response.data && response.data.result) {
        setResultBanner({
          visible: true,
          result: response.data.result,
        });
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);

        // Show error result if available
        if (error.response.data && error.response.data.result) {
          setResultBanner({
            visible: true,
            result: error.response.data.result,
          });
        } else {
          setResultBanner({
            visible: true,
            result: "Error",
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          "No response received. Server might be down or connectivity issues."
        );
        setResultBanner({
          visible: true,
          result: "Network Error",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setResultBanner({
          visible: true,
          result: "Error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const closeBanner = () => {
    setResultBanner((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="w-[35%] border-l flex flex-col p-4">
      <div className="mb-3">
        <select
          name="language"
          id="language-select"
          className="p-2 border rounded w-full"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div className="flex-grow">
        <CodeEditor onChange={setCode} />
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <Button name={"Compile and Run"} onClick={handleCompileRun} />
        <Button
          name={isSubmitting ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>

      {/* Result Banner */}
      <ResultBanner
        result={resultBanner.result}
        visible={resultBanner.visible}
        onClose={closeBanner}
      />
    </div>
  );
}

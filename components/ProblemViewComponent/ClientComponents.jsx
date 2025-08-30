"use client";
import { useState, useEffect } from "react";
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
    console.log(code);
  };

  const handleSubmit = async () => {
    const requestData = {
      testCases: [
        ...problemData.sampleTestCases,
        ...problemData.regularTestCases,
      ],
      timeLimit: problemData.timeLimit,
      memoryLimit: problemData.memoryLimit,
      code: code,
      language: selectedLanguage,
    };
    console.log(requestData);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const closeBanner = () => {
    setResultBanner((prev) => ({ ...prev, visible: false }));
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
          <Button name={"Compile and Run"} onClick={handleCompileRun} />
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
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            syntaxHighlighting: true,
            bracketMatching: true,
            rectangularSelection: false,
            crosshairCursor: false,
            highlightActiveLine: false,
            highlightSelectionMatches: true,
            closeBrackets: false,
            autocompletion: false,
            tabSize: 2,
          }}
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

"use client";

import { useState } from "react";
import BasicInfoTab from "./tabs/BasicInfoTab";
import DescriptionTab from "./tabs/DescriptionTab";
import TestCasesTab from "./tabs/TestCasesTab";
import LimitsTab from "./tabs/LimitsTab";
import SolutionsTab from "./tabs/SolutionsTab";
import TestCaseModal from "./modals/TestCaseModal";
import SolutionModal from "./modals/SolutionModal";
import Button from "@/components/ButtonComponent/Button";

export default function ProblemEditComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [problemData, setProblemData] = useState({
    name: "",
    author: "",
    topic: "",
    description: "",
    inputDescription: "",
    outputDescription: "",
    sampleTestCases: [],
    regularTestCases: [],
    timeLimit: 1000, // ms
    memoryLimit: 256, // MB
    solutions: [],
  });

  // Modal states
  const [showTestCaseModal, setShowTestCaseModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [currentTestCaseType, setCurrentTestCaseType] = useState("sample"); // "sample" or "regular"
  const [currentTestCase, setCurrentTestCase] = useState({
    input: "",
    output: "",
  });
  const [currentSolution, setCurrentSolution] = useState({
    language: "cpp",
    source: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1); // -1 for new, >= 0 for editing existing

  const tabs = [
    "Basic Info",
    "Problem Description",
    "Test Cases",
    "Limits",
    "Solutions",
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving problem data:", problemData);
    // Implement actual save logic here
  };

  return (
    <div className="p-2">
      <div className="max-w-6xl mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header with Tabs and Save Button */}
        <div className="flex justify-between items-center border-b border-zinc-700">
          <div className="flex">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`px-4 py-3 transition-colors cursor-pointer ${
                  activeTab === index
                    ? "bg-orange-500 text-white font-medium"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pr-6">
            <Button name="Save Changes" onClick={handleSave} />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 0 && (
            <BasicInfoTab
              problemData={problemData}
              handleInputChange={handleInputChange}
            />
          )}
          {activeTab === 1 && (
            <DescriptionTab
              problemData={problemData}
              setProblemData={setProblemData}
            />
          )}
          {activeTab === 2 && (
            <TestCasesTab
              problemData={problemData}
              setProblemData={setProblemData}
              setShowTestCaseModal={setShowTestCaseModal}
              setCurrentTestCaseType={setCurrentTestCaseType}
              setCurrentTestCase={setCurrentTestCase}
              setEditingIndex={setEditingIndex}
            />
          )}
          {activeTab === 3 && (
            <LimitsTab
              problemData={problemData}
              handleInputChange={handleInputChange}
            />
          )}
          {activeTab === 4 && (
            <SolutionsTab
              problemData={problemData}
              setProblemData={setProblemData}
              setShowSolutionModal={setShowSolutionModal}
              setCurrentSolution={setCurrentSolution}
              setEditingIndex={setEditingIndex}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {showTestCaseModal && (
        <TestCaseModal
          isOpen={showTestCaseModal}
          onClose={() => setShowTestCaseModal(false)}
          testCaseType={currentTestCaseType}
          testCase={currentTestCase}
          setTestCase={setCurrentTestCase}
          problemData={problemData}
          setProblemData={setProblemData}
          editingIndex={editingIndex}
        />
      )}

      {showSolutionModal && (
        <SolutionModal
          isOpen={showSolutionModal}
          onClose={() => setShowSolutionModal(false)}
          solution={currentSolution}
          setSolution={setCurrentSolution}
          problemData={problemData}
          setProblemData={setProblemData}
          editingIndex={editingIndex}
        />
      )}
    </div>
  );
}

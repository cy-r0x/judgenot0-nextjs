"use client";

import { useState } from "react";
import Button from "@/components/ButtonComponent/Button";
import TestCaseItem from "../components/TestCaseItem";

export default function TestCasesTab({
  problemData,
  setProblemData,
  setShowTestCaseModal,
  setCurrentTestCaseType,
  setCurrentTestCase,
  setEditingIndex,
}) {
  const handleAddTestCase = (type) => {
    setCurrentTestCaseType(type);
    setCurrentTestCase({ input: "", output: "" });
    setEditingIndex(-1); // -1 indicates we're adding a new test case
    setShowTestCaseModal(true);
  };

  const handleEditTestCase = (type, index) => {
    const testCases =
      type === "sample"
        ? problemData.sampleTestCases
        : problemData.regularTestCases;
    setCurrentTestCaseType(type);
    setCurrentTestCase({ ...testCases[index] });
    setEditingIndex(index);
    setShowTestCaseModal(true);
  };

  const handleDeleteTestCase = (type, index) => {
    if (type === "sample") {
      setProblemData((prev) => ({
        ...prev,
        sampleTestCases: prev.sampleTestCases.filter((_, i) => i !== index),
      }));
    } else {
      setProblemData((prev) => ({
        ...prev,
        regularTestCases: prev.regularTestCases.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-white border-b pb-2 border-zinc-700">
        Test Cases
      </h2>

      <div className="space-y-6">
        {/* Sample Test Cases */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-lg font-medium text-zinc-300">
              Sample Test Cases
            </label>
            <Button
              name="Add Sample Test Case"
              onClick={() => handleAddTestCase("sample")}
            />
          </div>

          {problemData.sampleTestCases.length > 0 ? (
            <div className="space-y-4">
              {problemData.sampleTestCases.map((testCase, index) => (
                <TestCaseItem
                  key={`sample-${index}`}
                  testCase={testCase}
                  index={index}
                  onEdit={() => handleEditTestCase("sample", index)}
                  onDelete={() => handleDeleteTestCase("sample", index)}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 bg-zinc-700/30 rounded-md text-zinc-400 text-center">
              No sample test cases added yet. Click the button above to add one.
            </div>
          )}
        </div>

        {/* Regular Test Cases */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-lg font-medium text-zinc-300">
              Regular Test Cases
            </label>
            <Button
              name="Add Regular Test Case"
              onClick={() => handleAddTestCase("regular")}
            />
          </div>

          {problemData.regularTestCases.length > 0 ? (
            <div className="space-y-4">
              {problemData.regularTestCases.map((testCase, index) => (
                <TestCaseItem
                  key={`regular-${index}`}
                  testCase={testCase}
                  index={index}
                  onEdit={() => handleEditTestCase("regular", index)}
                  onDelete={() => handleDeleteTestCase("regular", index)}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 bg-zinc-700/30 rounded-md text-zinc-400 text-center">
              No regular test cases added yet. Click the button above to add
              one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

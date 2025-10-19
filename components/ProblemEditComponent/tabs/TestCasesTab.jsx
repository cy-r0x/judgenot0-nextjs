"use client";
import Button from "@/components/ButtonComponent/Button";
import TestCaseItem from "../components/TestCaseItem";
import problemModule from "@/api/problem/problem";

export default function TestCasesTab({
  problemData,
  setProblemData,
  setShowTestCaseModal,
  setCurrentTestCaseType,
  setCurrentTestCase,
  setEditingIndex,
  showNotification,
}) {
  const handleAddTestCase = (type) => {
    setCurrentTestCaseType(type);
    setCurrentTestCase({ input: "", output: "" });
    setEditingIndex(-1); // -1 indicates we're adding a new test case
    setShowTestCaseModal(true);
  };

  const handleEditTestCase = (type, index) => {
    const sampleTestCases = problemData.test_cases.filter((tc) => tc.is_sample);
    const regularTestCases = problemData.test_cases.filter(
      (tc) => !tc.is_sample
    );
    const testCases = type === "sample" ? sampleTestCases : regularTestCases;

    setCurrentTestCaseType(type);
    setCurrentTestCase({
      input: testCases[index].input,
      output: testCases[index].expected_output,
    });
    setEditingIndex(index);
    setShowTestCaseModal(true);
  };

  const handleDeleteTestCase = async (type, index) => {
    const filteredTestCases = problemData.test_cases.filter((tc) =>
      type === "sample" ? tc.is_sample : !tc.is_sample
    );
    const testCaseToDelete = filteredTestCases[index];

    // Find the actual index in the original array
    const actualIndex = problemData.test_cases.findIndex(
      (tc) =>
        tc.input === testCaseToDelete.input &&
        tc.expected_output === testCaseToDelete.expected_output &&
        tc.is_sample === testCaseToDelete.is_sample
    );

    const testCaseId = problemData.test_cases[actualIndex]?.id;

    // If the test case has an ID, delete it from the backend
    if (testCaseId) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete this ${
          type === "sample" ? "sample" : "regular"
        } test case?`
      );

      if (!confirmDelete) {
        return;
      }

      try {
        const { data, error } = await problemModule.deleteTestCase(testCaseId);

        if (error) {
          showNotification?.(error, "error");
          return;
        }

        if (data) {
          // Remove from local state after successful deletion
          setProblemData((prev) => ({
            ...prev,
            test_cases: prev.test_cases.filter((_, i) => i !== actualIndex),
          }));
          showNotification?.(
            `${
              type === "sample" ? "Sample" : "Regular"
            } test case deleted successfully!`,
            "success"
          );
        }
      } catch (error) {
        console.error("Error deleting test case:", error);
        showNotification?.(
          "Failed to delete test case. Please try again.",
          "error"
        );
      }
    } else {
      // If no ID, just remove from local state (shouldn't happen with new API flow)
      setProblemData((prev) => ({
        ...prev,
        test_cases: prev.test_cases.filter((_, i) => i !== actualIndex),
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

          {problemData.test_cases.filter((tc) => tc.is_sample).length > 0 ? (
            <div className="space-y-4">
              {problemData.test_cases
                .filter((tc) => tc.is_sample)
                .map((testCase, index) => (
                  <TestCaseItem
                    key={`sample-${testCase.id || index}`}
                    testCase={{
                      input: testCase.input,
                      output: testCase.expected_output,
                    }}
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

          {problemData.test_cases.filter((tc) => !tc.is_sample).length > 0 ? (
            <div className="space-y-4">
              {problemData.test_cases
                .filter((tc) => !tc.is_sample)
                .map((testCase, index) => (
                  <TestCaseItem
                    key={`regular-${testCase.id || index}`}
                    testCase={{
                      input: testCase.input,
                      output: testCase.expected_output,
                    }}
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

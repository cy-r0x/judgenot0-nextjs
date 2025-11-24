"use client";
import ProblemPreviewComponent from "@/components/ProblemPreviewComponent/ProblemPreviewComponet";
import problemModule from "@/api/problem/problem";
import { useEffect, useState } from "react";

export default function PreviewPage({ params }) {
  const [problemID, setProblemID] = useState(null);
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.resolve(params).then((resolvedParams) => {
      setProblemID(resolvedParams.problemID);
    });
  }, [params]);

  useEffect(() => {
    if (!problemID) return;

    const fetchProblem = async () => {
      setLoading(true);
      const { data, error } = await problemModule.getProblem(problemID);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Problem not found");
        setLoading(false);
        return;
      }

      // Parse JSON strings in-place with proper validation
      const parsedData = { ...data };
      if (
        typeof parsedData.statement === "string" &&
        parsedData.statement.trim()
      ) {
        try {
          parsedData.statement = JSON.parse(parsedData.statement);
        } catch (e) {
          console.error("Error parsing statement:", e);
        }
      }
      if (
        typeof parsedData.input_statement === "string" &&
        parsedData.input_statement.trim()
      ) {
        try {
          parsedData.input_statement = JSON.parse(parsedData.input_statement);
        } catch (e) {
          console.error("Error parsing input_statement:", e);
          parsedData.input_statement = "";
        }
      }
      if (
        typeof parsedData.output_statement === "string" &&
        parsedData.output_statement.trim()
      ) {
        try {
          parsedData.output_statement = JSON.parse(parsedData.output_statement);
        } catch (e) {
          console.error("Error parsing output_statement:", e);
          parsedData.output_statement = "";
        }
      }

      setProblemData(parsedData);
      setLoading(false);
    };

    fetchProblem();
  }, [problemID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="text-zinc-300 text-lg">Loading problem...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-400">Error: {error}</div>;
  }

  if (!problemData) {
    return null;
  }

  return (
    <>
      <ProblemPreviewComponent problem={problemData} problemID={problemID} />
    </>
  );
}

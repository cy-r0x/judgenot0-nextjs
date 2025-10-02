"use client";

import { EditorSection } from "@/components/ProblemViewComponent/ClientComponents";
import ProblemViewComponent from "@/components/ProblemViewComponent/ProblemViewComponent";
import problemMoudle from "@/api/problem/problem";
import { useEffect, useState } from "react";

export default function ProblemDescription({ params }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contestId, setContestId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const { contestId: cId, problemId } = resolvedParams;
        setContestId(cId);

        const problemResponse = await problemMoudle.getProblem(problemId);

        // Handle error case
        if (problemResponse.error) {
          setError(problemResponse.error);
          setLoading(false);
          return;
        }

        // Parse JSON strings in-place
        if (typeof problemResponse.statement === "string") {
          problemResponse.statement = JSON.parse(problemResponse.statement);
        }
        if (typeof problemResponse.input_statement === "string") {
          problemResponse.input_statement = JSON.parse(
            problemResponse.input_statement
          );
        }
        if (typeof problemResponse.output_statement === "string") {
          problemResponse.output_statement = JSON.parse(
            problemResponse.output_statement
          );
        }

        // Add contest_id to the problem response
        problemResponse.contest_id = cId;

        setProblem(problemResponse);
        setLoading(false);
      } catch (err) {
        setError("An unexpected error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-70px)]">
        <div className="text-center">
          <p className="text-zinc-400 text-xl">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-70px)]">
        <div className="text-center">
          <p className="text-red-400 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        {/* Problem description - 60% width */}
        <div className="w-[60%] overflow-auto">
          <ProblemViewComponent problem={problem} contestId={contestId} />
        </div>
        {/* Editor section - 40% width - Client-side rendered */}
        <EditorSection problemData={problem} contestId={contestId} />
      </div>
    </div>
  );
}

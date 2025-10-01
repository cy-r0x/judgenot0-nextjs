// Server component
import SubmissionIdModule from "@/utils/fetchSubmissionId";
import { SubmissionCodeViewer } from "./client";
import Link from "next/link";

export default async function SubmissionPage({ params }) {
  const { submissionId, contestId } = await params;
  const submissionData = await SubmissionIdModule.getSubmissionId(submissionId);

  return (
    <div className="px-6 md:px-16 py-6">
      <Link
        href={`/contest/${contestId}`}
        className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Problems
      </Link>
      <h2 className="text-2xl font-bold mb-6">Submission Details</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="text-zinc-400 text-sm">Submission ID</div>
          <div className="font-mono text-lg text-orange-500">
            {submissionData.submissionID}
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="text-zinc-400 text-sm">Status</div>
          <div
            className={`font-medium text-lg ${
              submissionData.status === "Accepted"
                ? "text-green-500"
                : submissionData.status === "Wrong Answer"
                ? "text-red-500"
                : submissionData.status === "In Queue"
                ? "text-blue-500"
                : submissionData.status === "Judging"
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
          >
            {submissionData.status}
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="text-zinc-400 text-sm">Time</div>
          <div className="font-medium text-lg">
            {submissionData.time ? `${submissionData.time} ms` : "—"}
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="text-zinc-400 text-sm">Memory</div>
          <div className="font-medium text-lg">
            {submissionData.memory ? `${submissionData.memory} KB` : "—"}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-medium">Solution Code</div>
          <div className="text-zinc-400">
            Language:{" "}
            <span className="text-white">
              {submissionData.language === "cpp"
                ? "C++"
                : submissionData.language === "python"
                ? "Python"
                : submissionData.language === "java"
                ? "Java"
                : submissionData.language}
            </span>
          </div>
        </div>

        <div className="border-2 border-zinc-800 rounded-lg overflow-hidden">
          <SubmissionCodeViewer
            code={submissionData.code}
            language={submissionData.language}
          />
        </div>
      </div>
    </div>
  );
}

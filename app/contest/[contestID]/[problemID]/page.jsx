import problemDataModule from "@/utils/fetchProblem";
import {
  CopyButton,
  EditorSection,
} from "@/components/ProblemComponent/ClientComponents";
import Link from "next/link";
import "katex/dist/katex.min.css";
import KatexRenderer from "@/components/KatexRenderer/KatexRenderer";
import convertTiptapToHtml from "@/utils/tiptapToHtml";

export default async function ProblemDescription({ params }) {
  const problem = await problemDataModule.getProblem();

  // Convert TipTap JSON content to HTML for KatexRenderer
  const descriptionHtml = convertTiptapToHtml(problem.description);
  const inputDescriptionHtml = convertTiptapToHtml(problem.inputDescription);
  const outputDescriptionHtml = convertTiptapToHtml(problem.outputDescription);

  // Updated problemData object to match the correct property names
  const problemData = {
    id: problem.id,
    timeLimit: problem.timeLimit,
    memoryLimit: problem.memoryLimit,
    sampleTestCases: problem.sampleTestCases || [],
    regularTestCases: problem.regularTestCases || [],
    solutions: problem.solutions || [],
  };

  const { contestID } = await params;

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        {/* Problem description - 60% width */}
        <div className="w-[60%] overflow-y-auto p-4">
          {/* Back button */}
          <div className="mb-3">
            <Link
              href={`/contest/${contestID}`}
              className="inline-flex items-center text-orange-500 hover:text-orange-700 transition-colors"
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
          </div>

          <h1 className="text-2xl font-bold mb-4">{problem.name}</h1>

          <div className="border border-zinc-800 p-2 rounded mb-4">
            <p className="font-medium">
              Time Limit: {problem.timeLimit}ms | Memory Limit:{" "}
              {problem.memoryLimit}MB
            </p>
          </div>

          <div className="prose max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
            <KatexRenderer html={descriptionHtml} />
          </div>

          <div className="space-y-4 mb-4">
            {/* input desc */}
            <div className="space-y-2">
              <p className="text-2xl font-bold">Input</p>
              <KatexRenderer html={inputDescriptionHtml} />
            </div>

            {/* output desc */}
            <div className="space-y-2">
              <p className="text-2xl font-bold">Output</p>
              <KatexRenderer html={outputDescriptionHtml} />
            </div>
          </div>

          {/* sample input/output section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative flex flex-col h-full">
              <h3 className="font-semibold mb-2">Sample Input</h3>
              {problem.sampleTestCases.map((sample, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded p-3 relative flex-grow"
                >
                  <pre className="whitespace-pre-wrap h-full">
                    {sample.input}
                  </pre>
                  <CopyButton text={sample.input} />
                </div>
              ))}
            </div>
            <div className="relative flex flex-col h-full">
              <h3 className="font-semibold mb-2">Sample Output</h3>
              {problem.sampleTestCases.map((sample, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded p-3 relative flex-grow"
                >
                  <pre className="whitespace-pre-wrap h-full">
                    {sample.output}
                  </pre>
                  <CopyButton text={sample.output} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor section - 40% width - Client-side rendered */}
        <EditorSection problemData={problemData} />
      </div>
    </div>
  );
}

import problemDataModule from "@/utils/fetchProblem";
import {
  CopyButton,
  EditorSection,
} from "@/components/ProblemComponent/ClientComponents";
import Link from "next/link";

function decodeBase64Utf8(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

async function ProblemDescription({ params }) {
  const problem = await problemDataModule.getProblem();

  const problemData = {
    id: problem.id,
    time: problem.time,
    memory: problem.memory,
    sampleData: problem.sampleData,
    testCases: problem.testCases,
  };

  const { contestID } = await params;

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-70px)]">
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

            <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>

            <div className="border border-zinc-800 p-2 rounded mb-4">
              <p className="font-medium">
                Time Limit: {problem.time}s | Memory Limit: {problem.memory}MB
              </p>
            </div>

            <div className="prose max-w-none text-justify leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="whitespace-pre-wrap">
                {decodeBase64Utf8(problem.descriptionData)}
              </p>
            </div>

            <div className="space-y-4 mb-4">
              {/* input desc */}
              <div className="space-y-2">
                <p className="text-2xl font-bold">Input</p>
                <p className="whitespace-pre-wrap">
                  {decodeBase64Utf8(problem.descriptionInput)}
                </p>
              </div>

              {/* output desc */}
              <div className="space-y-2">
                <p className="text-2xl font-bold">Output</p>
                <p className="whitespace-pre-wrap">
                  {decodeBase64Utf8(problem.descriptionOutput)}
                </p>
              </div>
            </div>

            {/* sample input/output section */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative flex flex-col h-full">
                <h3 className="font-semibold mb-2">Sample Input</h3>
                <div className="border border-zinc-800 rounded p-3 relative flex-grow">
                  <pre className="whitespace-pre-wrap h-full">
                    {decodeBase64Utf8(problem.sampleData[0].input)}
                  </pre>
                  <CopyButton
                    text={decodeBase64Utf8(problem.sampleData[0].input)}
                  />
                </div>
              </div>
              <div className="relative flex flex-col h-full">
                <h3 className="font-semibold mb-2">Sample Output</h3>
                <div className="border border-zinc-800 rounded p-3 relative flex-grow">
                  <pre className="whitespace-pre-wrap h-full">
                    {decodeBase64Utf8(problem.sampleData[0].output)}
                  </pre>
                  <CopyButton
                    text={decodeBase64Utf8(problem.sampleData[0].output)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Editor section - 40% width - Client-side rendered */}
          <EditorSection problemData={problemData} />
        </div>
      </div>
    </>
  );
}

export default ProblemDescription;

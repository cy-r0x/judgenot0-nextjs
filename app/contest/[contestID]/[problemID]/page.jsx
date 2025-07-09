import problemDataModule from "@/utils/fetchProblem";
import { EditorSection } from "@/components/ProblemViewComponent/ClientComponents";
import ProblemViewComponent from "@/components/ProblemViewComponent/ProblemViewComponent";

export default async function ProblemDescription({ params }) {
  const problem = await problemDataModule.getProblem();

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
        <div className="w-[60%] overflow-auto">
          <ProblemViewComponent problem={problem} contestID={contestID} />
        </div>
        {/* Editor section - 40% width - Client-side rendered */}
        <EditorSection problemData={problemData} />
      </div>
    </div>
  );
}

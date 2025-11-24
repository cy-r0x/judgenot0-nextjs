import ProblemViewComponent from "../ProblemViewComponent/ProblemViewComponent";
import { EditorSection } from "./ClientComponents";

export default function ProblemPreviewComponent({ problem, problemID }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-32 py-6 overflow-hidden mx-auto w-full">
        {/* Problem View Section */}
        <section className="flex-[2] flex flex-col min-w-0">
          <div className="flex-1 bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <ProblemViewComponent problem={problem} />
            </div>
          </div>
        </section>

        {/* Editor Section */}
        <section className="flex-1 flex flex-col min-w-0 h-fit">
          <EditorSection problem={problem} problemID={problemID} />
        </section>
      </div>
    </div>
  );
}

import problemListData from "@/utils/fetchProblemList";
import ProblemComponent from "@/components/ProblemListComponent/ProblemListComponent";
import TimeCounterComponent from "@/components/TimeCounterComponent/TimeCounterComponent";
import Bar from "@/components/BarComponent/BarComponent";
import FormatMention from "@/handlers/mentionHandler";
import Link from "next/link";

async function ProblemList({ params }) {
  const { contestId } = await params;
  const problemData = await problemListData.getProblems();

  return (
    <>
      <div className="flex my-4 mx-8 gap-x-4">
        <div className="flex-[7] space-y-4">
          <Bar title={"Problems"} />
          <div className="flex flex-col gap-2">
            {problemData.map((problem, index) => (
              <Link href={`/contest/${contestId}/${problem.id}`} key={index}>
                <ProblemComponent problemData={problem} index={index} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-[3] text-wrap space-y-4">
          <div className="space-y-4">
            <Bar title={"DIU Take-off Preliminary Round Spring-2026"} />
            <TimeCounterComponent startUnix={1752178750} endUnix={1757504340} />
          </div>

          <div className="space-y-4">
            <Bar title={"Setters"} />
            <div className="min-h-32 border-4 border-zinc-800 flex items-center justify-center px-4 text-justify">
              <FormatMention
                text={"Kichu Random Problem Set korse @cyr0x and @rafiwho"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemList;

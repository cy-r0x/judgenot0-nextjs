import problemListData from "@/utils/fetchProblemList";
import ProblemComponent from "@/components/ProblemListComponent/ProblemListComponent";
import Bar from "@/components/BarComponent/BarComponent";
import FormatMention from "@/handlers/mentionHandler";
import Link from "next/link";

async function ProblemList({ params }) {
  const { contestID } = await params;
  const problemData = await problemListData.getProblems();

  return (
    <>
      <div className="flex my-4 mx-8 gap-x-4">
        <div className="flex-[7] space-y-4">
          <Bar title={"Problems"} />
          <div className="flex flex-col gap-2">
            {problemData.map((problem, index) => (
              <Link href={`/contest/${contestID}/${problem.id}`} key={index}>
                <ProblemComponent problemData={problem} index={index} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-[3] text-wrap space-y-4">
          <div className="space-y-4">
            <Bar title={"DIU Take-off Preliminary Round Spring-2026"} />
            <div className="h-32 border-4 border-zinc-900 flex flex-col items-center justify-center gap-y-1">
              <p className="font-semibold text-2xl">Ends In</p>
              <p className="font-semibold text-2xl">02:19:30</p>
            </div>
          </div>

          <div className="space-y-4">
            <Bar title={"Setters"} />
            <div className="min-h-32 border-4 border-zinc-900 flex items-center justify-center px-4 text-justify">
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

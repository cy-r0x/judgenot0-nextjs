import ProblemComponent from "@/components/ProblemListComponent/ProblemListComponent";
import TimeCounterComponent from "@/components/TimeCounterComponent/TimeCounterComponent";
import Bar from "@/components/BarComponent/BarComponent";
import FormatMention from "@/handlers/mentionHandler";
import Link from "next/link";
import contestModule from "@/api/contest/contest";

async function ProblemList({ params }) {
  const { contestId } = await params;
  const data = await contestModule.getContest(contestId);

  // Handle error case
  if (data.error) {
    return (
      <div className="mx-8 my-4">
        <Bar title={"Error"} />
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">{data.error}</p>
        </div>
      </div>
    );
  }

  const { contest, problems } = data;

  // Calculate end time from start_time and duration_seconds
  const startTime = new Date(contest.start_time).getTime() / 1000; // Convert to Unix timestamp
  const endTime = startTime + contest.duration_seconds;

  return (
    <>
      <div className="flex my-4 mx-8 gap-x-4">
        <div className="flex-[7] space-y-4">
          <Bar title={"Problems"} />
          <div className="flex flex-col gap-2">
            {problems && problems.length > 0 ? (
              problems.map((problem) => (
                <Link
                  href={`/contests/${contestId}/${problem.id}`}
                  key={problem.id}
                >
                  <ProblemComponent
                    problemData={problem}
                    index={problem.index}
                  />
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">No problems available</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-[3] text-wrap space-y-4">
          <div className="space-y-4">
            <Bar title={contest.title} />
            <TimeCounterComponent startUnix={startTime} endUnix={endTime} />
          </div>

          <div className="space-y-4">
            <Bar title={"Setters"} />
            <div className="min-h-32 border-4 border-zinc-800 flex items-center justify-center px-4 text-justify">
              <p className="text-zinc-400">
                Author information will be available soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemList;

import contestModule from "@/api/contest/contest";
import Bar from "@/components/BarComponent/BarComponent";
import ContestListComponent from "@/components/ContestListComponent/ContestListComponent";
import Link from "next/link";

async function Contest() {
  const contests = await contestModule.getContests();
  return (
    <>
      <div className="mx-8 my-4">
        <Bar title={"Contest"}></Bar>
        <div className="flex flex-col gap-2 my-4">
          {contests.length > 0 ? (
            contests.map((contest) => (
              <Link href={`/contests/${contest.id}`} key={contest.id}>
                <div>
                  <ContestListComponent data={contest} />
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">No contests available</p>
              <p className="text-zinc-500 text-sm mt-2">
                Check back later for upcoming contests
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Contest;

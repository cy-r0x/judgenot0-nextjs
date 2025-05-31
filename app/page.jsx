import contestDataModule from "@/utils/fetchContest";
import ContestListComponent from "@/components/ContestListComponent/ContestListComponent";
import Bar from "@/components/BarComponent/BarComponent";
import Link from "next/link";

async function Contest() {
  const currentContests = await contestDataModule.getData();

  return (
    <>
      <div className="mx-8 my-4">
        <Bar title={"Contest"}></Bar>

        {/* Display Contests */}
        <div className="flex flex-col gap-2 my-4">
          {currentContests.length > 0 &&
            currentContests.map((data, index) => (
              <Link href={`/contest/${index + 1}`} key={index}>
                <div key={index}>
                  <ContestListComponent data={data} />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export default Contest;

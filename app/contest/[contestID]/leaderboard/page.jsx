import { MdOutlineDoneAll } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BsStarFill } from "react-icons/bs";
import LeaderboardDataModule from "@/utils/fetchLeaderboard";

export default async () => {
  const data = await LeaderboardDataModule.getData();
  const { problemCount, leaderboardStat } = data;

  return (
    <div className="px-6 py-6 text-white">
      <p className="text-3xl font-bold mb-6 text-center text-white">
        Leaderboard
      </p>
      <div className="overflow-x-auto">
        <table className="w-[90%] mx-auto border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-[#2a2a2a] text-gray-300">
            <tr>
              <th className="py-3 px-4 border border-gray-700">User</th>
              <th className="py-3 px-4 border border-gray-700">Solved</th>
              <th className="py-3 px-4 border border-gray-700">Penalty</th>
              {Array.from({ length: problemCount }, (_, i) => (
                <th key={i} className="py-3 px-4 border border-gray-700">
                  {String.fromCharCode(i + 65)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboardStat.map((userStat, index) => (
              <tr
                key={index}
                className="even:bg-[#222] odd:bg-[#1c1c1c] hover:bg-[#333] transition-all"
              >
                <td className="text-center py-3 px-4 border border-gray-700 font-medium">
                  {userStat.userName}
                </td>
                <td className="text-center py-3 px-4 border border-gray-700 text-green-400 font-semibold">
                  {
                    Object.values(userStat.problemStatus).filter(
                      (status) => status.isSolved
                    ).length
                  }
                </td>
                <td className="text-center py-3 px-4 border border-gray-700 text-yellow-300">
                  {Object.values(userStat.problemStatus).reduce(
                    (acc, status) => acc + status.penalty,
                    0
                  )}
                </td>
                {Array.from({ length: problemCount }, (_, i) => {
                  const problemKey = String.fromCharCode(i + 65);
                  const problemStatus = userStat.problemStatus[problemKey];

                  return (
                    <td
                      key={i}
                      className="text-center py-3 px-4 border border-gray-700"
                    >
                      {problemStatus ? (
                        problemStatus.isSolved ? (
                          problemStatus.isFirstSolve ? (
                            <div>
                              <BsStarFill className="text-green-500 mx-auto   text-2xl " />
                              {problemStatus.wrongSubmissionCount > 0 ? (
                                <div>
                                  <span className="font-bold text-green-500">
                                    +{problemStatus.wrongSubmissionCount}
                                  </span>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <MdOutlineDoneAll className="text-green-500 mx-auto text-2xl" />
                              {problemStatus.wrongSubmissionCount > 0 ? (
                                <div>
                                  <span className="font-bold text-green-500">
                                    +{problemStatus.wrongSubmissionCount}
                                  </span>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          )
                        ) : (
                          <div>
                            <p className="font-bold text-red-500">
                              -{problemStatus.wrongSubmissionCount}
                            </p>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

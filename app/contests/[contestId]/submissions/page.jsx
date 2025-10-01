import { FaUser, FaClock, FaMemory } from "react-icons/fa";
import { SiCodemirror } from "react-icons/si";
import { GoFileCode, GoVersions, GoHash } from "react-icons/go";
import { MdOutlineDone, MdClose, MdLoop } from "react-icons/md";
import SubmissionDataModule from "@/utils/fetchSubmissons";
import Link from "next/link";

export default async function SubmissionsTable({ params }) {
  const { contestId } = await params;
  const mySubmissions = await SubmissionDataModule.getSubmissions();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <MdOutlineDone className="text-green-500" title="Accepted" />;
      case "Wrong Answer":
        return <MdClose className="text-red-500" title="Wrong Answer" />;
      case "In Queue":
        return (
          <GoVersions
            className="text-blue-500 animate-pulse duration-1000"
            title="In Queue"
          />
        );
      case "Judging":
        return (
          <MdLoop className="text-yellow-500 animate-spin" title="Judging" />
        );
      default:
        return <MdClose className="text-gray-500" title="Unknown Status" />;
    }
  };

  const getLanguage = (language) => {
    switch (language) {
      case "cpp":
        return "GNU G++23 14.2 (64 bit)";
      case "py":
        return "Python 3.12.1";
      case "java":
        return "Java 21 64 bit";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="px-6 md:px-16 py-6">
      <h2 className="text-2xl font-bold mb-6">My Submissions</h2>

      <div className="overflow-x-auto rounded-lg border-2 border-zinc-800">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-zinc-900 text-zinc-300 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <FaUser />
                  User
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <GoHash />
                  Language
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <GoFileCode />
                  Problem
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <MdLoop />
                  Status
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <FaClock />
                  Time
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <FaMemory />
                  Memory
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-zinc-200">
            {mySubmissions.map((item, index) => (
              <tr
                key={index}
                className="border-t border-zinc-700 hover:bg-zinc-800 transition-colors duration-150"
              >
                <td className="py-3 px-4 font-mono text-orange-500 hover:underline">
                  {
                    <Link
                      href={`/contest/${contestId}/submissions/${item.submissionID}`}
                    >
                      {item.submissionID}
                    </Link>
                  }
                </td>
                <td className="py-3 px-4">{item.userName}</td>
                <td className="py-3 px-4">{getLanguage(item.language)}</td>
                <td className="py-3 px-4 text-blue-400 hover:underline">
                  <Link href={`/contest/${contestId}/${item.problem}`}>
                    {item.problem}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span
                      className={`font-medium ${
                        item.status === "Accepted"
                          ? "text-green-600"
                          : item.status === "Wrong Answer"
                          ? "text-red-600"
                          : item.status === "In Queue"
                          ? "text-blue-600"
                          : item.status === "Judging"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">{item.time ?? "—"} ms</td>
                <td className="py-3 px-4">{item.memory ?? "—"} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdCreate, MdList, MdEventNote } from "react-icons/md";
import { useRouter } from "next/navigation";
import Button from "@/components/ButtonComponent/Button";
import CreateContestModal from "@/components/CreateContestModal/CreateContestModal";
import contestModule from "@/api/contest/contest";

function AdminPanel() {
  const router = useRouter();
  const [contestList, setContestList] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await contestModule.getContests();

        if (data.error) {
          // Check if it's an authentication error
          if (
            data.error === "No access token found" ||
            data.error === "Invalid or expired token" ||
            data.error === "Invalid Token"
          ) {
            // Redirect to login page for auth errors
            router.push("/login");
            return;
          }

          // Handle other API errors
          throw new Error(data.error);
        }

        // Ensure data is an array
        if (Array.isArray(data)) {
          setContestList(data);
        } else {
          setContestList([]);
          console.warn("API returned non-array data:", data);
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError(error.message || "Failed to load contests");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [router]);

  const handleCreate = () => {
    setModalActive(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";

    switch (status) {
      case "UPCOMING":
        return `${baseClasses} bg-blue-600/20 text-blue-400 border border-blue-600/30`;
      case "RUNNING":
        return `${baseClasses} bg-green-600/20 text-green-400 border border-green-600/30`;
      case "ENDED":
        return `${baseClasses} bg-gray-600/20 text-gray-400 border border-gray-600/30`;
      default:
        return `${baseClasses} bg-zinc-600/20 text-zinc-400 border border-zinc-600/30`;
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const menuItems = [
    {
      title: "Available Contests",
      href: "#contests",
      icon: <MdList className="text-xl" />,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gradient-to-br from-zinc-950 to-zinc-900">
      {modalActive && (
        <CreateContestModal
          isOpen={modalActive}
          onClose={() => setModalActive(false)}
        />
      )}

      {/* Sidebar */}
      <div className="w-72 bg-zinc-900/80 shadow-xl backdrop-blur-sm border-r border-zinc-800">
        <div className="p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Manage contests and competitions
          </p>
        </div>

        <div className="py-2 px-3">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 ml-2">
            Navigation
          </p>
          {menuItems.map((item, idx) => (
            <div
              className={`px-4 py-3 mb-1 rounded-lg transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                activeItem === idx
                  ? "bg-orange-500/90 text-white shadow-md shadow-orange-900/20 font-medium"
                  : "hover:bg-zinc-800/70 text-zinc-400 hover:text-white"
              }`}
              key={`nav-item-${idx}`}
              onClick={() => setActiveItem(idx)}
            >
              <span className="text-lg">{item.icon}</span>
              <Link href={item.href} className="w-full">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-xl border border-zinc-800/50 p-6 h-full">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                {menuItems[activeItem].icon}
              </span>
              <h1 className="text-2xl font-bold text-white">
                {menuItems[activeItem].title}
              </h1>
            </div>
            <div>
              <Button
                name="Create New Contest"
                icon={<MdCreate />}
                onClick={handleCreate}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contests..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={loading}
                />
                <div className="absolute left-3 top-2.5 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <span className="text-zinc-300 text-lg">
                    Loading contests...
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="mt-6 p-6 rounded-lg bg-red-900/20 border border-red-700/50 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-400 font-medium">
                    Error Loading Contests
                  </span>
                </div>
                <p className="text-red-300 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : contestList.length > 0 ? (
              <div className="bg-zinc-800/70 rounded-lg overflow-hidden shadow-lg border border-zinc-700/50">
                <table className="min-w-full divide-y divide-zinc-700">
                  <thead className="bg-zinc-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-800/30 divide-y divide-zinc-700/50">
                    {contestList.map((contest) => (
                      <tr
                        key={contest.id}
                        className="hover:bg-zinc-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-zinc-100">
                              {contest.title}
                            </div>
                            {contest.description && (
                              <div className="text-sm text-zinc-400 truncate max-w-xs">
                                {contest.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(contest.status)}>
                            {contest.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {formatDateTime(contest.start_time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {formatDuration(contest.duration_seconds)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          <div className="flex space-x-3">
                            <Link href={`/edit/contest/${contest.id}`}>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                Edit
                              </button>
                            </Link>
                            <Link href={`/contest/${contest.id}`}>
                              <button className="text-green-400 hover:text-green-300 transition-colors">
                                View
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6 p-6 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <MdEventNote className="w-6 h-6 text-zinc-400" />
                  <span className="text-zinc-400 font-medium">
                    No Contests Found
                  </span>
                </div>
                <p className="text-zinc-500 mb-4">
                  No contests available yet. Create your first contest to get
                  started.
                </p>
                <Button
                  name="Create Your First Contest"
                  icon={<MdCreate />}
                  onClick={handleCreate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

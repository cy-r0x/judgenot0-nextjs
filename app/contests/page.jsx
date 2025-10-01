"use client";
import contestModule from "@/api/contest/contest";
import Bar from "@/components/BarComponent/BarComponent";
import ContestListComponent from "@/components/ContestListComponent/ContestListComponent";
import Link from "next/link";
import { useEffect, useState } from "react";

function Contest() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await contestModule.getContests();

        if (response.error) {
          setError(response.error);
          setContests([]);
        } else {
          setContests(Array.isArray(response) ? response : []);
        }
      } catch (err) {
        console.error("Error fetching contests:", err);
        setError("Failed to load contests");
        setContests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="mx-8 my-4">
        <Bar title={"Contest"}></Bar>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-zinc-300">Loading contests...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-8 my-4">
        <Bar title={"Contest"}></Bar>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-400 text-center">
            <p className="text-lg font-medium">Error loading contests</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-8 my-4">
        <Bar title={"Contest"}></Bar>
        <div className="flex flex-col gap-2 my-4">
          {contests.length > 0 ? (
            contests.map((contest) => (
              <Link href={`/contest/${contest.id}`} key={contest.id}>
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

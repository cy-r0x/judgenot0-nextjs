"use client";

import { useState, useEffect } from "react";
import Bar from "@/components/BarComponent/BarComponent";
import StandingsComponent from "@/components/StandingsComponent/StandingsComponent";
import { CompactTimer } from "@/components/TimeCounterComponent/TimeCounterComponent";
import Pagination from "@/components/Pagination/Pagination";
import contestModule from "@/api/contest/contest";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

/**
 * Contest Standings Page - Client Component
 * Displays the leaderboard for a specific contest
 * Automatically refreshes standings data every 15 seconds
 * Public page - no authentication required
 *
 * @param {Object} props - Page props
 * @param {Object} props.params - URL parameters
 * @param {string} props.params.contestId - Contest ID from URL
 * @returns {JSX.Element} Standings page
 */
export default function StandingsPage({ params }) {
  const [standingsData, setStandingsData] = useState(null);
  const [standingsError, setStandingsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contestId, setContestId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Unwrap params
  useEffect(() => {
    params.then((resolvedParams) => {
      setContestId(resolvedParams.contestId);
    });
  }, [params]);

  // Fetch standings data
  const fetchStandings = async (page = 1) => {
    if (!contestId) return;

    setIsLoading(true);
    try {
      const { data, error } = await contestModule.getContestStandings(
        contestId,
        page
      );

      if (error) {
        setStandingsError(error);
        setStandingsData(null);
      } else {
        setStandingsData(data);
        setStandingsError(null);
      }
    } catch (err) {
      setStandingsError("Failed to load standings");
      setStandingsData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and setup interval for auto-refresh
  useEffect(() => {
    if (!contestId) return;

    // Fetch immediately
    fetchStandings(currentPage);

    // Check if contest has ended
    const isContestEnded = () => {
      if (!standingsData?.start_time || !standingsData?.duration_seconds) {
        return false;
      }
      const startTime = new Date(standingsData.start_time).getTime();
      const endTime = startTime + standingsData.duration_seconds * 1000;
      return Date.now() > endTime;
    };

    // Only set up interval if contest hasn't ended
    if (!isContestEnded()) {
      const interval = setInterval(() => {
        fetchStandings(currentPage);
      }, 15000);

      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }
  }, [
    contestId,
    currentPage,
    standingsData?.start_time,
    standingsData?.duration_seconds,
  ]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading Standings..." />
      </div>
    );
  }

  if (standingsError) {
    return (
      <div className="min-h-screen">
        <Bar title="Standings" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-900/30 border border-red-500 rounded-lg px-6 py-4">
            <p className="text-red-300">
              {standingsError || "Failed to load standings"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const contestTitle = standingsData?.contest_title || "Contest";
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Contest Header */}
        <div className="mb-6 bg-zinc-800 rounded-lg px-6 py-5 border-b-4 border-orange-500 shadow-lg">
          <div className="text-center">
            <p className="text-sm text-zinc-400 uppercase tracking-wider mb-2">
              Standings
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
              {contestTitle}
            </h1>
          </div>
        </div>

        {/* Compact Timer */}
        {standingsData?.start_time && standingsData?.duration_seconds && (
          <div className="mb-6">
            <CompactTimer
              startTime={standingsData.start_time}
              durationSeconds={standingsData.duration_seconds}
            />
          </div>
        )}

        {/* Standings Table */}
        <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800">
          <StandingsComponent standingsData={standingsData} />
        </div>

        {/* Pagination */}
        {standingsData && standingsData.total_page > 1 && (
          <Pagination
            currentPage={standingsData.page}
            totalPages={standingsData.total_page}
            totalItems={standingsData.total_item}
            limit={standingsData.limit}
            onPageChange={handlePageChange}
            itemName="participants"
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Bar from "@/components/BarComponent/BarComponent";
import StandingsComponent from "@/components/StandingsComponent/StandingsComponent";
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

  // Unwrap params
  useEffect(() => {
    params.then((resolvedParams) => {
      setContestId(resolvedParams.contestId);
    });
  }, [params]);

  // Fetch standings data
  const fetchStandings = async () => {
    if (!contestId) return;

    try {
      const { data, error } = await contestModule.getContestStandings(
        contestId
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
    fetchStandings();

    // Set up interval to fetch every 15 seconds
    const interval = setInterval(() => {
      fetchStandings();
    }, 15000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [contestId]);

  if (isLoading) {
    return <LoadingSpinner />;
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

        {/* Standings Table */}
        <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800">
          <StandingsComponent standingsData={standingsData} />
        </div>
      </div>
    </div>
  );
}

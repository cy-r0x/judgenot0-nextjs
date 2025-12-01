/**
 * Verdict Formatter Utility
 * Handles verdict display logic for submissions
 */

/**
 * Get full verdict name from short code
 * @param {string} verdict - Verdict code (ac, wa, tle, mle, re, pending, running)
 * @returns {string} Full verdict name
 */
export const getVerdictName = (verdict) => {
  const verdictMap = {
    ac: "Accepted",
    wa: "Wrong Answer",
    tle: "Time Limit Exceeded",
    mle: "Memory Limit Exceeded",
    re: "Runtime Error",
    ce: "Compilation Error",
    pending: "Pending",
    running: "Running",
  };

  return verdictMap[verdict?.toLowerCase()] || verdict || "Unknown";
};

/**
 * Get color class for verdict
 * @param {string} verdict - Verdict code
 * @returns {string} Tailwind color class
 */
export const getVerdictColor = (verdict) => {
  const lowerVerdict = verdict?.toLowerCase();

  switch (lowerVerdict) {
    case "ac":
      return "text-green-500";
    case "pending":
      return "text-gray-400";
    default:
      return "text-red-500";
  }
};

/**
 * Get icon component for verdict
 * @param {string} verdict - Verdict code
 * @param {Object} icons - Icon components object
 * @returns {JSX.Element} Icon component
 */
export const getVerdictIcon = (verdict, icons) => {
  const lowerVerdict = verdict?.toLowerCase();
  const { MdOutlineDone, MdClose, MdAccessTime, MdMemory, MdLoop } = icons;

  switch (lowerVerdict) {
    case "ac":
      return <MdOutlineDone className="text-green-500" title="Accepted" />;
    case "wa":
      return <MdClose className="text-red-500" title="Wrong Answer" />;
    case "tle":
      return (
        <MdAccessTime className="text-red-500" title="Time Limit Exceeded" />
      );
    case "mle":
      return (
        <MdMemory className="text-red-500" title="Memory Limit Exceeded" />
      );
    case "re":
      return <MdClose className="text-red-500" title="Runtime Error" />;
    case "ce":
      return <MdClose className="text-red-500" title="Compilation Error" />;
    case "pending":
      return <MdLoop className="text-gray-400 animate-spin" title="Pending" />;
    default:
      return <MdClose className="text-red-500" title={verdict} />;
  }
};

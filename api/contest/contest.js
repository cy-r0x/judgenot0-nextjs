import axios from "axios";
import userModule from "../user/user";

const contestModule = {};

contestModule.getContests = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/contests");

    if (response.status === 200) {
      const contests = response.data;

      // Ensure contests is always an array
      if (!Array.isArray(contests)) {
        return [];
      }

      return contests;
    } else {
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (error) {
    console.error("Error fetching contests:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Access denied" };
        case 500:
          return { error: "Server error occurred" };
        default:
          return {
            error:
              error.response.data?.message ||
              `Server error: ${error.response.status}`,
          };
      }
    } else if (error.request) {
      return { error: "Network error - unable to connect to server" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

contestModule.getContest = async (contestId) => {
  // Input validation
  if (!contestId) {
    return { error: "Contest ID is required" };
  }

  const numericId = parseInt(contestId);
  if (isNaN(numericId) || numericId <= 0) {
    return { error: "Invalid contest ID format" };
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/api/contests/${numericId}`
    );

    if (response.status === 200) {
      const contestData = response.data;

      // Ensure numeric fields are properly typed
      if (contestData.contest?.id) {
        contestData.contest.id = parseInt(contestData.contest.id);
      }
      if (contestData.contest?.duration_seconds) {
        contestData.contest.duration_seconds = parseInt(
          contestData.contest.duration_seconds
        );
      }

      return contestData;
    } else {
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (error) {
    console.error("Error fetching contest:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Access denied" };
        case 404:
          return { error: "Contest not found" };
        case 500:
          return { error: "Server error occurred" };
        default:
          return {
            error:
              error.response.data?.message ||
              `Server error: ${error.response.status}`,
          };
      }
    } else if (error.request) {
      return { error: "Network error - unable to connect to server" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

contestModule.createContest = async (contestData) => {
  const access_token = userModule.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/contests",
      {
        title: contestData.title,
        description: contestData.description || "",
        start_time: contestData.start_time,
        duration_seconds: parseInt(contestData.duration_seconds),
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to create contest" };
    }
  } catch (error) {
    console.error("Error creating contest:", error);
    if (error.response?.status === 401) {
      return { error: "Invalid Token" };
    }
    return {
      error: error.response?.data?.message || "Failed to create contest",
    };
  }
};

contestModule.updateContest = async (contest) => {
  const access_token = userModule.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  try {
    const response = await axios.put(
      `http://localhost:8000/api/contests`,
      {
        id: contest.id,
        title: contest.title,
        description: contest.description,
        start_time: contest.start_time,
        duration_seconds: parseInt(contest.duration_seconds),
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to update contest" };
    }
  } catch (error) {
    console.error("Error updating contest:", error);
    if (error.response?.status === 401) {
      return { error: "Invalid Token" };
    }
    return {
      error: error.response?.data?.message || "Failed to update contest",
    };
  }
};

contestModule.assignProblem = async (contestProblem) => {
  const access_token = userModule.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  // Input validation
  if (!contestProblem || typeof contestProblem !== "object") {
    return { error: "Contest problem data is required" };
  }

  if (!contestProblem.contest_id || !contestProblem.problem_id) {
    return { error: "Contest ID and Problem ID are required" };
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/contests/assign",
      {
        contest_id: parseInt(contestProblem.contest_id),
        problem_id: parseInt(contestProblem.problem_id),
        index: contestProblem.index
          ? parseInt(contestProblem.index)
          : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to assign problem to contest" };
    }
  } catch (error) {
    console.error("Error assigning problem:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Access denied" };
        case 404:
          return { error: "Contest or problem not found" };
        case 409:
          return { error: "Problem already assigned to this contest" };
        case 422:
          return {
            error: error.response.data?.message || "Invalid data provided",
          };
        case 500:
          return { error: "Server error occurred" };
        default:
          return {
            error:
              error.response.data?.message ||
              `Server error: ${error.response.status}`,
          };
      }
    } else if (error.request) {
      return { error: "Network error - unable to connect to server" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

contestModule.getContestProblems = async (contestId) => {
  const access_token = userModule.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  // Input validation
  if (!contestId) {
    return { error: "Contest ID is required" };
  }

  const numericId = parseInt(contestId);
  if (isNaN(numericId) || numericId <= 0) {
    return { error: "Invalid contest ID format" };
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/api/contests/problems/${numericId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 200) {
      const problems = response.data;

      // Ensure problems is always an array
      if (!Array.isArray(problems)) {
        return [];
      }

      return problems;
    } else {
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (error) {
    console.error("Error fetching contest problems:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Access denied" };
        case 404:
          return { error: "Contest not found" };
        case 500:
          return { error: "Server error occurred" };
        default:
          return {
            error:
              error.response.data?.message ||
              `Server error: ${error.response.status}`,
          };
      }
    } else if (error.request) {
      return { error: "Network error - unable to connect to server" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export default contestModule;

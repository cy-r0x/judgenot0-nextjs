import axios from "axios";
import userMoudle from "../user/user";

const problemMoudle = {};

problemMoudle.getProblem = async (problemId) => {
  // Input validation
  if (!problemId) {
    return { error: "Problem ID is required" };
  }

  // Validate problemId is a valid number or string that can be converted to number
  const numericId = parseInt(problemId);
  if (isNaN(numericId) || numericId <= 0) {
    return { error: "Invalid problem ID format" };
  }

  const access_token = userMoudle.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  try {
    const response = await axios.get(
      `http://localhost:8000/api/problems/${numericId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 200) {
      const problemData = response.data;

      // Ensure test_cases is always an array (handle null/undefined)
      if (!problemData.test_cases || !Array.isArray(problemData.test_cases)) {
        problemData.test_cases = [];
      }

      // Ensure numeric fields are properly typed
      if (problemData.time_limit) {
        problemData.time_limit = parseInt(problemData.time_limit);
      }
      if (problemData.memory_limit) {
        problemData.memory_limit = parseInt(problemData.memory_limit);
      }
      if (problemData.id) {
        problemData.id = parseInt(problemData.id);
      }
      if (problemData.created_by) {
        problemData.created_by = parseInt(problemData.created_by);
      }

      return problemData;
    } else {
      return { error: `Unexpected response status: ${response.status}` };
    }
  } catch (error) {
    console.error("Error fetching problem:", error);

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Access denied" };
        case 404:
          return { error: "Problem not found" };
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
      // Network error - no response received
      return { error: "Network error - unable to connect to server" };
    } else {
      // Other errors
      return { error: "An unexpected error occurred" };
    }
  }
};

problemMoudle.updateProblem = async (problem) => {
  const access_token = userMoudle.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  try {
    // Helper function to safely stringify content if it's not already a string
    const safeStringify = (content) => {
      if (typeof content === "string") {
        return content;
      }
      return JSON.stringify(content);
    };

    const response = await axios.put(
      `http://localhost:8000/api/problems`,
      {
        id: problem.id,
        title: problem.title,
        slug: problem.slug,
        statement: safeStringify(problem.statement),
        input_statement: safeStringify(problem.input_statement),
        output_statement: safeStringify(problem.output_statement),
        time_limit: parseInt(problem.time_limit),
        memory_limit: parseInt(problem.memory_limit),
        test_cases: problem.test_cases,
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
      return { error: "Failed to update problem" };
    }
  } catch (error) {
    console.error("Error updating problem:", error);
    if (error.response?.status === 401) {
      return { error: "Invalid Token" };
    }
    return {
      error: error.response?.data?.message || "Failed to update problem",
    };
  }
};

export default problemMoudle;

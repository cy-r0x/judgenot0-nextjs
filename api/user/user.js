import axios from "axios";

const userMoudle = {};

userMoudle.Login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: "Invalid credentials" };
    }
    return { error: error.response?.data?.message || "Login failed" };
  }
};

userMoudle.Register = async (userData) => {
  try {
    // Get access token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access_token) {
      return { error: "No access token found" };
    }

    const access_token = user.access_token;

    // Make the registration request
    const response = await axios.post(
      "http://localhost:8000/api/user/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);

    if (error.response) {
      // Handle specific HTTP error status codes
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Insufficient permissions to register users" };
        case 409:
          return { error: "User already exists" };
        case 422:
          return { error: error.response.data?.message || "Invalid user data" };
        default:
          return {
            error: error.response.data?.message || "Registration failed",
          };
      }
    }

    return { error: "Network error or server unavailable" };
  }
};

userMoudle.getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    return null;
  }
  return user.role;
};

userMoudle.getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    return null;
  }
  return user.access_token;
};

userMoudle.getContestUsers = async (contestId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access_token) {
      return { error: "No access token found" };
    }

    const response = await axios.get(
      `http://localhost:8000/api/user/${contestId}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get contest users error:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid or expired token" };
        case 403:
          return { error: "Insufficient permissions" };
        case 404:
          return { error: "Contest not found" };
        default:
          return {
            error: error.response.data?.message || "Failed to fetch users",
          };
      }
    }

    return { error: "Network error or server unavailable" };
  }
};

export default userMoudle;

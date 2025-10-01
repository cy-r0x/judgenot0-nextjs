import axios from "axios";
import userMoudle from "../user/user";

const setterModule = {};

setterModule.getProblems = async () => {
  const access_token = userMoudle.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }

  try {
    const response = await axios.get("http://localhost:8000/api/setter", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Failed to fetch problems",
    };
  }
};

setterModule.createProlem = async (title) => {
  const access_token = userMoudle.getToken();
  if (!access_token) {
    return { error: "No access token found" };
  }
  const response = await axios.post(
    "http://localhost:8000/api/problems",
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

export default setterModule;

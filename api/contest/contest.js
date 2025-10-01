import axios from "axios";
const contestModule = {};

contestModule.getContest = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/contests");
    return response.data;
  } catch (error) {
    console.error("Error fetching contest data:", error);
    throw error;
  }
};

export default contestModule;

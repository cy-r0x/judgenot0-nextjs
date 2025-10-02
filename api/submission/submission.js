import axios from "axios";
import userMoudle from "../user/user";

const submissionModule = {};

submissionModule.submitSubmission = async (submissionData) => {
  const access_token = userMoudle.getToken();

  const response = await axios.post(
    "http://localhost:8000/api/submissions",
    {
      problem_id: submissionData.problem_id,
      contest_id: parseInt(submissionData.contest_id),
      source_code: submissionData.source_code,
      language: submissionData.language,
    },
    {
      headers: {
        Authorization: "Bearer" + " " + access_token,
      },
    }
  );
  return response.data;
};

export default submissionModule;

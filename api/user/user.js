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

export default userMoudle;

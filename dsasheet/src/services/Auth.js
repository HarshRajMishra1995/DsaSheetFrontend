import axios from "axios";
// import { encryptRequest, decryptRequest } from "../utils/crypt";

const loginFetch = async ({ email, password }) => {
  try {
    // const Request = await encryptRequest({ email, password });
    const res = await axios.post(`http://localhost:5000/api/v1/Auth/signin`, {
      email,
      password,
    });
    console.log("Login Response ---> ", res);
    localStorage.setItem("token", res.data.token);
    return res.status;
  } catch (error) {
    return error.response?.data?.status;
  }
};

const signUpFetch = async ({ username, email, password }) => {
  let result = await axios
    .post(`http://localhost:5000/api/v1/Auth/signup`, {
      username,
      email,
      password,
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return result;
};
const userProgressFetch = async ({ userId }) => {
  console.log("Into fetch ---> ", userId);
  let result = await axios.get(
    `http://localhost:5000/api/v1/Auth/${userId}/progress`
  );
  return result.data;
};

export { loginFetch, signUpFetch, userProgressFetch };

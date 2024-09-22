import axios from "axios";
// import { encryptRequest, decryptRequest } from "../utils/crypt";

const listTopicFetch = async () => {
  try {
    // const Request = await encryptRequest({ email, password });
    const res = await axios.get(
      `http://localhost:5000/api/v1/Topic/listtopics`
    );
    console.log("List Topics Fetch Response ---> ", res);
    return res.data;
  } catch (error) {
    return error.response?.data?.status;
  }
};

export { listTopicFetch };

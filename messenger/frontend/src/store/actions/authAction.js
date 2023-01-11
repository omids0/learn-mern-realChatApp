import axios from "axios";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      console.log("🚀 ~ file: authAction.js:12 ~ return ~ response", response);
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

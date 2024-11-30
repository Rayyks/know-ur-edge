import instance from "@/services/axios";

export const registerAPI = async (user) => {
  try {
    const response = await instance.post("/api/auth/register", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginAPI = async (credential) => {
  try {
    const response = await instance.post("/api/auth/login", credential);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    await instance.post("/api/auth/logout", {});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

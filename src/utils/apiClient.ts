import axios from "axios";

const BASE_URL = "https://api.playdenapp.com/api/v1";

export const apiClient = async (endpoint: string, method: string, data?: any) => {
  const token = localStorage.getItem("token");  // Fetch the token from localStorage

  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;  // Attach token in header if it exists
  }

  try {
    const response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
    console.error("API error: ", error.response?.data || error.message);
    throw error;  // Re-throw error to be caught by the caller
  }
};

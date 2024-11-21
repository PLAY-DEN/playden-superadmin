import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = async (endpoint: string, method: string, data?: any) => {
  const token = localStorage.getItem("token");  // Fetch token from localStorage

  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;  
} else {
  console.error("Token is missing. Cannot set Authorization header.");
  }

  try {
    const response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      headers,
      data,
    });

    // console.log("API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("API error: ", error.response?.data || error.message);
    throw error;  // Re-throw error to be caught 
  }
};

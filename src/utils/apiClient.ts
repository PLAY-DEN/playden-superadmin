import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = async (
  endpoint: string,
  method: string = "GET",
  data?: any
) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (typeof method !== "string") {
    console.error("Invalid HTTP method passed:", method);
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  const validMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  if (!validMethods.includes(method.toUpperCase())) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }
  
  try {
    const response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method: method.toUpperCase(),
      headers,
      data,
    });
    return response.data;
  } catch (error: any) {
    console.error("API error: ", error.response?.data || error.message);
    throw error;
  }
};

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of authentication context
interface AuthContextInterface {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

// Default values for the context
const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  error: null,
});

// Provide authentication state to the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-Key", "{{token}}"); // Replace "{{token}}" with the actual token if needed.

    const raw = JSON.stringify({ user_id: email, password });

    try {
      const response = await fetch("https://api.playdenapp.com/api/v1/auth/login", {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      setUser({ email }); // Assuming the API responds with user info
      localStorage.setItem("authToken", data.token); // Save token locally for future requests
      setError(null);
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

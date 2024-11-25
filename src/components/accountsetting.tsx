import React, { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

const AccountSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>(null); //to hold settings data
  const [loading, setLoading] = useState<boolean>(true); // to handle loading
  const [error, setError] = useState<string | null>(null); //  to handle errors

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true); // Start loading
        const response = await apiClient("1/settings", "GET"); 
        // console.log("API Response:", response); 
        setSettings(response); // Update state with API data
      } catch (err: any) {
        console.error("Error fetching settings:", err); // Log error
        setError(err.message || "An error occurred"); 
      } finally {
        setLoading(false); 
      }
    };

    fetchSettings(); 
  }, []);

  // Render loading state
  if (loading) {
    return <div className="bg-white mt-8">Loading...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white mt-8 text-red-600">
        <p>Error fetching account settings: {error}</p>
      </div>
    );
  }

  // Render settings data
  return (
    <div className="bg-white mt-8">
      {/* User Information Section */}
      {settings ? (
        <div className="mb-10">
          <table className="max-w-[500px] border border-none">
            <tbody>
              <tr className="border-none">
                <td className="font-semibold py-2">Name:</td>
                <td className="text-sm py-2">{settings.data.name || "N/A"}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold py-2">Email address:</td>
                <td className="text-sm py-2">{settings.email || "N/A"}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold py-2">Phone number:</td>
                <td className="text-sm py-2">{settings.phone || "N/A"}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold py-2">Role:</td>
                <td className="text-sm py-2">{settings.data.role || "N/A"}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold py-2">Change password:</td>
                <td className="text-sm py-2">********</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No account settings found.</p>
      )}

      {/* Manage Admins Section */}
      <div>
        <h3 className="font-semibold mb-4">Manage admins</h3>
        {settings?.admins?.length ? (
          <div className="space-y-4 text-sm">
            {settings.admins.map((admin: { name: string }, index: number) => (
              <div className="flex gap-4" key={index}>
                <span className="font-semibold">{admin.name}</span>
                <button className="text-blue-500">Remove</button>
                <button className="text-blue-500">Allocate new duties</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No admins available.</p>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;

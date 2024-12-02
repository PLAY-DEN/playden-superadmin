import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const useInactivityTimeout = (timeoutDuration: number = 2 * 60 * 60 * 1000, warningTime: number = 5 * 60 * 1000) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  
  const resetTimeout = () => {
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    
    warningRef.current = setTimeout(() => {
      toast.info("Your session will expire in a few minutes. Please take action to stay logged in.");
    }, timeoutDuration - warningTime); 


    
    timeoutRef.current = setTimeout(() => {
      toast.warning("Session expired. Please log in again.");
      dispatch(logout()); 
      localStorage.removeItem("token"); 
    }, timeoutDuration); 
  };

  useEffect(() => {
    
    const handleActivity = () => resetTimeout();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    resetTimeout();

    return () => {
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }

      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  return null; 
};

export default useInactivityTimeout;

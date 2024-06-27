import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      console.log(user);
      const res = await loginRequest(user);
      console.log(res);
      if (res.data.error) {
        console.log("Error Error Error ");
      } else {
        console.log("Set Cookies: ", res.data.user);
        let expiryTime = new Date();
        expiryTime.setTime(expiryTime.getTime() + 5 * 60 * 1000);
        console.log(res.data.token);

        Cookies.set("token", res.data.token, {
          expires: expiryTime,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      //console.log("Error ", error.response);
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      console.log("Vo-------------------------------  ", cookies.token);
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      console.log("object");
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log("object, ", res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const checkLogin = async () => {
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [cookies.token]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data.error) {
        setErrors([res.data.error]);
      } else {
        let expiryTime = new Date();
        expiryTime.setTime(expiryTime.getTime() + 5 * 60 * 1000);
        setCookie("token", res.data.token, {
          httpOnly: true,
          expires: expiryTime,
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    setCookie("token", "", { expires: new Date(0), path: "/" });
    setUser(null);
    setIsAuthenticated(false);
  };

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

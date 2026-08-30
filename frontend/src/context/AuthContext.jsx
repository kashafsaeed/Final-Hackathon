import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext(null);


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ===============================
  // Load saved user
  // ===============================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    const token =
      localStorage.getItem("token");

    if (savedUser && token) {
      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);


  // ===============================
  // REGISTER
  // ===============================

  const register = async (
    name,
    email,
    password
  ) => {

    const response =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

    // DON'T save token here.
    // User must login after registration.

    return response.data;
  };


  // ===============================
  // LOGIN
  // ===============================

  const login = async (
    email,
    password,
    role
  ) => {

    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
          role,
        }
      );

    const {
      token,
      user,
    } = response.data;


    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    setUser(user);

    return user;
  };


  // ===============================
  // LOGOUT
  // ===============================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
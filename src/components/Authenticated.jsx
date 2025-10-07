/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";

const Authenticated = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await api.get("/profile", {
        withCredentials: true,
      });
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
    } catch (error) {
      throw new Error("Failed to fetch user details", error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <>{children}</>;
};

export default Authenticated;

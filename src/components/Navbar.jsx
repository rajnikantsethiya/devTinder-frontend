import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { removeUser } from "../store/userSlice";
import api from "../utils/axiosConfig";
import { setRequests } from "../store/requestsSlice";
import { setConnection } from "../store/connectionSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/auth/logout",
        {},
        { withCredentials: "true" }
      );
      if (res.status === 200) {
        navigate("/login");
        dispatch(removeUser());
        setShowToast(true);
        setToastData({ status: "success", message: res.data.message });
      }
    } catch (error) {
      navigate("/login");
      setShowToast(true);
      setToastData({
        status: "success",
        message: "User logged out successfully",
      });
      console.log(error);
    }
  };
  const handleRequests = async () => {
    try {
      const res = await api.get("/user/requests", { withCredentials: true });
      if (res.status === 200) {
        dispatch(setRequests(res.data?.data));
        navigate("/requests");
      }
    } catch (error) {
      console.log(error.message);
      setShowToast(true);
      setToastData({ status: "error", message: error.message });
    }
  };
  const handleConnections = async () => {
    try {
      const res = await api.get("/user/connections", { withCredentials: true });
      if (res.status === 200) {
        dispatch(setConnection(res.data?.data));
        navigate("/connections");
      }
    } catch (error) {
      console.log(error.message);
      setShowToast(true);
      setToastData({ status: "error", message: error.message });
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={user ? "/feed" : "/login"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" width={20} height={20} />
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="text-xl items-center font-semibold">
            Hi, {user.firstName}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="profile picture" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  onClick={handleConnections}
                  className="justify-between"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  onClick={handleRequests}
                  className="justify-between"
                >
                  Pending Requests
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="justify-between">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showToast && <Toast data={toastData} handler={setShowToast} />}
    </div>
  );
};

export default Navbar;

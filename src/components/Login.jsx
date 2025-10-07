import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
import api from "../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/auth/login",
        { emailId: email, password },
        { withCredentials: true }
      );
      console.log(res);

      if (res?.status === 200) {
        if (res?.data?.code === 200) {
          dispatch(addUser(res.data?.data));
          setShowToast(true);
          setToastData({ status: "success", message: "Login successful" });
          navigateTo("/profile");
        }
        setShowToast(true);
        setToastData({ status: "error", message: res?.data?.message });
      }
    } catch (error) {
      setShowToast(true);
      setToastData({ status: "error", message: error.message });
    }
  };
  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </fieldset>
      {showToast && <Toast data={toastData} handler={setShowToast} />}
    </div>
  );
};

export default Login;

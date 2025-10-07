import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import Toast from "./toast";
import api from "../utils/axiosConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleSingup = async () => {
    try {
      const res = await api.post(
        "/auth/signup",
        { emailId: email, password, firstName, lastName, gender },
        { withCredentials: true }
      );
      if (res.status === 201) {
        dispatch(addUser(res.data?.data));
        setShowToast(true);
        setToastData({ status: "success", message: res.data.message });
        navigateTo("/profile");
      } else {
        setShowToast(true);
        setToastData({ status: "error", message: res.data.message });
      }
    } catch (error) {
      setShowToast(true);
      setToastData({ status: "error", message: error.message });
    }
  };
  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">SignUp</legend>
        <label className="label">FirstName:</label>
        <input
          type="text"
          className="input"
          placeholder="Enter first name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name:</label>
        <input
          type="text"
          className="input"
          placeholder="Enter last name"
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <p>
          Password must contain capital & small letter along with speacil
          character
        </p>

        <label className="label">Gender</label>
        <select
          defaultValue="Select Gender"
          className="select dropdown-bottom"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        {/* <input
          type="text"
          className="input"
          placeholder="Enter gender"
          onChange={(e) => setGender(e.target.value)}
        /> */}

        <button className="btn btn-neutral mt-4" onClick={handleSingup}>
          SignUp
        </button>
      </fieldset>
      {showToast && <Toast data={toastData} handler={setShowToast} />}
    </div>
  );
};

export default Signup;

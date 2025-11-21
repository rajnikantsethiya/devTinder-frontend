/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Toast from "./Toast";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import api from "../utils/axiosConfig";
import { removeUserFromRequests } from "../store/requestsSlice";

const UserCard = ({ user, request, isFeed, isRequests }) => {
  const dispatch = useDispatch();
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);
  const handleFeedAction = async (e) => {
    try {
      const res = await api.post(
        `/connection/send/${e.target.value}/${user._id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.code === 200) {
        setShowToast(true);
        setToastData({
          status: "success",
          message: "Connection request sent successfully",
        });
        dispatch(removeUserFromFeed(user._id));
      } else {
        setShowToast(true);
        setToastData({
          status: "error",
          message: res.data?.message,
        });
      }
    } catch (e) {
      setToastData({ status: "error", message: e.message });
      setShowToast(true);
    }
  };

  const handleRequestAction = async (e) => {
    try {
      const res = await api.post(
        `/connection/review/${e.target.value}/${request._id}`,
        {},
        { withCredentials: true }
      );
      if (res?.status === 200 && res.data?.code === 200) {
        setTimeout(() => dispatch(removeUserFromRequests(request._id)), 1000);
        setShowToast(true);
        setToastData({
          status: "success",
          message: `You've successfully accepted the connection request`,
        });
      } else {
        setShowToast(true);
        setToastData({
          status: "error",
          message: res.data?.message,
        });
      }
    } catch (e) {
      setToastData({ status: "error", message: e.message });
      setShowToast(true);
    }
  };

  const { firstName, lastName, age, photoUrl, bio, gender, skills } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm mb-8 max-h-[600px]">
      <div className="w-96 h-96">
        <img
          className="w-full h-full object-contain"
          src={photoUrl}
          alt="profile"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">
          {firstName} {lastName}, {age}
        </h3>
        <p className="card-text">{gender}</p>
        <p className="card-text">{bio}</p>
        <div className="card-actions justify-end">
          {skills?.map((skill) => (
            <div key={skill} className="badge badge-outline">
              {skill}
            </div>
          ))}
        </div>
        {isFeed && (
          <div className="flex justify-around pt-4">
            <button
              value="ignored"
              className="btn btn-primary btn-secondary"
              onClick={handleFeedAction}
            >
              Ignore
            </button>
            <button
              value="interested"
              className="btn btn-primary btn-primary"
              onClick={handleFeedAction}
            >
              Interested
            </button>
          </div>
        )}
        {isRequests && (
          <div className="flex justify-around pt-4">
            <button
              value="rejected"
              className="btn btn-primary btn-error"
              onClick={handleRequestAction}
            >
              Reject
            </button>
            <button
              value="accepted"
              className="btn btn-primary btn-success"
              onClick={handleRequestAction}
            >
              Accept
            </button>
          </div>
        )}
      </div>
      {showToast && <Toast data={toastData} handler={setShowToast} />}
    </div>
  );
};

export default UserCard;

import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./userCard";

const Requests = () => {
  const { requests } = useSelector((store) => store.requests);

  if (!requests.length) {
    return (
      <h3 className="flex justify-center items-center py-12">
        No pending requests found.
      </h3>
    );
  }
  return (
    <div className="flex flex-col my-12">
      <div className="p-12 bg-white">
        <h3>Pending Requests</h3>
        <p>This is where you can view and manage your pending requests.</p>
      </div>
      {requests?.map((request) => {
        return (
          <div className="flex flex-col my-12 items-center" key={request._id}>
            <UserCard request={request} user={request?.fromUserId} isRequests />
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

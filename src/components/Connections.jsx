import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Connections = () => {
  const { connections } = useSelector((store) => store.connections);

  if (!connections.length) {
    return (
      <h3 className="flex justify-center items-center py-12">
        No connections found !
      </h3>
    );
  }
  return (
    <div className="flex flex-col py-12">
      <div className="p-12 bg-white">
        <h3>Connections</h3>
        <p>This is where you can view your connections</p>
      </div>
      {connections?.map((connection) => {
        return (
          <div
            className="flex flex-col my-12 items-center"
            key={connection._id}
          >
            <UserCard user={connection?.fromUserId} />
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

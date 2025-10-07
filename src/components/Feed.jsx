import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../store/feedSlice";
import UserCard from "./userCard";
import Toast from "./toast";
import api from "../utils/axiosConfig";

const Feed = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((store) => store.feed);
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);
  const fetchFeed = async () => {
    try {
      const res = await api.get("/feed", {
        withCredentials: "true",
      });
      if (res.status === 200) {
        dispatch(setFeed(res.data));
      }
    } catch (err) {
      console.log(err.message);
      setShowToast(true);
      setToastData({ status: "error", message: err.message });
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <div className="flex flex-col py-12 items-center">
      {feed.length ? (
        feed.map((item) => {
          return <UserCard key={item._id} user={item} isFeed />;
        })
      ) : (
        <h3>No results found !</h3>
      )}
      {showToast && <Toast data={toastData} setShowToast={setShowToast} />}
    </div>
  );
};

export default Feed;

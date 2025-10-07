import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { addUser } from "../store/userSlice";
import Toast from "./toast";
import api from "../utils/axiosConfig";
const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [email] = useState(user.emailId);
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [bio, setBio] = useState(user.bio);
  const [age, setAge] = useState(user.age);
  const [gender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [toastData, setToastData] = useState({ status: null, message: null });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    // make api call to update user details
    setToastData({ status: null, message: null });
    try {
      const res = await api.patch(
        "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          bio,
          age,
          skills,
        },
        { withCredentials: true }
      );
      if (res.status !== 200) {
        setShowToast(true);
        setToastData({ status: "error", message: res.data.message });
        return;
      }
      setShowToast(true);
      setToastData({ status: "success", message: res.data.message });
      dispatch(
        addUser({ ...user, firstName, lastName, photoUrl, bio, age, skills })
      );
    } catch (error) {
      console.error("Error:", error);
      setShowToast(true);
      setToastData({ status: "error", message: error.message });
    }
  };
  return (
    <div className="flex justify-around">
      <div className="w-1/2 my-12 ml-12">
        {user && (
          <div className="card w-full bg-base-100 w-96 shadow-sm p-2">
            <div className="card-body">
              <div className="flex justify-between">
                <h3 className="card-title">Edit Profile</h3>
                <button className="btn btn-success" onClick={handleSubmit}>
                  Update
                </button>
              </div>
              <>
                <label className="label">Email</label>
                <input type="email" className="input" value={email} disabled />
                <label className="label">FirstName: </label>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <label className="label">LastName: </label>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="label">Gender: </label>
                <input type="text" className="input" value={gender} disabled />
                <label className="label">About: </label>
                <input
                  type="text"
                  className="input"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <label className="label">Age: </label>
                <input
                  type="number"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <label className="label">PhotoUrl: </label>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label className="label">Skills: </label>
                <input
                  type="text"
                  className="input"
                  value={skills.join(", ")}
                  onChange={(e) => setSkills(e.target.value?.split(","))}
                />
              </>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/2 my-12 ml-12">
        <UserCard
          user={{ firstName, lastName, age, photoUrl, bio, gender, skills }}
        />
      </div>
      {showToast && <Toast data={toastData} handler={setShowToast} />}
    </div>
  );
};

export default EditProfile;

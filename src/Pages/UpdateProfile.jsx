import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user, setUser, updateUser } = useContext(AuthContext);
  const handleUpdate = (event) => {
    if (!user) return;
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    updateUser({ displayName: name, photoURL: photo }).then(() => {
      setUser({ ...user, displayName: name, photoURL: photo });
    });
    form.reset();
  };

  return (
    <div className="max-w-md mx-auto mb-10">
      <div className=" bg-base-300 pb-5 rounded-lg ">
        <h1 className="text-3xl font-bold text-center pt-3 mt-3">Profile</h1>
        <img
          className="mx-auto w-40 h-40 rounded-full mt-5"
          src={user?.photoURL}
          alt=""
        />
        <h1 className="text-2xl font-bold text-center mt-3">
          {user?.displayName}
        </h1>
        <p className="text-center text-black/40 mb-2.5">{user?.email}</p>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 px-3">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Photo URL"
            name="photo"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn bg-[#875DF8] text-white">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

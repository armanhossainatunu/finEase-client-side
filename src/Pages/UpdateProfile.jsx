import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import MyContainer from "../Components/MyContainer";
import Button from "../Components/Button";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <MyContainer>
      <div className="text-center py-5">
        <h1 className="text-2xl font-bold mb-5">Update Profile</h1>
        <img
          className="w-40 h-40 rounded-full mx-auto"
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <p className="text-2xl font-bold capitalize">Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>

        <form className="max-w-lg mx-auto space-y-4">
          {/* Name */}
          <div>
            <label className="block text-start font-medium mb-1">Name</label>
            <input
              type="text"
              className=" w-full   px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#875DF8]"
              placeholder="Your Updated Name"
              defaultValue={user?.displayName}
              name="name"
              required
            />
          </div>
          {/* Photo */}
          <div>
            <label className=" block text-start font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              className="w-full  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#875DF8]"
              placeholder="updated Photo URL"
              defaultValue={user?.photoURL}
              name="photo"
              required
            />
          </div>
          <Button>Update Profile</Button>
        </form>
      </div>
    </MyContainer>
  );
};

export default UpdateProfile;

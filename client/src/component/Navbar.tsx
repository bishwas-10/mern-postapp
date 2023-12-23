import React, { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SignProps } from "../store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../store/authSlice";
import { userSignout } from "../store/api";
const Navbar = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser: SignProps = useSelector((state: any) => state.auth);

  const handleSignClick = async (e: React.MouseEvent) => {
    if (!loggedUser.currentUser) {
      navigate("/auth");
    } else {
      await userSignout();
      dispatch(signOut());
      navigate("/auth");
    }
  };

  return (
    <div className=" w-full py-4 flex flex-row items-center justify-between px-6 bg-blue-500 text-white">
      <span className="text-xl font-bold tracking-wide">Welcome</span>
      <div className="flex flex-row gap-4 items-center text-white">
        {loggedUser.currentUser && (
          <span
            onClick={() => navigate("/profile")}
            className="flex flex-row gap-2 items-center"
          >
            {loggedUser.currentUser.profilePicture ? (
              <img
                src={loggedUser.currentUser.profilePicture}
                alt="profile"
                className="h-8 object-cover rounded-full"
              />
            ) : (
              <button className="px-4 py-1 rounded-md text-white bg-green-500">
                {loggedUser.currentUser.name?.split("")[0]}
              </button>
            )}
            <p>{loggedUser.currentUser.name}</p>
          </span>
        )}
        <button
          onClick={handleSignClick}
          className="px-2 py-1 border-2 border-white rounded-md text-center hover:text-blue-500  hover:bg-white"
        >
          {loggedUser.currentUser
            ? "logout"
            : location.pathname === "/auth"
            ? ""
            : "signin"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useFirebaseAuth } from "./AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/swapSlice";

const NavbarChat = () => {
  const currentUser = useFirebaseAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Successfully signed out from Firebase");
      navigate("/");
    } catch (error) {
      console.log("Error signing out from Firebase:", error);
    }

    // Log out from server
    await fetch("/logout")
      .then((response) => response.json())
      .then((json) => {
        if (json.isLoggedIn) {
          console.log("Still logged in");
          navigate("/");
        } else {
          dispatch(logOut());
        }
      });
  };

  return (
    <div className="flex items-center bg-slate-800 h-10 p-2 justify-between text-white">
      <span className="logo">Barter Chat</span>
      <div className="flex user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.username}</span>
        <div className="px-1 ">
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <div className="px-1">
          <NavLink to="/login">
            <button onClick={handleLogout}>Logout</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavbarChat;

import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { userSignupGoogle } from "../store/api";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/authSlice";
import GoogleSvg from "../utils/images/GoogleSvg";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = await userSignupGoogle({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className=" flex flex-row gap-2 items-center justify-center bg-white w-full mb-2 text-black border-2 rounded-lg p-3 
      uppercase hover:opacity-95"
    >
      <GoogleSvg />
      Continue with google
    </button>
  );
};

export default OAuth;

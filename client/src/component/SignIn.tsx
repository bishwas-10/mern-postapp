import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Icon from "./Icon";
import { useGoogleLogin } from "@react-oauth/google";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
} from "../store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignup } from "../store/api";
import OAuth from "./OAuth";
import { RootState } from "../store/store";

export interface FormProps {
  firstName?: string;
  lastName?: string;

  email: string;
  password: string;
  confirmPassword?: string;
}

const iniitialFormState: FormProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInPage = () => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormProps>(iniitialFormState);
  const loggedUser = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("both password fields do not match");
        return;
      }
      const userSignUpData = await userSignup(formData);
      if (userSignUpData) {
        dispatch(signInSuccess(userSignUpData));
      }
    } else {
      const userSignInData = await userLogin(formData);
   
      if (!userSignInData.status) {
        dispatch(signInFailure(userSignInData));
      } else {
        dispatch(signInSuccess(userSignInData.rest));
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsSignedUp(!isSignedUp);
  };

  useEffect(() => {
    if (loggedUser.currentUser) {
      navigate("/");
    }
  }, [loggedUser.currentUser]);

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm h-content bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isSignedUp ? "Sign in" : "Sign up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isSignedUp && (
            <div className="flex flex-row gap-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
                  placeholder=" firstname"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="lastname"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Enter your lastname"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isSignedUp && (
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="mb-6 w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
          >
            {isSignedUp ? "Sign in" : "Sign up"}
          </button>
          <OAuth />
          {/* <GoogleLogin onSuccess={login as any}/> */}

          <div className="flex flex-row gap-2 justify-center align-center">
            <p>
              {isSignedUp
                ? "Didn't have an account?"
                : "Already have an account?"}
            </p>
            <button
              className="outline-none text-blue-600"
              onClick={handleClick}
            >
              {isSignedUp ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

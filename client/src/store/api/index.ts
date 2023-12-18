import axios, { AxiosError } from "axios";
import { Post } from "../postSlice";
import { useDispatch } from "react-redux";
import { FormProps } from "../../component/SignIn";
import {
  SignResultProps,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../authSlice";

const instance = axios.create({
  baseURL: "https://mern-postapp.onrender.com/api",
  withCredentials: true,
  // This assumes that the requests will be prefixed with '/api' and be redirected by the proxy during development
  // Other axios configurations if needed
});

export const createPost = async (postData: Post) => {
  try {
    const response = await instance.post("/posts", postData);

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await instance.get("/posts");

    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const updatePosts = async (id: number, updateData: Post) => {
  try {
    const response = await instance.patch(`/posts/${id}`, updateData);

    return response.data;
  } catch (error) {
    console.error("Error updating posts:", error);
    throw error;
  }
};
export const deletePost = async (id: Post["_id"]) => {
  try {
    const response = await instance.delete(`/posts/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error deleting posts:", error);
  }
};
export const likePost = async (id: Post["_id"]) => {
  try {
    const response = await instance.patch(`/posts/${id}/likePost`);

    return response.data;
  } catch (error) {
    console.log("Error liking posts:", error);
  }
};

export const userLogin = async (formData: FormProps) => {
  try {
    const { data } = await instance.post("/users/login", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error loggin in:", error);
  }
};

export const userSignup = async (formData: FormProps) => {
  try {
    const { data } = await instance.post("/users/signup", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error Signing up:", error);
  }
};
interface GoogleProps {
  name: string | null;
  email: string | null;

  photo: string | null;
}
export const userSignupGoogle = async (formData: GoogleProps) => {
  try {
    const { data } = await instance.post("/users/google", formData);

    return data;
  } catch (error) {
    console.log("Error Signing up:", error);
  }
};

export const userSignout = async () => {
  try {
    await instance.get(`/users/signout`);
  } catch (error) {
    console.log("Error Signing out:", error);
  }
};

export const userUpdate = async (id: string, updateData: SignResultProps) => {
  try {
    const { data } = await instance.post(`/users/update/${id}`, updateData);
    return data;
  } catch (error) {
    console.log("Error Signing up:", error);
  }
};

export const userDelete = async (id: string) => {
  try {
    const { data } = await instance.delete(`/users/delete/${id}`);
    return data;
  } catch (error) {
    console.log("Error deleting up:", error);
  }
};

export default instance; // You can also export the axios instance for additional usage

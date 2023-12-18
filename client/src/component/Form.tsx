import React, { useState, useEffect } from "react";
import { Post } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostSuccess,
  getPostsSuccess,
  updatePostsSuccess,
} from "../store/postSlice";
import FileBase from "react-file-base64";
import { Action } from "redux";

import { RootState } from "../store/store";
import { createPost, updatePosts, getPosts } from "../store/api";
import { useNavigate } from "react-router-dom";

export interface ChildProps {
  currentId: Post["_id"];
  setCurrentId: (currentId: Post["_id"]) => void;
}

const Form: React.FC<ChildProps> = ({ currentId, setCurrentId }) => {
  const [formData, setFormData] = useState<Post>({
    title: "",
    name: "",
    location: "",
    description: "",
    selectedFile: "",
  });
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.auth);
  const [submit, setSubmit] = useState<string>("submit");
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    currentId
      ? state.posts.posts.find((data: Post) => data._id === currentId)
      : null
  );

  const clear = () => {
    setCurrentId(0);
    setFormData({
      title: "",
      name: "",
      location: "",
      description: "",
      selectedFile: "",
    });
  };
  const handleSelectedFile = (file: string) => {
    const maxFileSize = 1024 * 1024 * 30;

    if (maxFileSize < file.length) {
      alert("please select a file less than 30mb");
    } else {
      setFormData({ ...formData, selectedFile: file });
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (currentId) {
      const updateData = await updatePosts(currentId, {
        ...formData,
        name: loggedUser?.currentUser?.name as string,
      });
      dispatch(updatePostsSuccess(updateData) as any);
    } else {
      const createPostData = await createPost({
        ...formData,
        name: loggedUser?.currentUser?.name as string,
      });
      dispatch(createPostSuccess(createPostData) as any);
    }
    clear();
    const postData = await getPosts();
    dispatch(getPostsSuccess(postData?.data) as any);
  };
  useEffect(() => {
    if (post) {
      setSubmit("update");
      setFormData(post);
    }
  }, [dispatch, post]);

  if (!loggedUser?.currentUser) {
    return (
      <div className="max-w-md mx-auto ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg">Please sign in to create or like posts</p>
          <button
          onClick={()=>navigate("/auth")}
            className="mt-2 px-2 py-1 border-2 border-blue-500 rounded-md 
        text-center hover:text-white  hover:bg-blue-500"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={formData.title}
            placeholder="Enter title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            value={formData.location}
            placeholder="Enter location"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={formData.description}
            placeholder="Enter description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-4">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: { base64: string }) =>
              handleSelectedFile(base64)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            {submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

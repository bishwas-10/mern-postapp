import React, { memo, useCallback, useState } from "react";
import { FileEdit, Heart, Trash2 } from "lucide-react";
import { MapPin } from "lucide-react";
import {
  Post,
  createPostSuccess,
  updatePostsSuccess,
  deletePostsSuccess,
  likePostsSuccess,
} from "../store/postSlice";
import { ChildProps } from "./Form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deletePost, likePost } from "../store/api";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { SignProps } from "../store/authSlice";
interface ModalProps {
  status: boolean;
  message: string;
}
const PostComponent = ({
  post,
  setCurrentId,
}: {
  post: Post;
  setCurrentId: ChildProps["setCurrentId"];
}) => {
  console.log("rendered");
  const [showModal, setShowModal] = useState<ModalProps>({
    status: false,
    message: "",
  });
  const loggedUser = useSelector((state: RootState) => state.auth) as SignProps;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    setCurrentId(post._id);
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await deletePost(post._id);
    dispatch(deletePostsSuccess(post._id) as any);
  };
  const handleLikeClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const likedPost = await likePost(post._id);
    console.log(likedPost);
    if (likedPost.status) {
      dispatch(likePostsSuccess(likedPost.post) as any);
    } else {
      setShowModal({ status: true, message: `${likedPost.message}` });
    }
  };
  return (
    <div className=" relative">
      <img
        src={post?.selectedFile}
        alt="Post Image"
        className=" rounded-lg mb-4 h-40 w-full aspect-square object-cover"
      />
      {(loggedUser?.currentUser?._id === post.creator) &&(
        <span className="absolute top-2 right-2 flex flex-row gap-2 text-white">
        <FileEdit
          className="cursor-pointer "
          onClick={handleEditClick}
          height={20}
          width={20}
        />
      </span>
      )}
      
      <h2 className="text-xl capitalize opacity-70  font-bold mb-2  text-white">
        {post?.title}
      </h2>
      <p className="text-gray-700  mb-4 line-clamp-2">{post?.description}</p>

      <div className="flex flex-wrap mb-4">
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Tag1
        </span>
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Tag2
        </span>
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Tag3
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center mb-4">
          <img
            src="creator-avatar.jpg"
            alt="Creator"
            className="rounded-full h-8 w-8 mr-2"
          />
          <span className=" text-blue-700 text-md font-semibold">
            {post?.name}
          </span>
        </div>

        <div className="flex flex-row gap-2 text-gray-700">
          <MapPin />
          <span>{post?.location}</span>
        </div>
      </div>

      <span className=" text-gray-700">
        {moment(post.createdAt).fromNow()}
      </span>
      <div className="flex flex-row justify-between gap-2 text-gray-700 mt-2">
        <span
          onClick={handleLikeClick}
          className="flex flex-row items-center p-1 rounded-md gap-1 cursor-pointer hover:drop-shadow-xl hover:ring-1 hover:ring-gray-600 "
        >
          <Heart height={20} width={20} className=" stroke-red-700" />
          {post.likeCount?.length} Like
        </span>
        {loggedUser?.currentUser?._id === post.creator && (
          <span
            onClick={handleDeleteClick}
            className="flex flex-row items-center p-1 rounded-md gap-1 cursor-pointer  hover:drop-shadow-xl hover:ring-1 hover:ring-gray-600"
          >
            <Trash2
              height={25}
              width={25}
              className=" stroke-white fill-red-700"
            />
            Delete
          </span>
        )}
      </div>
      {showModal.status && (
        <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-600 z-20">
          <div className=" w-[40%] h-content p-4 text-white border-2 rounded-md">
            <button
              className="relative -top-2 right-0  text-xl "
              onClick={() => setShowModal({ status: false, message: "" })}
            >
              X
            </button>
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <p>{showModal.message}</p>
              <button
                onClick={() => navigate("/auth")}
                className="px-2 py-1 border-2 border-white rounded-md text-center hover:text-blue-500  hover:bg-white"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComponent;

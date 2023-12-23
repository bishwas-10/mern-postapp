import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { userDelete, userSignout, userUpdate } from "../store/api";
import {
  SignResultProps,
  signOut,
  userDeleteFailure,
  userDeleteStart,
  userDeleteSuccess,
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
} from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  console.log("profile rendered");
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const imageRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<SignResultProps>({
    _id: currentUser?._id,
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    profilePicture: currentUser?.profilePicture || "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [errorUploading, setErrorUploading] = useState<boolean>(false);
  const [updateSuccess,setUpdateSuccess] = useState<boolean>(false)
  const dispatch = useDispatch();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);
  const handleImageUpload = async (image: File) => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setErrorUploading(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(userUpdateStart());
      const updatedData = await userUpdate(
        currentUser?._id as string,
        formData
      );
     
      dispatch(userUpdateSuccess(updatedData));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(userUpdateFailure())
    }
  };

  const handleSignClick = async () => {
    await userSignout();
    dispatch(signOut());
    navigate("/auth");
  };
  const handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      dispatch(userDeleteStart());
      const data = await userDelete(currentUser?._id as string);
      dispatch(userDeleteSuccess());
    } catch (error) {
      dispatch(userDeleteFailure());
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto text-black">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={imageRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* 
    firebase storage rules:  
    allow read;
    allow write: if
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*') */}
        <img
          src={
            (formData && formData.profilePicture) || currentUser?.profilePicture
          }
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => imageRef.current?.click()}
        />
        <p className="text-sm self-center">
          {errorUploading ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser?.name}
          type="text"
          id="name"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleFormChange}
        />
        <input
          defaultValue={currentUser?.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleFormChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleFormChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteClick}
        >
          Delete Account
        </span>
        <span onClick={handleSignClick} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">{updateSuccess && "User is updated successfully!"}</p>
    </div>
  );
};

export default Profile;

import React,{useState, useEffect} from 'react'
import Form from "./Form";
import Posts from "./Posts";
import { useDispatch } from "react-redux";
import { getPostsSuccess } from "../store/postSlice";
import { ChildProps } from "./Form";
import { getPosts } from '../store/api';
const Home = () => {
    const [currentId, setCurrentId]= useState<ChildProps["currentId"]>(0);
  const dispatch = useDispatch();
const getPostCall =async()=>{
   const postData=await getPosts();
    
    dispatch(getPostsSuccess(postData?.data) as any);
}
  useEffect(()=>{
   getPostCall();
  },[])
  return (
    <div className="flex flex-col-reverse md:flex-row justify-around gap-4 p-6 m-4 border-2 border-gray-400">
        <Posts  setCurrentId= {setCurrentId}/>
      <Form currentId={currentId} setCurrentId= {setCurrentId}/>
    </div>
  )
}

export default Home
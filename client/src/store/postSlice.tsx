import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api/index";
import * as types from "./constant";

export interface Post {
  _id?: number | undefined;
  title: string;
  name:string,
  creator?:string;
  location: string;
  description: string;
  selectedFile?: string;
  createdAt?: string;
  likeCount?: string[];
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};


const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPostStart: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.posts=[...state.posts, action.payload];
      state.loading = false;
      state.error = null;
    },
    createPostfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPostsStart: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.posts= action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostsStart: (state) => {
      state.loading = true;
    },
    updatePostsSuccess: (state, action) => {
      const updatePostId = action.payload._id;
      const updatedPosts = state.posts.map((post)=> (post._id===updatePostId) ? action.payload :post)
      state.posts= updatedPosts;
      state.loading = false;
      state.error = null;
    },
    updatePostsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    likePostsStart: (state) => {
      state.loading = true;
    },
    likePostsSuccess: (state, action) => {
      const updatePostId = action.payload._id;
      const updatedPosts = state.posts.map((post)=> (post._id===updatePostId) ? action.payload :post)
      state.posts= updatedPosts;
      state.loading = false;
      state.error = null;
    },
    likePostsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostsStart: (state) => {
      state.loading = true;
    },
    deletePostsSuccess: (state, action) => {
      const updatedPosts= state.posts.filter((post)=> post._id!==action.payload);
      state.posts = updatedPosts;
      state.loading = false;
      state.error = null;
    },
    deletePostsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  
});
export const{createPostSuccess,getPostsSuccess, deletePostsSuccess,likePostsSuccess,updatePostsSuccess}= postsSlice.actions;
export default postsSlice.reducer;

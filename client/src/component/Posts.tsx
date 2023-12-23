import { useSelector } from "react-redux";
import { Post } from "../store/postSlice";
import { RootState } from "../store/store";
import PostComponent from "./PostComponent";
import { ChildProps } from "./Form";
import Loading from "./Loading";
const Posts = ({
  setCurrentId,
}: {
  setCurrentId: ChildProps["setCurrentId"];
}) => {
  const posts = useSelector((state: RootState) => state.posts); // Accessing posts from Redux state
  

  return (
    !posts.posts.length ?  <Loading /> :
    <div className="w-[100%] md:w-[60%] h-content">
      <div className="flex flex-col md:flex-wrap  gap-4">
        {posts?.posts.map((post: Post, index) => (
          <div
            className="bg-white shadow-lg rounded-lg p-6 w-[100%] md:w-[60%] mx-auto"
            key={index}
          >
            <PostComponent setCurrentId={setCurrentId} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCard from "../components/SingleCard";
import { getPosts, postLoading, postsArray } from "../Reducers/postsSlice";
import useSession from "../hooks/useSession";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(postLoading);
  const allPosts = useSelector(postsArray);

  const test = useSession();
  console.log(test);

  // dispatch del getPosts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      {allPosts &&
        allPosts.post?.map((item) => {
          return (
            <SingleCard
              title={item.title}
              image={item.image}
              content={item.content}
              author={item.author}
              rate={item.rate}
            />
          );
        })}
    </>
  );
};

export default Home;

import React, { useEffect,useState } from "react";
import usePosts from "../../../hooks/usePosts";
import Loading from "../../../loading/Loading";
import Modal from "../../modal/Modal";
import AddPost from "../posts/AddPost";
import CardPost from "./CardPost";
import "./../design/input.css";
import "./../design/button.css";
import UsersImg from "../UsersImg";
import { BsSearch } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import CategoriesPost from "./CategoriesPost";

const Posts = () => {
  const {
    posts,
    loading,
    pagesPosts,
    toggleFavorite,
    searchPosts,
    refreshPost,
    
    allPosts
  } = usePosts();

  const {user} = useAuth()
  const [addPost, setAddPost] = useState(false);
  const [pages, setPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [refreshDeletePost, setRefreshDeletePost] = useState(false)
  const plus = () => {
    if (posts.length > 1) {
      let pagesNumber = parseInt(pages);
      pagesNumber++;
      setPages(pagesNumber.toString());
    }
  };
  const minus = () => {
    if (pages > 1) {
      let pagesNumber = parseInt(pages);
      pagesNumber--;
      setPages(pagesNumber.toString());
    }
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      searchPosts(searchText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    pagesPosts(pages);
  }, [pages,refreshDeletePost]);

  useEffect(()=>{
  allPosts()
  },[refreshPost])

 

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="text-blog">
            <div className="image-container relative">
              <img
                className="w-full h-[40rem] opacity-50"
                src="https://img.freepik.com/free-photo/top-view-hands-holding-pen-airplane_23-2149617659.jpg?w=1380&t=st=1689944485~exp=1689945085~hmac=fb6eef63d7d7e35527cb37f67f37b31e5b9d432422ef71a274faf6d2fa2dc4d2"
                alt=""
              />
            </div>
            <div className="blogs absolute top-20 lg:top-1/4 text-white lg:left-1/4 lg:right-72">
              <h1 className="text-[3em]">Blogs</h1>
              <p className="text-[1.3em] ">
                At our travel blog website, we believe that the world is an open
                book waiting to be explored, <br /> and we're eager to pen new
                chapters of adventure with you. So, dive in, get inspired,{" "}
                <br /> and embark on unforgettable escapades that will enrich
                your soul and leave you with <br /> cherished memories.
              </p>
              <div className="textSearch text-[2em] font-serif mt-5">
                Search blogs
              </div>

              <div className="searchBox my-5">
                <div className="shadow-input"></div>
                <input
                  className="font-serif italic"
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <BsSearch onClick={handleSearch} className="search-icon" />
              </div>
            </div>
          </div>
          <UsersImg />
          <div className="container">
           
            <div className="flex flex-col-reverse items-end">
            <p className="text-[1.2em] pb-5 italic">
                "Embark on your own digital journey and share your travel
                experiences with the world!"
              </p>
            </div>
            {user && <div className="flex flex-col-reverse items-end py-5">
              <button
                onClick={() => setAddPost(true)}
                className="shadow__btn ml-4 animate-bounce"
              >
                Add Post
              </button>
            </div>}

            <div className="my-20">
              <CategoriesPost/>
            </div>

            <div className="join flex items-center justify-center mt-20">
              <button
                onClick={() => {
                  minus();
                }}
                className="join-item btn"
              >
                «
              </button>
              <button className="join-item btn">Next</button>
              <button
                onClick={() => {
                  plus();
                }}
                className="join-item btn"
              >
                »
              </button>
            </div>
            

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {posts.map((item) => (
                <CardPost
                  key={item._id}
                  post={item}
                  toggleFavorite={toggleFavorite}
                  setRefreshDeletePost={setRefreshDeletePost}
                />
              ))}
            </div>

            {addPost && (
              <Modal open={addPost} setOpen={setAddPost}>
                <AddPost setAddPost={setAddPost} />
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;

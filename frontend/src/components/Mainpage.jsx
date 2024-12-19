import axios from "axios";
import React, { useEffect, useState } from "react";

function Mainpage() {
  // State for posts and form inputs
  useEffect(() => {
    getPosts();
    getallInt();
  }, []);

  const [description, setDescription] = useState("");
  const [title, settitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [interactions, setInteractions] = useState({});

  const [newPostContent, setNewPostContent] = useState("");

  // Function to handle new post submission
  const handlePostSubmit = async () => {
    const res = await axios.post("http://localhost:8000/newblog", {
      title,
      description,
    });
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getall");
      console.log(res.data);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInteractions = async (postId) => {
    try {
      const res = await axios.post("http://localhost:8000/getInt", postId);
      console.log(res.data);
      setInteractions((prevInteractions) => ({
        ...prevInteractions,
        [postId]: res.data[0], // Store interactions per post
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getallInt = async (postId) => {
    try {
      const res = await axios.get("http://localhost:8000/int");
      console.log(res.data);
      setInteractions((prevInteractions) => ({
        ...prevInteractions,
        interactions: res.data[0], // Store interactions per post
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddComment = async (like, comment, postId) => {
    console.log(like, comment, postId);

    try {
      await axios.post("http://localhost:8000/interaction", {
        like,
        comment,
        postId,
      });

      // Re-fetch interactions after adding a comment
      getInteractions(postId);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle like button click

  // Function to handle adding a comment

  return (
    <div className="bg-dark">
      <div className="container bg-dark text-light py-5">
        <h1 className="text-center mb-4">Hello! User</h1>

        {/* Create Post Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create a Post</h5>
            <input
              className="card-title"
              placeholder="title"
              onChange={(e) => settitle(e.target.value)}
              value={title}
            ></input>
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary w-100"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts List */}
        {posts.map((post) => (
          <div className="card mb-4" key={post._id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => getInteractions(post._id)} // Use post._id for the key
                >
                  Like ({interactions[post._id]?.like || 0})
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-3">
                <h6>Comments</h6>
                {interactions[post._id]?.comments?.map((comment, index) => (
                  <div key={index} className="alert alert-secondary p-2">
                    {comment}
                  </div>
                ))}
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleAddComment(0, e.target.value, post._id); // Add the comment
                        e.target.value = ""; // Clear the input after adding the comment
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => {
                      const input = e.target.previousSibling;
                      if (input.value) {
                        handleAddComment(0, input.value, post._id); // Add the comment
                        input.value = ""; // Clear the input after adding the comment
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mainpage;

import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../redux/hooks";
import axios from "axios";

const Landing = () => {
  // const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    // Fetch blogs from your API using Axios
    axios.get("/api/todos/allblogs")
      .then(response => {
        setBlogs(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleExpandClick = (blogId) => {
    setExpandedBlogId(blogId);
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog App 3.0</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{blog.title}</h3>
            {expandedBlogId === blog._id ? (
              <p className="card-text">{blog.text}</p>
            ) : (
              <p className="card-text">{blog.text.slice(0, 2)}</p>
            )}
            <button
              className="btn btn-primary"
              onClick={() => handleExpandClick(blog._id)}
            >
              {expandedBlogId === blog.id ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Landing;

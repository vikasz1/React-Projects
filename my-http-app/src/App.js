import "./App.css";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import http from './services/httpService'
import config from './config.json'
// const url = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    //pending > result(success/failure)
    const { data: posts } = await http.get(config.url);
    // console.log(posts)
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.url, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    // console.log(post);
  };
  handleUpdate = async (post) => {
    const originalPost = { ...post };
    post.title = "Updated Post";
    // console.log("Update", post);
    const { data } = await http.put(config.url + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(originalPost);
    posts[index] = data;
    this.setState({ posts });
  };
  handleDelete = async (post) => {
    const originalPosts = [...this.state.posts];

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete("sd"+config.url + "/"+post.id);
    } catch (e) {
      console.log("hello wor l");
      if (e.response && e.response.status === 404)
        alert("This post has already been deleted");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="m-3">
      <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

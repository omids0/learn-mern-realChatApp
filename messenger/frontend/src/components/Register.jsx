import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/actions/authAction";

function Register() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userName: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { userName, email, passWord, confirmPassWord, image } = state;

    e.preventDefault();

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("passWord", passWord);
    formData.append("confirmPassWord", confirmPassWord);
    formData.append("image", image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
          <div>
            <div className="card-body">
              <form onSubmit={register}>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    id="username"
                    name="userName"
                    onChange={inputHandle}
                    value={state.userName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={inputHandle}
                    value={state.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    name="passWord"
                    onChange={inputHandle}
                    value={state.passWord}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="conformPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    id="conformPassword"
                    name="confirmPassWord"
                    onChange={inputHandle}
                    value={state.confirmPassWord}
                  />
                </div>
                <div className="form-group">
                  <div className="file-image">
                    <div className="image">
                      {loadImage && <img src={loadImage} alt="image" />}
                    </div>
                    <div className="file">
                      <label htmlFor="image">Select Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={fileHandle}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input type="submit" value="register" className="btn" />
                </div>

                <div className="form-group">
                  <span>
                    <Link to="/messenger/login">Login Your Account</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

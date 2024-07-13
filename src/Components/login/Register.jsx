import React from "react";
import "./login.css";
const Register = ({handleAvatar, handleRegister,avatar,loading}) => {
  return (
    <div className="flex-1 flex flex-col gap-5 items-center">
      <div className="flex-1">
        <form className="form" onSubmit={handleRegister}>
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to app. </p>

          <label>
            <input required type="text" className="input" name="username" />
            <span>Username</span>
          </label>

          <label>
            <input required type="email" className="input" name="email" />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="password"
              className="input"
              name="password"
            />
            <span>Password</span>
          </label>

          <div>
            <label
              className="flex items-center gap-3 text-gray-600 cursor-pointer text-sm font-bold mb-2"
              htmlFor="file"
            >
              <img
                src={avatar.url || "/user.png"}
                alt="User Image"
                className="w-8 h-8 rounded-full"
              />
              Upload an Image
            </label>
            <input
              id="file"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
          </div>
          <button disabled={loading} type="submit" className="submit">
            {loading ? "Loading" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

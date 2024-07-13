import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../library/Firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../library/upload";
import "./login.css";
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const imgurl = await upload(avatar.file);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "Users", res.user.uid), {
        username,
        email,
        avatar: imgurl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "usersChats", res.user.uid), {
        chats: [],
      });

      toast.success("Account Created!");
    } catch (er) {
      toast.error(er.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full gap-24 justify-between items-center p-5">
      <div className="flex-1 flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-bold">Welcome To React Chat</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              name="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={loading}
              className="loading bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Loading" : "Log In"}
            </button>
          </div>
        </form>
      </div>

      <div className="seperate h-[80%] w-0.5 bg-gray-300"></div>

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

            <p>Alerady have account ?<a href="">Log in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

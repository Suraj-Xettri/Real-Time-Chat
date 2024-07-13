import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../library/Firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../library/upload";
import Register from "./Register";
import "./logintwo.css";

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

  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex w-[80%] h-[80%] flex-col items-center pt-10 bg-transparent">
      <div className="relative">
        <label className="flex flex-col items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={isFlipped}
            onChange={handleToggle}
          />
          <div className="relative inline-block w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out">
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                isFlipped ? "translate-x-6" : ""
              }`}
            />
          </div>
          <div className="mt-2 text-lg font-semibold">
            {isFlipped ? "Sign up" : "Log in"}
          </div>
        </label>
      </div>

      {
        isFlipped ? (
          <Register
            loading={loading}
            avatar={avatar}
            handleRegister={handleRegister}
            handleAvatar={handleAvatar}
          />
        ) : (
          <div className="flex-1 flex flex-col gap-5 items-center">
            <div className="flex-1">
              <form className="form" onSubmit={handleLogin}>
                <p className="title">Welcome Back </p>
                <p className="message">
                 Log in to get full access to app.
                </p>
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

                <button disabled={loading} type="submit" className="submit">
                  {loading ? "Loading" : "Log In"}
                </button>

                <p className="text-center">Forgot Password ?</p>
              </form>
             
            </div>
          </div>
        )
      }
    </div>
  );
};
export default Login;

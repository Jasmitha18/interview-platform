import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            name: data.name,
            email: email,
          })
        );


        navigate("/home");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Backend Connection Failed");

    }

  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-5">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Interview
          <span className="text-orange-500">
            AI
          </span>
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Welcome Back
        </p>

        {/* Email */}
        <div className="mb-5">

          <label className="font-medium text-white">
            Email
          </label>

          <div className="relative mt-2">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

          </div>

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="font-medium text-white">
            Password
          </label>

          <div className="relative mt-2">

            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-300"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>

        {/* Register Button */}
        <Link to="/register">

          <button className="w-full mt-4 border border-cyan-400 text-cyan-400 py-3 rounded-xl font-semibold hover:bg-cyan-400 hover:text-white transition duration-300">
            Create Account
          </button>

        </Link>

      </div>

    </div>
  );
};

export default Login;
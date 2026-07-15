import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account Created Successfully!");
        navigate("/");
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

      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Interview<span className="text-cyan-400">AI</span>
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Create your account
        </p>

        <div className="mb-4">
          <label className="text-white">Full Name</label>

          <div className="relative mt-2">
            <FaUser className="absolute left-4 top-4 text-gray-300" />

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 py-3"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white">Email</label>

          <div className="relative mt-2">
            <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 py-3"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white">Password</label>

          <div className="relative mt-2">
            <FaLock className="absolute left-4 top-4 text-gray-300" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 py-3"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-white"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white">
            Confirm Password
          </label>

          <div className="relative mt-2">
            <FaLock className="absolute left-4 top-4 text-gray-300" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl pl-12 py-3"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-4 text-white"
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold"
        >
          Create Account
        </button>

        <p className="text-center mt-5 text-gray-300">
          Already have an account?

          <Link
            to="/"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
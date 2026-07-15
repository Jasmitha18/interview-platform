import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">

      <nav className="backdrop-blur-lg bg-white/10 border-b border-white/10 px-10 py-5 flex justify-between">

        <h1 className="text-3xl font-bold">
          Interview
          <span className="text-cyan-400">
            AI
          </span>
        </h1>

        <div className="flex items-center gap-5">

          <span className="text-gray-300">
            Welcome, {user?.name}
          </span>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-500 px-5 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

      </nav>

      <div className="p-10">

        <h2 className="text-5xl font-bold mb-3">
          AI Interview Dashboard
        </h2>

        <p className="text-gray-300 mb-12">
          Practice interviews and improve your confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* HR */}

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">

            <h3 className="text-3xl font-bold mb-4">
              HR Interview
            </h3>

            <p className="text-gray-300 mb-8">
              Behavioral and communication
              interview practice.
            </p>

            <button
              onClick={() =>
                navigate("/hr-interview")
              }
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl"
            >
              Start Interview
            </button>

          </div>

          {/* Technical */}

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">

            <h3 className="text-3xl font-bold mb-4">
              Technical Interview
            </h3>

            <p className="text-gray-300 mb-8">
              Technical concepts and coding
              preparation.
            </p>

            <Link to="/technical-setup">

              <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl">
                Start Interview
              </button>

            </Link>

          </div>
          {/* Dashboard */}

<div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 hover:scale-105 transition">

  <h3 className="text-3xl font-bold mb-4">
    Interview Dashboard
  </h3>

  <p className="text-gray-300 mb-8">
    View your interview history, scores,
    performance analytics and progress.
  </p>

  <button
    onClick={() => navigate("/dashboard")}
    className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl"
  >
    View Dashboard
  </button>

</div>

        </div>

      </div>
    </div>
  );
};

export default Home;
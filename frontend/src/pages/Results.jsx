import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    answers = [],
    interviewType = "HR",
    technicalScore = 0,
    communicationScore = 0,
    confidenceScore = 0,
    feedback = "",
  } = location.state || {};

  // Save result to MongoDB
  useEffect(() => {

    const saveResult = async () => {

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      if (!currentUser) return;

      try {

        await fetch(
          "http://127.0.0.1:8000/save-result",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: currentUser.email,
              interviewType,
              technicalScore,
              communicationScore,
              confidenceScore,
              feedback,
              answers,
            }),
          }
        );

        console.log("Interview saved");

      } catch (error) {

        console.error("Save Error:", error);

      }

    };

    saveResult();

  }, []);

  const overallScore = Math.round(
    (
      technicalScore +
      communicationScore +
      confidenceScore
    ) / 3
  );

  const hiringProbability =
    overallScore >= 85
      ? "High"
      : overallScore >= 70
      ? "Moderate"
      : "Low";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">

      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">

          <h1 className="text-5xl font-bold text-white text-center">
            Interview Analysis Report
          </h1>

          <p className="text-center text-gray-300 mt-3">
            AI Generated Performance Assessment
          </p>

        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-gray-300 mb-3">
              Overall Score
            </h3>
            <h1 className="text-5xl font-bold text-cyan-400">
              {overallScore}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-gray-300 mb-3">
              Technical
            </h3>
            <h1 className="text-5xl font-bold text-green-400">
              {technicalScore}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-gray-300 mb-3">
              Communication
            </h3>
            <h1 className="text-5xl font-bold text-yellow-400">
              {communicationScore}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-gray-300 mb-3">
              Confidence
            </h3>
            <h1 className="text-5xl font-bold text-purple-400">
              {confidenceScore}
            </h1>
          </div>

        </div>

        {/* Hiring Prediction */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-white mb-4">
            Hiring Prediction
          </h2>

          <h1 className="text-4xl font-bold text-cyan-400">
            {hiringProbability}
          </h1>

        </div>

        {/* Feedback */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-white mb-6">
            AI Feedback
          </h2>

          <textarea
            readOnly
            value={feedback}
            rows="10"
            className="w-full bg-slate-900/50 border border-white/20 text-white rounded-2xl p-5"
          />

        </div>

        {/* Responses */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-white mb-6">
            Interview Responses
          </h2>

          {answers.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-5"
            >

              <h3 className="text-cyan-400 font-bold text-lg mb-3">
                Question {index + 1}
              </h3>

              <p className="text-white mb-4">
                {item.question}
              </p>

              <h4 className="text-yellow-400 mb-2">
                Your Answer
              </h4>

              <p className="text-gray-300">
                {item.answer}
              </p>

            </div>

          ))}

        </div>

        {/* Buttons */}
        <div className="flex gap-5 justify-center">

          <button
            onClick={() => navigate("/home")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Back To Home
          </button>

          <button
            onClick={() => navigate("/hr-interview")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Retake Interview
          </button>

        </div>

      </div>

    </div>
  );
};

export default Results;
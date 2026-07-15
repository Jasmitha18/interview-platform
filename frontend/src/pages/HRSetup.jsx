import React from "react";
import { useNavigate } from "react-router-dom";

const HRSetup = () => {

  const navigate = useNavigate();

  const startInterview = () => {
    navigate("/hr-interview");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-8">

      <div className="max-w-3xl w-full">

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

          {/* Heading */}
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            HR Interview Setup
          </h1>

          <p className="text-gray-300 text-center text-lg mb-10">
            Practice behavioral, communication, and HR round questions with AI-powered feedback.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <h3 className="text-cyan-400 text-xl font-bold mb-2">
                🎤 Voice Based
              </h3>

              <p className="text-gray-300 text-sm">
                Answer questions naturally using your voice.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <h3 className="text-cyan-400 text-xl font-bold mb-2">
                🤖 AI Analysis
              </h3>

              <p className="text-gray-300 text-sm">
                Get communication and confidence feedback.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
              <h3 className="text-cyan-400 text-xl font-bold mb-2">
                📊 Performance Report
              </h3>

              <p className="text-gray-300 text-sm">
                Receive scores and improvement suggestions.
              </p>
            </div>

          </div>

          {/* Interview Info */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 mb-10">

            <h2 className="text-white text-2xl font-bold mb-4">
              Interview Overview
            </h2>

            <ul className="space-y-3 text-gray-300">

              <li>✅ 8 HR Interview Questions</li>

              <li>✅ Voice Recording & Transcription</li>

              <li>✅ Communication Evaluation</li>

              <li>✅ Confidence Assessment</li>

              <li>✅ Detailed AI Feedback Report</li>

            </ul>

          </div>

          {/* Start Button */}
          <button
            onClick={startInterview}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl text-xl font-bold transition duration-300"
          >
            Start HR Interview
          </button>

        </div>

      </div>

    </div>

  );

};

export default HRSetup;
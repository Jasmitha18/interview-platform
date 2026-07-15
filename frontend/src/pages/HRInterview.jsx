
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const hrQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths?",
  "What are your weaknesses?",
  "Describe a challenge you faced and how you solved it.",
  "How do you handle pressure?",
  "Where do you see yourself in five years?",
  "Why do you want to join our company?"
];

const HRInterview = () => {

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioURL(audioUrl);

        const formData = new FormData();

        formData.append("file", audioBlob, "audio.wav");

        try {

          const response = await fetch(
            "http://127.0.0.1:8000/transcribe",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();

          setTranscript(data.transcript);

        } catch (error) {

          console.error(error);

          alert("Backend Connection Failed");

        }

      };

      mediaRecorder.start();

      setRecording(true);

    } catch (error) {

      alert("Microphone permission denied");

    }

  };

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setRecording(false);

  };

  const nextQuestion = async () => {

    if (!transcript) {

      alert("Please answer the question first");

      return;

    }

    const updatedAnswers = [
      ...allAnswers,
      {
        question: hrQuestions[currentQuestion],
        answer: transcript,
      },
    ];

    setAllAnswers(updatedAnswers);

    if (currentQuestion < hrQuestions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);

      setTranscript("");
      setAudioURL("");

    } else {

      const technicalScore = 85;
      const communicationScore = 88;
      const confidenceScore = 84;

      const feedback =
        "Strengths:\n- Good communication skills\n- Clear answer structure\n- Positive attitude\n\nAreas To Improve:\n- Add more real examples\n- Mention achievements\n- Improve confidence while speaking\n\nOverall:\nGood HR interview performance.";

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      try {

        await fetch(
          "http://127.0.0.1:8000/save-result",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: currentUser?.email,
              interviewType: "HR",
              technicalScore,
              communicationScore,
              confidenceScore,
              feedback,
              answers: updatedAnswers,
            }),
          }
        );

      } catch (error) {

        console.error(error);

      }

      navigate("/results", {
        state: {
          answers: updatedAnswers,
          interviewType: "HR",
          technicalScore,
          communicationScore,
          confidenceScore,
          feedback,
        },
      });

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <h1 className="text-5xl font-bold text-white">
            AI HR Interview
          </h1>

          <p className="text-gray-300 mt-3">
            Behavioral & Communication Assessment
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-cyan-400">
              Interview Question
            </h2>

            <span className="text-white">
              Question {currentQuestion + 1}/{hrQuestions.length}
            </span>

          </div>

          <p className="text-white text-xl">
            {hrQuestions[currentQuestion]}
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <h2 className="text-2xl font-bold text-white mb-6">
            Voice Recording
          </h2>

          <div className="flex gap-4">

            {!recording ? (

              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                🎤 Start Recording
              </button>

            ) : (

              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                ⏹ Stop Recording
              </button>

            )}

          </div>

        </div>

        {audioURL && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

            <audio controls className="w-full">
              <source src={audioURL} />
            </audio>

          </div>

        )}

        {transcript && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-white mb-4">
              AI Transcript
            </h2>

            <textarea
              value={transcript}
              readOnly
              rows="8"
              className="w-full bg-slate-900/50 border border-white/20 rounded-xl p-4 text-white"
            />

            <button
              onClick={nextQuestion}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold"
            >
              {currentQuestion === hrQuestions.length - 1
                ? "Finish Interview"
                : "Next Question"}
            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default HRInterview;


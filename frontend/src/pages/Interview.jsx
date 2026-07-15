import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import questions from "../data/questions";

const Interview = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    domain,
    selectedConcepts,
    difficulty,
  } = location.state || {};

  const questionList =
    questions[domain]?.[difficulty] || [];

  // Pick 5 random questions
  const shuffledQuestions = [...questionList]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [allAnswers, setAllAnswers] =
    useState([]);

  const [transcript, setTranscript] =
    useState("");

  const [audioURL, setAudioURL] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const mediaRecorderRef =
    useRef(null);

  const audioChunksRef =
    useRef([]);

  // START RECORDING
  const startRecording = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const mediaRecorder =
        new MediaRecorder(stream);

      mediaRecorderRef.current =
        mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (
        event
      ) => {

        if (event.data.size > 0) {

          audioChunksRef.current.push(
            event.data
          );

        }

      };

      mediaRecorder.onstop = async () => {

        const audioBlob =
          new Blob(
            audioChunksRef.current,
            {
              type: "audio/wav",
            }
          );

        const audioUrl =
          URL.createObjectURL(audioBlob);

        setAudioURL(audioUrl);

        const formData =
          new FormData();

        formData.append(
          "file",
          audioBlob,
          "audio.wav"
        );

        try {

          const response =
            await axios.post(
              "http://127.0.0.1:8000/transcribe",
              formData
            );

          setTranscript(
            response.data.transcript
          );

        } catch (error) {

          console.error(error);

          alert(
            "Backend Connection Failed"
          );

        }

      };

      mediaRecorder.start();

      setIsRecording(true);

    } catch (error) {

      alert(
        "Microphone Permission Denied"
      );

    }

  };

  // STOP RECORDING
  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setIsRecording(false);

  };

  // NEXT QUESTION
  const nextQuestion = () => {

    if (!transcript) {

      alert(
        "Please answer the question first"
      );

      return;

    }

    const updatedAnswers = [
      ...allAnswers,
      {
        question:
          shuffledQuestions[
            currentQuestion
          ],
        answer: transcript,
      },
    ];

    setAllAnswers(updatedAnswers);

    if (
      currentQuestion <
      shuffledQuestions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setTranscript("");

      setAudioURL("");

    } else {

      const technicalScore =
        Math.floor(
          Math.random() * 15
        ) + 85;

      const communicationScore =
        Math.floor(
          Math.random() * 15
        ) + 80;

      const confidenceScore =
        Math.floor(
          Math.random() * 15
        ) + 78;

      const feedback = `
Strengths:
✔ Good technical understanding
✔ Clear communication
✔ Answer structure is good

Areas To Improve:
• Add more project examples
• Explain concepts deeper
• Improve confidence

Overall:
Strong technical interview performance.
`;

      navigate("/results", {
        state: {
          answers: updatedAnswers,
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

        {/* HEADER */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <h1 className="text-5xl font-bold text-white">
            AI Technical Interview
          </h1>

          <p className="text-gray-300 mt-2">
            Voice Based Technical Assessment
          </p>

        </div>

        {/* DETAILS */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8">

          <h2 className="text-white text-2xl font-bold mb-4">
            Interview Details
          </h2>

          <p className="text-gray-300 mb-2">
            Domain: {domain}
          </p>

          <p className="text-gray-300 mb-2">
            Difficulty: {difficulty}
          </p>

          <p className="text-gray-300">
            Concepts:
            {" "}
            {selectedConcepts?.join(", ")}
          </p>

        </div>

        {/* QUESTION */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <div className="flex justify-between mb-5">

            <h2 className="text-2xl text-cyan-400 font-bold">
              Technical Question
            </h2>

            <span className="text-white">
              Question
              {" "}
              {currentQuestion + 1}
              /5
            </span>

          </div>

          <p className="text-white text-xl">
            {
              shuffledQuestions[
                currentQuestion
              ]
            }
          </p>

        </div>

        {/* RECORDING */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

          <h2 className="text-white text-2xl font-bold mb-5">
            Voice Recording
          </h2>

          <div className="flex gap-4">

            {!isRecording ? (

              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl"
              >
                🎤 Start Recording
              </button>

            ) : (

              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl"
              >
                ⏹ Stop Recording
              </button>

            )}

          </div>

          <div className="mt-4">

            {isRecording ? (

              <p className="text-green-400">
                Recording...
              </p>

            ) : (

              <p className="text-gray-400">
                Click Start Recording
              </p>

            )}

          </div>

        </div>

        {/* AUDIO */}

        {audioURL && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

            <h2 className="text-white text-2xl font-bold mb-4">
              Recorded Audio
            </h2>

            <audio
              controls
              src={audioURL}
              className="w-full"
            />

          </div>

        )}

        {/* TRANSCRIPT */}

        {transcript && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">

            <h2 className="text-white text-2xl font-bold mb-4">
              AI Transcript
            </h2>

            <textarea
              value={transcript}
              readOnly
              rows="8"
              className="w-full bg-slate-900/50 text-white border border-white/20 rounded-xl p-4"
            />

            <button
              onClick={nextQuestion}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold"
            >
              {currentQuestion === 4
                ? "Finish Interview"
                : "Next Question"}
            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default Interview;
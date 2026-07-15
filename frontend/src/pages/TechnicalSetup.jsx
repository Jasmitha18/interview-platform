import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TechnicalSetup = () => {

  const navigate = useNavigate();

  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedConcepts, setSelectedConcepts] = useState([]);

  const concepts = {

    "Data Science": [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
      "Pandas",
      "NumPy",
    ],

    "Web Development": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
    ],

    "Java Developer": [
      "Java",
      "OOPs",
      "Collections",
      "Multithreading",
      "Spring Boot",
    ],

  };

  const handleConceptChange = (concept) => {

    if (selectedConcepts.includes(concept)) {

      setSelectedConcepts(
        selectedConcepts.filter(
          (item) => item !== concept
        )
      );

    } else {

      setSelectedConcepts([
        ...selectedConcepts,
        concept,
      ]);

    }

  };

  const handleStartInterview = () => {

    if (!domain || !difficulty) {

      alert(
        "Please select domain and difficulty"
      );

      return;

    }

    if (selectedConcepts.length === 0) {

      alert(
        "Please select at least one concept"
      );

      return;

    }

    navigate("/interview", {
      state: {
        domain,
        selectedConcepts,
        difficulty,
      },
    });

  };

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">

      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-full max-w-5xl p-10">

        <h1 className="text-4xl font-bold text-center text-white mb-3">
          Technical Interview Setup
        </h1>

        <p className="text-center text-gray-300 mb-10">
          Configure your interview preferences
        </p>

        {/* Domain */}

        <div className="mb-8">

          <label className="text-white text-lg font-semibold">
            Select Domain
          </label>

          <select
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setSelectedConcepts([]);
            }}
            className="w-full mt-3 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3"
          >
            <option value="" className="text-black">
              Choose Domain
            </option>

            <option
              value="Data Science"
              className="text-black"
            >
              Data Science
            </option>

            <option
              value="Web Development"
              className="text-black"
            >
              Web Development
            </option>

            <option
              value="Java Developer"
              className="text-black"
            >
              Java Developer
            </option>

          </select>

        </div>

        {/* Concepts */}

        {domain && (

          <div className="mb-8">

            <label className="text-white text-lg font-semibold block mb-4">
              Select Concepts
            </label>

            <div className="grid md:grid-cols-3 gap-4">

              {concepts[domain].map(
                (concept, index) => (

                  <div
                    key={index}
                    className={`cursor-pointer rounded-2xl p-5 border transition ${
                      selectedConcepts.includes(
                        concept
                      )
                        ? "bg-cyan-500/20 border-cyan-400"
                        : "bg-white/5 border-white/10"
                    }`}
                  >

                    <label className="flex items-center text-white cursor-pointer">

                      <input
                        type="checkbox"
                        checked={selectedConcepts.includes(
                          concept
                        )}
                        onChange={() =>
                          handleConceptChange(
                            concept
                          )
                        }
                        className="mr-3"
                      />

                      {concept}

                    </label>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* Difficulty */}

        <div className="mb-10">

          <label className="text-white text-lg font-semibold">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            className="w-full mt-3 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3"
          >

            <option value="" className="text-black">
              Select Difficulty
            </option>

            <option value="Easy" className="text-black">
              Easy
            </option>

            <option
              value="Medium"
              className="text-black"
            >
              Medium
            </option>

            <option value="Hard" className="text-black">
              Hard
            </option>

          </select>

        </div>

        <button
          onClick={handleStartInterview}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl text-lg font-semibold transition"
        >
          Start Technical Interview
        </button>

      </div>

    </div>

  );
};

export default TechnicalSetup;
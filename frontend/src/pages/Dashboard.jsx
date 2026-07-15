
import React, { useEffect, useState } from "react";

const Dashboard = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    const fetchResults = async () => {

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      if (!currentUser) return;

      try {

        const response = await fetch(
          `http://127.0.0.1:8000/get-results/${currentUser.email}`
        );

        const data = await response.json();

        setResults(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchResults();

  }, []);

  const overallScores = results.map(
    (item) =>
      Math.round(
        (
          item.technicalScore +
          item.communicationScore +
          item.confidenceScore
        ) / 3
      )
  );

  const averageScore =
    overallScores.length > 0
      ? Math.round(
          overallScores.reduce((a, b) => a + b, 0) /
            overallScores.length
        )
      : 0;

  const bestScore =
    overallScores.length > 0
      ? Math.max(...overallScores)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-10">
          Interview Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
            <h3 className="text-gray-300">
              Total Interviews
            </h3>

            <h1 className="text-5xl text-cyan-400 font-bold mt-2">
              {results.length}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
            <h3 className="text-gray-300">
              Average Score
            </h3>

            <h1 className="text-5xl text-green-400 font-bold mt-2">
              {averageScore}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
            <h3 className="text-gray-300">
              Best Score
            </h3>

            <h1 className="text-5xl text-yellow-400 font-bold mt-2">
              {bestScore}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
            <h3 className="text-gray-300">
              HR Interviews
            </h3>

            <h1 className="text-5xl text-purple-400 font-bold mt-2">
              {
                results.filter(
                  (item) =>
                    item.interviewType === "HR"
                ).length
              }
            </h1>
          </div>

        </div>

        {/* History */}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8">

          <h2 className="text-3xl text-white font-bold mb-6">
            Interview History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-white">

              <thead>

                <tr className="border-b border-white/20">

                  <th className="text-left py-4">
                    Type
                  </th>

                  <th className="text-left py-4">
                    Technical
                  </th>

                  <th className="text-left py-4">
                    Communication
                  </th>

                  <th className="text-left py-4">
                    Confidence
                  </th>

                  <th className="text-left py-4">
                    Overall
                  </th>

                </tr>

              </thead>

              <tbody>

  {results.map((item, index) => (

    <tr
      key={index}
      className="border-b border-white/10"
    >

      <td className="py-4">
        {item.interviewType}
      </td>

      <td className="py-4">
        {item.technicalScore}
      </td>

      <td className="py-4">
        {item.communicationScore}
      </td>

      <td className="py-4">
        {item.confidenceScore}
      </td>

      <td className="py-4 text-cyan-400 font-bold">
        {
          Math.round(
            (
              item.technicalScore +
              item.communicationScore +
              item.confidenceScore
            ) / 3
          )
        }
      </td>

    </tr>

  ))}

</tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
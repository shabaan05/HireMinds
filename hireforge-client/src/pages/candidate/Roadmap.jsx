import { useEffect, useState } from "react";


import { getRoadmap } from "../../services/roadmapService";
const Roadmap = () => {

  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const fetchRoadmap = async () => {

      try {

        const data = await getRoadmap(user.id);
console.log("data is", data)
        // setRoadmap(data.roadmap);
        setRoadmap(data.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchRoadmap();

  }, []);

  //........
  
 return (
  <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-10">

    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        AI Learning Roadmap
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 min-h-[400px]">

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-blue-400 animate-pulse">
              🤖 Generating your personalized roadmap...
            </p>
          </div>
        ) : roadmap ? (
          <div className="whitespace-pre-wrap text-gray-200 leading-8">
            {roadmap}
          </div>
        ) : (
          <div className="text-center flex flex-col justify-center items-center h-full">

            <div className="text-6xl mb-6">
              🚀
            </div>

            <h2 className="text-2xl font-semibold mb-3 text-white">
              Your Personalized Learning Roadmap
            </h2>

            <p className="text-gray-400 mb-8">
              Complete interviews to unlock AI-powered learning recommendations.
            </p>

            <div className="text-left bg-gray-950 border border-gray-800 rounded-xl p-6 w-full max-w-lg">

              <h3 className="font-semibold text-blue-400 mb-4">
                Example Roadmap
              </h3>

              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Focus on weak topics first</li>
                <li>Practice MCQs daily</li>
                <li>Solve DSA problems regularly</li>
                <li>Revise JavaScript & React fundamentals</li>
                <li>Build one MERN mini project every week</li>
              </ol>

            </div>

          </div>
        )}

      </div>

    </div>

  </div>
);
};

export default Roadmap;
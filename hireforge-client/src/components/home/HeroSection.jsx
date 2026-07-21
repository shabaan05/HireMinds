import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-28 text-center">

      <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
        AI Powered Interview Platform
      </div>

      <h1 className="text-5xl md:text-6xl font-bold leading-tight">

        Crack Technical Interviews

        <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
          with HireForge 🚀
        </span>

      </h1>

      <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Practice MCQ and coding interviews, improve problem-solving skills,
        and track your interview performance in real time.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          to="/register"
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
                     hover:scale-105 transition font-medium"
        >
          Get Started
        </Link>

        <Link
          to="/user/interviews"
          className="px-7 py-3 rounded-xl border border-gray-700
                     hover:border-blue-400 hover:text-blue-400 transition"
        >
          Browse Interviews
        </Link>

      </div>

    </section>
  );
};

export default HeroSection;
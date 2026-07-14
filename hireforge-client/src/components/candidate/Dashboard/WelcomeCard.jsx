function WelcomeCard({ name }) {
  return (
  <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-hidden">

    {/* GLOW BACKGROUND */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl opacity-50"></div>

    {/* CONTENT */}
    <div className="relative z-10">

      <h2 className="text-2xl font-bold text-gray-100">
        Welcome,{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {name}
        </span>{" "}
        👋
      </h2>

      <p className="text-gray-400 mt-2">
        Ready to test your skills today?
      </p>

    </div>

  </div>
);
}

export default WelcomeCard;
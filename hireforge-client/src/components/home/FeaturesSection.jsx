const features = [
  {
    title: "🧠 MCQ Interviews",
    desc: "Practice technical MCQs with instant evaluation.",
  },

  {
    title: "💻 Coding Challenges",
    desc: "Solve coding problems with real test cases.",
  },

  {
    title: "📊 Performance Analytics",
    desc: "Track scores, accuracy, and interview history.",
  },

  {
    title: "🎯 Smart Practice",
    desc: "Improve weak areas efficiently.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      <h2 className="text-3xl font-bold text-center mb-14">
        Platform Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6
                       hover:border-blue-500 transition hover:-translate-y-1"
          >

            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FeaturesSection;
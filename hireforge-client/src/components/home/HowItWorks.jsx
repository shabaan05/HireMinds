const steps = [
  {
    step: "1️⃣",
    title: "Register",
    desc: "Create your account and explore interviews.",
  },

  {
    step: "2️⃣",
    title: "Take Interviews",
    desc: "Attempt MCQ and coding challenges.",
  },

  {
    step: "3️⃣",
    title: "Track Progress",
    desc: "Analyze performance and improve skills.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">

      <h2 className="text-3xl font-bold text-center mb-14">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {steps.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center"
          >

            <div className="text-4xl mb-5">
              {item.step}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;
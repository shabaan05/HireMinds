import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="text-center py-24 px-6">

      <h2 className="text-4xl font-bold mb-4">
        Ready to Start Your Interview Journey?
      </h2>

      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Join HireForge and improve your technical interview skills today.
      </p>

      <Link
        to="/register"
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
                   hover:scale-105 transition font-medium inline-block"
      >
        Create Account
      </Link>

    </section>
  );
};

export default CTASection;
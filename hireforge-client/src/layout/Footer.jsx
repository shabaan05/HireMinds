function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <div className="text-sm">
          © {new Date().getFullYear()} HireForge. All rights reserved.
        </div>

        {/* CENTER */}
        <div className="flex gap-4 text-sm">
          <a href="/user/dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="/user/interviews" className="hover:text-white">
            Interviews
          </a>
          <a href="/user/history" className="hover:text-white">
            History
          </a>
        </div>

        {/* RIGHT */}
        <div className="text-sm">
          Built with ♥ for AI Interview Platform
        </div>

      </div>

    </footer>
  );
}

export default Footer;

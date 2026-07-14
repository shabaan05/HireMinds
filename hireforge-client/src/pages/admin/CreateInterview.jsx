import InterviewForm from "../../components/admin/CreateInterview/InterviewForm";

function CreateInterview() {

 return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Create Interview
      </h2>
      <p className="text-gray-500 mt-1">
        Set up a new interview with questions and configuration
      </p>
    </div>

    {/* FORM CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <InterviewForm />
    </div>

  </div>
);

}

export default CreateInterview;

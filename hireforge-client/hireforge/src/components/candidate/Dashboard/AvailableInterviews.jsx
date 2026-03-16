function AvailableInterviews({ interviews }) {

  return (
    <div>

      <h3>Available Interviews</h3>

      {interviews.map((interview) => (
        <InterviewCard key={interview._id} interview={interview} />
      ))}

    </div>
  );
}


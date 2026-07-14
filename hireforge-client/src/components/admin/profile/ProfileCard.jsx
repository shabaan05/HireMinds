function ProfileCard({ admin }) {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold text-gray-800">
        Profile Details
      </h3>

      <div className="space-y-2 text-sm">

        <p>
          <span className="font-medium text-gray-700">Name:</span>{" "}
          {admin?.name}
        </p>

        <p>
          <span className="font-medium text-gray-700">Email:</span>{" "}
          {admin?.email}
        </p>

        <p>
          <span className="font-medium text-gray-700">Role:</span>{" "}
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
            Admin
          </span>
        </p>

      </div>

    </div>
  );
}

export default ProfileCard;
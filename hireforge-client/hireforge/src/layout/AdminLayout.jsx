const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

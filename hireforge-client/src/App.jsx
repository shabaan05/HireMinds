import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useLocation } from "react-router-dom";
import { Toaster } from './components/ui/toaster'
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/candidate/attempts");

  return (
    <>
      <Toaster />


      <AppRoutes />

    </>
  );
}

export default App;
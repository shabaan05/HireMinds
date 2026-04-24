import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from './components/ui/toaster'
function App() {
  return (
    <BrowserRouter>
          <Toaster />

      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

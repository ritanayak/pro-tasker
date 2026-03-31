import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      
      {/* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected Routes */}
      <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/projects/:id' element={<ProtectedRoute><Project /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;

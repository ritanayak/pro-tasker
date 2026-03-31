import { BrowseRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import './App.css'

function App() {

  return (
    <BrowseRouter>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/projects/:id' element={<Project />} />
    </Routes>
    </BrowseRouter>
  )
}

export default App;

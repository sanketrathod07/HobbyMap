import './App.css'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import Login from './Pages/Login'
import Register from './Pages/Register'
import HomeComponent from './Pages/HomeComponent'
import PrivateRoute from './Components/PrivateRoute'
import Header from './Components/Header'


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <HomeComponent />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
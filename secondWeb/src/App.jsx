import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import './index.css'
import Login from './pages/Login';
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  const user = localStorage.getItem("user-info")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

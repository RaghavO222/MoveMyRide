import { BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.js'

import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage.js';
import Navbar from './components/navbar';
import ReqPage from './pages/ReqPage.js';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route 
            path="/"
            element={user ? (user.type === 'admin' ? <AdminPage /> : <Home />) : <Navigate to ="/auth"/>}
          />
          <Route 
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to ="/"/>}
          />
          <Route 
            path="/admin"
            element = {user ? (user.type === 'admin' ? <AdminPage /> : <Home />) : <Navigate to ="/auth"/>}
          />
          <Route 
            path="/reqpage/:carId"
            element={user ? (user.type === 'admin' ? <ReqPage /> : <Home />) : <Navigate to ="/auth"/>}
          />
        </Routes>           
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

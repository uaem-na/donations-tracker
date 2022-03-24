import './assets/style/Main.css';
import Login from './components/login/login';
import Profile from './components/profile/profile';
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Login/>
    // <Login />
    // <div className='flex justify-center items-center h-screen'>
    //     Hello UAEM!
    //     <img className='mx-8' src={mask}/>
    // </div>
=======
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from './components/landing';
import Userfront from "@userfront/core";

Userfront.init("8nwrppdb");

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function NoAuth({ children }) {
  let location = useLocation();
  if (Userfront.tokens.accessToken) {
    // Redirect to the /dashboard page
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<NoAuth><Login login={true}/></NoAuth>}/>
        <Route path='/register' element={<NoAuth><Login login={false}/></NoAuth>}/>
        <Route path='/dashboard' element={
          <RequireAuth><Profile/></RequireAuth>
        }/>
      </Routes>
    </Router>
>>>>>>> 8b18430dfd8bdfbb5a459ace337aa7507cfcb462
  );
}

export default App;

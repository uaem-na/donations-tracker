import './assets/style/Main.css';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from './components/landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login login={true}/>}/>
        <Route path='/register' element={<Login login={false}/>}/>
        <Route path='/dashboard' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;

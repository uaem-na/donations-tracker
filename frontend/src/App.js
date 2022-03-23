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
import Userfront from "@userfront/core";
import ReqOff from './components/requestOfferPage/reqOff';

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
        <Route path='/request' element={<ReqOff offer={false} edit={false}/>}/>
        <Route path='/offer' element={<ReqOff offer={true} edit={false}/>}/>
        <Route path='/new-request' element={<ReqOff offer={false} edit={true}/>}/>
        <Route path='/new-offer' element={<ReqOff offer={true}/>} edit={true}/>
        <Route path='/login' element={<NoAuth><Login login={true}/></NoAuth>}/>
        <Route path='/register' element={<NoAuth><Login login={false}/></NoAuth>}/>
        <Route path='/profile' element={
          <RequireAuth><Profile/></RequireAuth>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

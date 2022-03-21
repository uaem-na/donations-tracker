import './assets/style/Main.css';
import Login from './components/login/login';
import mask from './assets/media/ppe-mask.svg'
import Profile from './components/profile/profile';

function App() {
  return (
    <Login/>
    // <Login />
    // <div className='flex justify-center items-center h-screen'>
    //     Hello UAEM!
    //     <img className='mx-8' src={mask}/>
    // </div>
  );
}

export default App;

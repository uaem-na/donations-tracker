import './assets/style/Main.css';
import Login from './components/login/login';
import mask from './assets/media/ppe-mask.svg'

function App() {
  return (
    <div className='flex justify-center items-center h-screen'>
      {/* <Login/> */}
        Hello UAEM!
        <img className='mx-8' src={mask}/>
    </div>
  );
}

export default App;

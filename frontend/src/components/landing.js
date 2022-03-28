import { Link } from 'react-router-dom';
import mask from '../assets/media/ppe-mask.svg'

export const Landing = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      Hello UAEM!
      <img className="mx-8" src={mask} />
      <Link to='/login' className='py-2 px-4 rounded-full bg-purple-700 hover:bg-purple-500 text-md text-white m-2'>
          Log me in!
      </Link>
    </div>
  );
};

export default Landing;

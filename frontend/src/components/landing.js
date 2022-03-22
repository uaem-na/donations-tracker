import mask from '../assets/media/ppe-mask.svg'

export const Landing = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      Hello UAEM!
      <img className="mx-8" src={mask} />
    </div>
  );
};

export default Landing;

import { useNavigate } from 'react-router-dom';

export default function HomeBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  };

  return (
    <div className="mt-2 md:mt-16 gradient-bg">
      <div className="mx-auto md:px-4 py-2 sm:py-24 lg:max-w-7xl lg:px-6">
        <div className="flex flex-col md:flex-row md:justify-between">
          <img
            src="https://images.playground.com/98ace3ed87644690a00b97f5611928cc.jpeg"
            alt=""
            className="rounded-sm md:rounded-lg w-full md:w-[49.5%] h-32 md:h-full object-cover transition duration-300 ease-in-out hover:sepia hover:filter cursor-pointer"
            onClick={handleClick}
          />
          <div className="hidden md:block md:w-4"></div>
          <img
            src="https://images.playground.com/36b96d95a7774627a48e726607017df0.jpeg"
            alt=""
            className="hidden md:block rounded-lg w-full md:w-[49.5%] h-32 md:h-full object-cover transition duration-300 ease-in-out hover:sepia hover:filter cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
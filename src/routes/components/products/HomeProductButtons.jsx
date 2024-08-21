import { useNavigate } from 'react-router-dom';

export default function HomeProductButtons() {

  const navigate = useNavigate();

  const goToFilteredProducts = (filterName, filterValue) => {
      navigate('/products', { state: { filter: { [filterName]: filterValue } } });
  };


  return (
    <div className="bg-gray-700 my-2">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-6">
        <div className="grid
                        grid-cols-1
                        gap-y-2
                        gap-x-2

                        sm:grid-cols-1
                        sm:gap-x-2
                        sm:gap-y-2

                        md:grid-cols-2
                        md:gap-x-6
                        md:gap-y-6

                        lg:grid-cols-4
                        lg:gap-y-2
                        lg:gap-x-4
                   ">

          <button className="px-12 py-8 rounded-sm bg-zinc-800 transform hover:scale-105 transition-transform group"
          onClick={() => goToFilteredProducts('subcategory', 'Motherboards')}
          >
            <span className="inline-block text-xl font-bold tracking-[0.15em] group-hover:scale-125 transition-transform gradient-text">
              Motherboards
            </span>
          </button>

          <button className="px-12 py-8 rounded-sm bg-zinc-800 transform hover:scale-105 transition-transform group"
          onClick={() => goToFilteredProducts('subcategory', 'Graphics Cards')}
          >
            <span className="inline-block text-xl font-bold tracking-[0.15em] group-hover:scale-125 transition-transform gradient-text">
              Graphic Cards
            </span>
          </button>

          <button className="px-12 py-8 rounded-sm bg-zinc-800 transform hover:scale-105 transition-transform group"
          onClick={() => goToFilteredProducts('subcategory', 'Keyboards')}
          >
            <span className="inline-block text-xl font-bold tracking-[0.15em] group-hover:scale-125 transition-transform gradient-text">
              Keyboards
            </span>
          </button>

          <button className="px-12 py-8 rounded-sm bg-zinc-800 transform hover:scale-105 transition-transform group"
          onClick={() => goToFilteredProducts('subcategory', 'Mouses')}
          >
            <span className="inline-block text-xl font-bold tracking-[0.15em] group-hover:scale-125 transition-transform gradient-text">
              Mouses
            </span>
          </button>
          
        </div>
      </div>
    </div>
  );
};

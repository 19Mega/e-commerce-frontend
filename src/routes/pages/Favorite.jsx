import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import { XMarkIcon, HeartIcon } from '@heroicons/react/24/solid';


export default function Favorite() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const { usuario } = useContext(UserContext);
  const { userStore, userAction } = usuario;

  const { product } = useContext(ProductContext);
  const { productStore, productAction } = product;

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };


  const handleDeleteFavorite = async (id) => {
    try {
      const response = await userAction.deleteFavorite(id);
      if (response.success) {
        setFavoriteProducts(prevFavorites => prevFavorites.filter(item => item.id !== id));
        Swal.fire({
          title: 'Deleted',
          text: 'Favorite product removed successfully.',
          icon: 'success',
          timer: 1500, 
          timerProgressBar: true, 
          showConfirmButton: true, 
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire('Error', 'Failed to delete favorite product.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', `An error occurred: ${error.message}`, 'error');
    }
  };
  
  const getFavoriteProducts = async () => {
    const favorites = JSON.parse(localStorage.getItem('userFavorites'));

    if (favorites && favorites.length > 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favorites),
        });

        if (response.ok) {
          const data = await response.json();
          setFavoriteProducts(data);
        } else {
          Swal.fire('Error', 'Failed to fetch favorite products.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', `An error occurred: ${error.message}`, 'error');
      }
    } else {
      Swal.fire('No Favorites', 'You have no favorite products.', 'info');
    }
  };

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="md:my-4 my-3 md:py-2 py-3 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Favorites</h1>

      <div className='justify-center items-center md:mx-32'>
        {favoriteProducts.length > 0 ? (
          <ul>
            {favoriteProducts.map(item => (
              <li key={item.id} className='mb-2 ring-2 ring-transparent hover:ring-red-500'>
                <div className='relative cursor-pointer'>

                  <div className='w-full shadow-sm border-2'>
                    <div className='grid grid-cols-3 gap-2 p-2'>

                      <div className='col-span-1 md:max-h-48 w-full overflow-hidden rounded-sm bg-gray-50 lg:aspect-none group-hover:opacity-75 lg:80 image-container'>
                        <img className='h-screen max-h-36 md:max-h-48 w-full object-scale-down' src={item.image_1} alt='Producto' onClick={() => handleProductDetail(item.id)}/>
                      </div>

                      <div className='col-span-2 w-full h-full bg-white-200 relative flex flex-col justify-between rounded-sm'>
                        <div>
                          <div className='flex justify-between'>
                          </div>
                          <span className='pl-2 mr-3 pr-2 md:mr-4 md:pr-2 text-sm md:text-xl block hover:text-indigo-600 cursor-pointer' onClick={() => handleProductDetail(item.id)}>{item.short_description}</span>
                        </div>

                        <div className='mt-2 flex'>
                          <span className='pl-2 pb-1 text-gray-500 text-md md:pr-1 md:text-md md:font-medium block'>U$D</span>
                          <span className='pl-1 pb-1 text-gray-900 text-xl md:text-2xl block'>{item.price.toFixed(2)}</span>
                          <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block'> / </span>
                          <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block line-through'>{(item.price * 1.2).toFixed()}</span>
                          <span className='pl-2 pb-1 text-red-500 text-xs font-semibold md:text-lg block '>{item.discount}% OFF </span>
                        </div>

                        <div className='flex justify-end items-end'>
                          <HeartIcon className='h-7 w-7 cursor-pointer text-red-500 mr-1' aria-hidden='true' />
                          <XMarkIcon className='h-7 w-7 cursor-pointer text-gray-500 hover:text-red-500' aria-hidden='true' onClick={() => handleDeleteFavorite(item.id)} />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center my-24 text-3xl font-thin'>No favorite products found.</p>
        )}
      </div>
    </div>
  );
}

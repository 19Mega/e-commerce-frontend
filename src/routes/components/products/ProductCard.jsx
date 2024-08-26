import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

import { HeartIcon } from '@heroicons/react/24/solid'

import Swal from 'sweetalert2'

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const { usuario } = useContext(UserContext)
  const { userStore, userAction } = usuario

  const [item, setItem] = useState(product)

  const handleLike = (id) => {
    if (localStorage.getItem('userName')) {
      userAction.addFavorite(id)
      setItem(prevItem => ({ ...prevItem, favorite: true }))
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Log in with your account to add favorites!',
      })
    }
  }

  const handleDislike = (id) => {
    if (localStorage.getItem('userName')) {
      userAction.deleteFavorite(id)
      setItem(prevItem => ({ ...prevItem, favorite: false }))
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Log in with your account to add favorites!',
      })
    }
  }

  const handleAddToCart = (id) => {
    addToCart(id)
  }

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const handleBuyProduct = () => {
    handleAddToCart(item.id);
    setTimeout(() => {
        navigate('/shoppingcart');
    }, 250)
};

  return (
    <>
      <li key={item.id} className='mb-2 ring-2 ring-transparent hover:ring-indigo-500' >
        <div className='relative cursor-pointer'>

          {item.favorite ? (
            <div className='absolute top-0 right-0 text-xl pr-1 pt-1 z-10' >
              <HeartIcon className='h-7 w-7 cursor-pointer text-red-500' aria-hidden='true' onClick={() => handleDislike(item.id)} />
            </div>
          ) : (
            <div className='absolute top-0 right-0 text-xl pr-1 pt-1 z-10'>
              <HeartIcon className='h-7 w-7 cursor-pointer text-gray-200' aria-hidden='true' onClick={() => handleLike(item.id)} />
            </div>
          )}


          {/* poner max-h-48 */}
          <div className='w-full shadow-sm border-2'>
            <div className='grid grid-cols-3 gap-2 p-2'>

              <div className='col-span-1  md:max-h-48 w-full overflow-hidden rounded-sm bg-gray-50 lg:aspect-none group-hover:opacity-75 lg:80 image-container'>
                <img className='h-screen max-h-36 md:max-h-48 w-full object-scale-down' src={item.image_1} onClick={() => handleProductDetail(item.id)} alt='Producto' />
              </div>

              <div className='col-span-2 w-full h-full bg-white-200 relative flex flex-col justify-between rounded-sm'>
                <div>
                  <div className='flex justify-between'>
                    {/* <span className='pl-2 pb-1 text-black font-bold text-md md:text-2xl md:font-semibold block'> Titulo producto</span> */}
                    {/* <button className='p-2 text-red-500 hover:underline focus:outline-none'>Like</button> */}
                  </div>
                  <span className='pl-2 mr-3 pr-2 md:mr-4 md:pr-2 text-sm md:text-xl block hover:text-indigo-600 cursor-pointer' onClick={() => handleProductDetail(item.id)} >{item.short_description}</span>
                </div>

                <div className='mt-2 flex'>
                  <span className='pl-2 pb-1 text-gray-500 text-md md:pr-1 md:text-md md:font-medium block'>U$D</span>
                  <span className='pl-1 pb-1 text-gray-900 text-xl md:text-2xl block'>{item.price.toFixed(2)} </span>
                  <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block'> / </span>
                  <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block line-through'>{(item.price * 1.2).toFixed()}</span>
                  <span className='pl-2 pb-1 text-red-500 text-xs font-semibold md:text-lg block '>{item.discount}% OFF </span>
                </div>

                <div className='flex justify-end items-end'>

                  <button
                    className="mx-2 px-3 md:p-1 text-white bg-emerald-500 hover:bg-indigo-700 focus:outline-none rounded-sm"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <span className="flex items-center">
                      <span className=" font-semibold">+</span>
                      <ShoppingCartIcon className="w-6 h-6 font-bold" />
                    </span>
                  </button>

                  <button className='px-3 md:p-1 text-white bg-emerald-500 hover:bg-indigo-700 focus:outline-none rounded-sm font-medium'
                    onClick={() => { handleBuyProduct() }}
                  >Buy it</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </li>





    </>

  )
}


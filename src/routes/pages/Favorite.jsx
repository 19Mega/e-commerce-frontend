import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  const getFavoriteProducts = () => {
    // Simulating an async call to get favorite products
    setFavoriteItems([
      {
        id: 1,
        short_description: 'Mochila Jansport Superbreak Pantano',
        price: 2000,
        quantity: 1,
        imageUrl: 'https://f.fcdn.app/imgs/4b7a7e/www.inboxstore.com.uy/inbouy/092e/webp/catalogo/JS0A4QUE_1234_1/549x549/mochila-jansport-superbreak-plus-deep-verde.jpg',
      },
      {
        id: 2,
        short_description: 'Mochila JanSport Big Student Petroleo',
        price: 3000,
        quantity: 1,
        imageUrl: 'https://f.fcdn.app/imgs/375ba7/www.inboxstore.com.uy/inbouy/c170/webp/catalogo/JS0A4QVA_16494_1/549x549/mochila-jansport-right-deep-verde.jpg',
      },
      {
        id: 3,
        short_description: 'Mochila Jansport Superbreak Roja',
        price: 1900,
        quantity: 1,
        imageUrl: 'https://f.fcdn.app/imgs/423770/www.inboxstore.com.uy/inbouy/f52b/webp/catalogo/JS0A4QUT_6403_1/549x549/mochila-jansport-superbreak-dry-brush-rojo.jpg',
      },
    ]);
  };

  const handleRemoveFavorite = (itemId) => {
    setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return favoriteItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (localStorage.getItem('userName')) {
      if (favoriteItems.length === 0) {
        Swal.fire({
          icon: 'warning',
          text: 'You need to have items in your favorites to proceed.',
        });
      } else {
        navigate('/checkout', { state: { itemsForPurchase: favoriteItems } });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Log in with your account please.',
      });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Favoritos</h1>
        <div className='mb-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500'> </div>
        <div className="mx-auto justify-center md:flex md:space-x-6 xl:px-0">

          <div className="w-full">
            {favoriteItems.map((item) => (
              <div key={item.id} className="justify-between mb-6 rounded-sm bg-white border-2 border-gray-200 shadow-sm sm:flex sm:justify-start">
                <img
                  src={item.imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.short_description}</h2>
                    <p className="mt-2 text-dark">U$D {item.price}</p>
                    <button onClick={() => handleRemoveFavorite(item.id)} className="text-blue-500 mt-2">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}
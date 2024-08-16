import React, { useState } from 'react';

export default function TestJuan() {

  const envioGratis = 2500

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Mochila JanSport Superbreak Pantano',
      price: 2000,
      quantity: 1,
      imageUrl: 'https://f.fcdn.app/imgs/4b7a7e/www.inboxstore.com.uy/inbouy/092e/webp/catalogo/JS0A4QUE_1234_1/549x549/mochila-jansport-superbreak-plus-deep-verde.jpg',
    },
    {
      id: 2,
      name: 'Mochila JanSport Big Student Petroleo',
      price: 3000,
      quantity: 1,
      imageUrl: 'https://f.fcdn.app/imgs/375ba7/www.inboxstore.com.uy/inbouy/c170/webp/catalogo/JS0A4QVA_16494_1/549x549/mochila-jansport-right-deep-verde.jpg',
    },
    {
      id: 3,
      name: 'Mochila JanSport Superbreak Roja',
      price: 1900,
      quantity: 1,
      imageUrl: 'https://f.fcdn.app/imgs/423770/www.inboxstore.com.uy/inbouy/f52b/webp/catalogo/JS0A4QUT_6403_1/549x549/mochila-jansport-superbreak-dry-brush-rojo.jpg',
    },
  ]);


  const handleRemoveFavorite = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 pt-10">
        <h1 className="mb-10 text-center text-4xl font-bold">Favoritos</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={item.imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                    <p className="mt-2 text-dark"> $ {item.price * item.quantity}</p>
                    <div>
                      {item.price > envioGratis ? (
                        <p className='text-green-600'>Envio Gratis</p>
                      ) : null}
                    </div>
                    <button onClick={() => handleRemoveFavorite(item.id)} className="text-blue-500 mt-2">Eliminar</button>
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

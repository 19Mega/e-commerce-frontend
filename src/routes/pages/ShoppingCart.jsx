import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CartCard } from '../components/products/CartCard'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'

import Swal from 'sweetalert2'

export default function ShoppingCart() {

  const { product } = useContext(ProductContext)
  const { productStore, productAction } = product
  const { removeFromCart } = useContext(CartContext)

  const [shoppingCartItems, setShoppingCartItems] = useState([])

  const navigate = useNavigate();

  const getCartProducts = async () => {
    const cartProducts = await productAction.getCartProducts()
    setShoppingCartItems(cartProducts)
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    setShoppingCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      )
    )
  }

  const handleRemoveItem = (itemId) => {
    setShoppingCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    removeFromCart(itemId)
  }

  const calculateSubtotal = () => {
    return shoppingCartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const calculateTotal = () => {
    return calculateSubtotal()
  }

  const handleCheckout = () => {
    if (localStorage.getItem('userName')) {
      if (shoppingCartItems.length == 0) {
        Swal.fire({
          icon: 'warning',
          text: 'You need to have items in your cart to proceed.',
        })
      } else {
        navigate('/checkout', { state: { itemsForPurchase: shoppingCartItems } })
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please log in to your account',
      })
    }
  }

  useEffect(() => {
    getCartProducts()
  }, [])


  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Shopping Cart</h1>
        <div className='mb-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500'> </div>
        <div className="mx-auto justify-center md:flex md:space-x-6 xl:px-0">

          <div className="md:w-2/3">

            {shoppingCartItems.map((item) => (
              <div key={item.id}>
                <CartCard product={item} onRemoveItem={handleRemoveItem} onQuantityChange={handleQuantityChange} />
              </div>
            ))}

          </div>

          <div className="mt-8 mb-5 h-full p-3 shadow-md border-2 border-gray-200 md:mt-0 md:w-1/3 ">

            <div>
              {shoppingCartItems.map((item) => (
                <div key={item.id} className="mb-2 flex justify-between">
                  <p className="font-medium text-sm">
                    {item.short_description.length > 20 ? `${item.short_description.substring(0, 20)}...` : item.short_description}
                    <span> x {item.quantity}</span>
                  </p>
                  <p className="font-medium text-sm">U$D {item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 border-dashed my-3"></div>

            <div className="mb-2 flex justify-between">
              <p className="font-medium text-md">SubTotal:</p>
              <p className="font-medium text-md">U$D {calculateSubtotal()}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-md text-emerald-500 font-medium">Shipment:</p>
              <p className="text-md text-emerald-500 font-medium">U$D 0.00</p>
            </div>
            <div className="border-t-2 border-gray-200 my-3"></div>
            <div className="mb-2 flex justify-between">
              <p className="font-medium text-md">Total:</p>
              <p className="font-medium text-md">U$D {calculateTotal()}</p>
            </div>
            <p className="text-md text-gray-700 mb-4">IVA included</p>

            <button className="mt-2 w-full bg-indigo-600 py-2 text-white font-normal hover:bg-indigo-700" onClick={handleCheckout}>
              Proceed to order
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

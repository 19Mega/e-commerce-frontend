import React, { useState } from "react"
import { useLocation } from 'react-router-dom'

import { DeliveryAddress } from '../components/payments/DeliveryAddress'
import { MercadoPagoPayment } from '../components/payments/MercadoPagoPayment'

import { TruckIcon } from '@heroicons/react/24/outline'
import { CreditCardIcon } from '@heroicons/react/24/outline'

import Swal from 'sweetalert2'

export const CheckoutPage = () => {
  const location = useLocation()
  const itemsForPurchase = location.state.itemsForPurchase

  const [deliveryAddress, setDeliveryAddress] = useState({})
  const handleDeliveryAddress = (address) => {
    setDeliveryAddress(address)
  }

  const [paymentMethod, setPaymentMethod] = useState(null)
  const handlePaymentMethod = (payment) => {
    setPaymentMethod(payment)
  }

  const calculateSubtotal = () => {
    return itemsForPurchase.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const calculateTotal = () => {
    return calculateSubtotal()
  }

  const [mergadoPagoItems, setMergadoPagoItems] = useState([])
  const handleMercadoPago = () => {

    if (localStorage.getItem('userName')) {
      if (deliveryAddress.name_surname) {
        if (paymentMethod) {
          const itemsForMercadoLibre = itemsForPurchase.map(item => ({
            id: item.id,
            title: item.short_description,
            quantity: item.quantity,
            unit_price: item.price
          }));
          setMergadoPagoItems(itemsForMercadoLibre)
        }
        else {
          Swal.fire({
            icon: 'warning',
            text: 'Select a payment method',
          })
        }
      }
      else {
        Swal.fire({
          icon: 'warning',
          text: 'Select a delivery address',
        })
      }
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Please log in to your account',
      })
    }
  }

  return (
    <>

      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Finalizar Compra</h1>
          <div className='mb-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500'> </div>
          <div className="mx-auto justify-center md:flex md:space-x-6 xl:px-0">

            <div className="md:w-2/3">

              <DeliveryAddress onSelectAddress={handleDeliveryAddress} />

              <div className='my-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500'> </div>

              <div className='flex items-center ml-1 mt-5 mb-3'>
                <CreditCardIcon className='h-8 w-8 cursor-pointer text-indigo-500' />
                <h2 className='mx-2 font-medium text-lg text-indigo-500'> Choose a payment method: </h2>
              </div>

              <ul>
                <li className={`p-2 mb-1 border-2 shadow-sm ${paymentMethod === 'MercadoPago' ? 'border-indigo-500' : 'border-gray-200'}`} >
                  <label className="flex items-center justify-between">
                    <input
                      className="custom-checkbox-payment mr-4 md:mr-4"
                      type="checkbox"
                      checked={paymentMethod === 'MercadoPago'}
                      onChange={() => handlePaymentMethod('MercadoPago')}
                    />
                    <div className="flex-grow">
                      <span className="font-normal">

                        <span className="text-gray-400">
                          Mercado Pago
                        </span>
                      </span>
                    </div>
                  </label>
                </li>
              </ul>


            </div>



            <div className="mt-8 mb-5 h-full p-3 shadow-md border-2 border-gray-200 md:mt-0 md:w-1/3 ">

              <div className='bg-gray-100 w-full p-2'>
                {deliveryAddress.name_surname ? (
                  <div className='text-emerald-500'>
                    <TruckIcon className='h-7 w-7 cursor-pointer text-emerald-500' />
                    <span className='font-normal flex items-center'>
                      Enviar a <span className='font-semibold ml-1 mr-2'>{deliveryAddress.name_surname}</span>
                      - {deliveryAddress.phone}
                    </span>
                    <span> {deliveryAddress.street} {deliveryAddress.street_number} </span> <br />
                  </div>
                ) : (
                  <span className='text-gray-300'>Shipping address..</span>
                )}
              </div>

              <div className="border-t-2 border-gray-200 border-dashed my-3"></div>

              <div>
                {itemsForPurchase.map((item) => (
                  <div key={item.id} className="mb-2 flex justify-between">
                    <p className="font-medium text-sm">
                      {item.short_description.length > 20 ? `${item.short_description.substring(0, 20)}...` : item.short_description}
                      <span> x {item.quantity}</span>
                    </p>
                    <p className="font-medium text-sm">U$D {item.price}</p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 my-3"></div>

              <div className="mb-2 flex justify-between">
                <p className="font-medium text-md">SubTotal:</p>
                <p className="font-medium text-md">U$D {calculateSubtotal()}</p>
              </div>
              <div className="mb-2 flex justify-between">
                <p className="text-md text-emerald-500 font-medium">Shipment:</p>
                <p className="text-md text-emerald-500 font-medium">Free</p>
              </div>
              <div className="border-t-2 border-gray-200 my-3"></div>
              <div className="mb-2 flex justify-between">
                <p className="font-medium text-md">Total:</p>
                <p className="font-medium text-md">U$D {calculateTotal()}</p>
              </div>
              <p className="text-md text-gray-700 mb-4">IVA included</p>


              <div className='bg-gray-100 w-full p-2 my-2'>
                {paymentMethod ? (
                  <div className='text-indigo-500 flex'>
                    <CreditCardIcon className='h-6 w-6 mr-2 cursor-pointer text-indigo-500' />
                    <span className='font-normal flex items-center'>
                      {paymentMethod}
                    </span>

                  </div>
                ) : (
                  <span className='text-gray-300'>Select payment method</span>
                )}
              </div>



              <button className="mt-2 w-full bg-yellow-400 py-2 hover:bg-yellow-500 " onClick={handleMercadoPago}>
                Finalize Order
              </button>

              <MercadoPagoPayment items={mergadoPagoItems} />

            </div>


          </div>
        </div>
      </div>


    </>
  )
}

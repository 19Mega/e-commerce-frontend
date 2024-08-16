import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { MapPinIcon } from '@heroicons/react/24/outline'

export const DeliveryAddress = ({ onSelectAddress }) => {
  const { usuario } = useContext(UserContext)
  const { userStore, userAction } = usuario

  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const getUserAddress = async () => {
    const addresses = await userAction.getAddress()
    if (addresses.data) {
      setAddresses(addresses.data)
    }
  }

  const selectAddress = (item) => {
    onSelectAddress(item)
    setSelectedAddress(item)
  }

  useEffect(() => {
    getUserAddress()
  }, [])

  return (
    <>
      <div className='flex items-center ml-1 mb-3'>
        <MapPinIcon className='h-8 w-8 cursor-pointer text-emerald-500 hover:text-indigo-500' />
        <h2 className='mx-2 font-medium text-lg text-emerald-500'> Elige una dirección de envío: </h2>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-1">
        {addresses.map((item) => (
          <li key={item.id} className={`p-2 mb-1 border-2 shadow-sm ${selectedAddress === item ? 'border-emerald-500' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between">
              <input
                className="custom-checkbox-address mr-4 md:mr-4"
                type="checkbox"
                checked={selectedAddress === item}
                onChange={() => selectAddress(item)}
              />
              <div className="flex-grow">
                <span className="font-normal">
                  <span className='font-medium'>Enviar a {item.name_surname}</span> <br />
                  <span className="text-gray-400">
                    Dirección: {item.street} {item.street_number}, {item.department}, {item.city} <br />
                    Teléfono: {item.phone} <br />
                    {item.references && <>Referencias: {item.references} <br /></>}
                  </span>
                </span>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <Link to='/address'>
      <button className="mt-3 w-full bg-emerald-600 py-2 text-white font-normal hover:bg-emerald-700">
        Agregar nueva dirección
      </button>
      </Link>
    </>
  )
}

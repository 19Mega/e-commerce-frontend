import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState, useEffect } from 'react'

export const MercadoPagoPayment = ({ items }) => {
    const [itemsForPurchase, setItemsForPurchase] = useState([])
    const [preferenceId, setPreferenceId] = useState(null)

    useEffect(() => {
        initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC, {
            locale: 'es-UY',
        })

        async function fetchPreferenceId() {
            try {
                const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/create_preference", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ items: itemsForPurchase }),
                })

                const data = await res.json()
                console.log("TESTTTT: ", data)
                setPreferenceId(data.id)

            } catch (error) {
                console.log('Error al crear preferencia:', error)
            }
        }

        if (itemsForPurchase.length > 0) {
            fetchPreferenceId()
        }
    }, [itemsForPurchase])

    useEffect(() => {
        setItemsForPurchase(items)
    }, [items])

    

    return (
        <>
            <div className='w-full'>
                <div className="border-t-2 border-gray-200 border-dashed my-3"></div>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
            </div>
        </>
    )
}

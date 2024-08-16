import React, { createContext, useState, useEffect } from 'react'
export const CartContext = createContext()


export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('userCart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const postProductId = async (id) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/cart/product/${id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      })
      const data = await resp.json()

      if (resp.status === 404 || resp.status === 401) {
        return { success: false }
      }

      if (resp.ok) {
        return { success: true }
      }

    } catch (error) {
      return { success: false }
    }
  }

  const deleteProductId = async (id) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/cart/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      })
      const data = await resp.json()

      if (resp.status === 404 || resp.status === 401) {
        return { success: false }
      }

      if (resp.ok) {
        return { success: true }
      }

    } catch (error) {
      return { success: false }
    }
  }

  // only save in backend when is a new id on cart
  const addToCart = (productId) => {
    const productInCartId = cart.findIndex(item => item.id === productId)

    if (productInCartId >= 0) {
      const newCart = structuredClone(cart)
      newCart[productInCartId].quantity += 1
      setCart(newCart)

    } else {
      setCart(prevCart => [{ id: productId, quantity: 1 }, ...prevCart])
      if (localStorage.getItem('userName')) {
        postProductId(productId)
      }
    }
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId)
    setCart(newCart)

    if (localStorage.getItem('userName')) {
      deleteProductId(productId)
    }
  }

  const getTotalQuantity = () => {
    // return cart.reduce((total, item) => total + item.quantity, 0) // all quantity
    return cart.length // item quantity
  }

  const clearCart = () => {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cart))
  }, [cart])


  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
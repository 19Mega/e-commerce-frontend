import React, { useState, useContext } from "react"
import { ProductContext } from "./ProductContext"
import { UserContext } from "./UserContext"

export const ProductProvider = ({ children }) => {
	const { usuario } = useContext(UserContext)
	const { userStore, userAction } = usuario

	const [product, setProduct] = useState({

		productStore: {
			productList: [],
		},
		productAction: {
			getProduct: async (filter) => {
				try {
					const category = filter.category ? filter.category : ''
					const subcategory = filter.subcategory ? filter.subcategory : ''
					const discount = filter.discount ? filter.discount : ''
					const minPrice = filter.price ? filter.price[0] : ''
					const maxPrice = filter.price ? filter.price[1] : ''

					const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/filter?category=${category}&subcategory=${subcategory}&discount=${discount}&max_price=${maxPrice}&min_price=${minPrice}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						}
					)
					const data = await resp.json()

					if (resp.status === 404 || resp.status === 401) {
						return { success: false }
					}

					if (resp.ok) {
						return data
					}
				} catch (error) { }
			},
			getProductDetail: async (id) => {
				try {
					const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						}
					)
					const data = await resp.json()
					if (resp.status === 404 || resp.status === 401) {
						return data
					}

					if (resp.ok) {
						const updatedProduct = { ...data, favorite: false }
						return updatedProduct
					}
				}
				catch (error) {
					console.log(error)
				}
			},
			getCartProducts: async () => {
				const cartData = JSON.parse(localStorage.getItem('userCart'))
				const cartItems = cartData.map(item => item.id)
				if (cartItems.length > 0) {
					try {
						const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/cart`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(cartItems)
						})
						const data = await resp.json()
						if (resp.ok && data.length > 0) {
							const newData = data.map((item) => ({ ...item, quantity: 1 }))
							return newData
						} else {
							return []
						}

					} catch (error) {
						console.error('Error fetching cart products:', error)
					}
				}
				else {
					return []
				}

			},
			postProduct: async (values) => {
				try {
					const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(values)
					});
					return response
				} catch (error) {
					console.error('Error fetching cart products:', error);
				}
			},
			updateProduct: async (values, id) => {
				try {
					const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(values)
					});
					return response
				} catch (error) {
					console.error('Error fetching cart products:', error);
				}
			},
			deleteProduct: async (id) => {
				try {
					const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
					});
					return response
				} catch (error) {
					console.error('Error fetching cart products:', error);
				}
			}


		}

	})

	return (
		// Pasamos product y setProduct para que estén disponibles en los children
		<ProductContext.Provider value={{ product, setProduct }}>
			{children}
		</ProductContext.Provider>
	)
}

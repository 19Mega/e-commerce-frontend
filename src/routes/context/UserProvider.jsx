import React, { useState, useContext } from "react"
import { UserContext } from "./UserContext"
import { DateTime } from 'luxon';


export const UserProvider = ({ children }) => {

    const [usuario, setUsuario] = useState({
        userStore: {
            admin: { isAdmin: false },
            user: { id: undefined, name: "", email: "", auth: false },
            address: [],
            favorites: [],
            cart: [
                {
                    id: '',
                    quantity: '',
                    user_id: '',
                    product_id: '',
                },
                {
                    id: '',
                    quantity: '',
                    user_id: '',
                    product_id: '',
                },
            ],
            orderDetail: [],
            order: [],
        },
        userAction: {

            login: async (email, password) => {
                const postData = {
                    email: email,
                    password: password,
                }
                try {
                    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })
                    const data = await resp.json()

                    if (resp.ok) {
                        localStorage.setItem("token", data.access_token)
                        localStorage.setItem("userId", data.user_id)
                        localStorage.setItem("userName", data.user_name)
                        localStorage.setItem("userEmail", data.user_email)
                        localStorage.setItem("userFavorites", JSON.stringify(data.user_favorites))
                        localStorage.setItem("userCart", JSON.stringify(data.user_cart))
                        localStorage.setItem('regTime', DateTime.now().toISO())

                        if (data.user_admin) {
                            setUsuario(prevState => ({
                                ...prevState,
                                userStore: {
                                    ...prevState.userStore,
                                    admin: { isAdmin: true },
                                },
                            }));
                        }

                        setUsuario(prevState => ({
                            ...prevState,
                            userStore: {
                                ...prevState.userStore,
                                user: {
                                    id: data.user_id,
                                    name: data.user_name,
                                    email: data.user_email,
                                    auth: true,
                                },
                            },
                        }))
                        return { success: true }
                    }
                    else {
                        console.log("Login failed")
                        return { success: false }
                    }

                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },

            signup: async (name, email, password) => {
                const postData = {
                    name: name,
                    email: email,
                    password: password,
                    is_active: false,
                    is_admin: false,
                }

                try {
                    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })

                    const data = await resp.json()

                    if (resp.status === 404 || resp.status === 401) {
                        return { success: false }
                    }

                    if (resp.ok) {
                        return { success: true }
                    }
                    else {
                        return { success: false }
                    }


                } catch (error) {
                    console.log("Error loading message from backend", error)
                    return { success: false }
                }
            },

            verifyAdminToken: async () => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/verify`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        },
                    })
                    const data = await resp.json()
                    if (resp.ok) {
                        setUsuario(prevState => ({
                            ...prevState,
                            userStore: {
                                ...prevState.userStore,
                                admin: { isAdmin: true },
                            },
                        }));
                        return data
                    }
                    else {
                        return { success: false }
                    }
                } catch (error) {
                    return { success: false }
                }
            },

            logout: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                localStorage.removeItem("userName")
                localStorage.removeItem("userEmail")
                localStorage.removeItem("userFavorites")
                localStorage.removeItem("userCart")
                localStorage.removeItem('regTime')


                setUsuario(prevState => ({
                    ...prevState,
                    userStore: {
                        ...prevState.userStore,
                        admin: { isAdmin: false },
                        user: {
                            id: undefined,
                            name: "",
                            email: "",
                            auth: false,
                        },
                    },
                }));
                setUsuario(prevState => ({
                    ...prevState,
                    userStore: {
                        ...prevState.userStore,
                        address: [],
                        favorites: [],
                        //cart: [],
                        orderDetail: [],
                        order: []
                    },
                }));
            },

            addAddress: async (newAddress) => {
                const postData = {
                    name_surname: newAddress.name_surname,
                    phone: newAddress.phone,
                    department: newAddress.department,
                    city: newAddress.city,
                    street: newAddress.street,
                    street_number: newAddress.street_number,
                    no_number: newAddress.no_number,
                    references: newAddress.references,
                }
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/address`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        },
                        body: JSON.stringify(postData),
                    })
                    const data = await resp.json()

                    if (resp.status === 404 || resp.status === 401) {
                        return { success: false }
                    }

                    if (resp.ok) {
                        const addressToSave = { id: data.address_id, ...postData } // add address id to postData object
                        setUsuario(prevState => ({
                            ...prevState,
                            userStore: {
                                ...prevState.userStore,
                                address: [...prevState.userStore.address, addressToSave],
                            },
                        }))
                        return { success: true }
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                    return { success: false }
                }
            },

            getAddress: async () => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/address`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        },
                    })

                    const data = await resp.json()

                    if (resp.status === 404) {
                        return { success: false }
                    }

                    if (resp.ok) {
                        setUsuario(prevState => ({
                            ...prevState,
                            userStore: {
                                ...prevState.userStore,
                                address: data,
                            },
                        }))
                        return { success: true, data: data }
                    }

                } catch (error) {
                }
            },

            modifyAddress: async (modifiedAddress) => {
                const postData = {
                    id: modifiedAddress.id,
                    name_surname: modifiedAddress.name_surname,
                    phone: modifiedAddress.phone,
                    department: modifiedAddress.department,
                    city: modifiedAddress.city,
                    street: modifiedAddress.street,
                    street_number: modifiedAddress.street_number,
                    no_number: modifiedAddress.no_number,
                    references: modifiedAddress.references,
                }

                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/address/${modifiedAddress.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        },
                        body: JSON.stringify(postData),
                    })

                    const data = await resp.json()

                    // data get updated becouse the get call in userAddress
                    if (resp.status === 404) {
                        return { success: false }
                    }

                    if (resp.ok) {
                        return { success: true }
                    }

                }
                catch (error) {
                    console.log("Error loading message from backend", error)
                    return { success: false }
                }
            },

            deleteAddress: async (id) => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/address/${id}`, {
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
                }
                catch (error) {
                    console.log("Error loading message from backend", error)
                    return { success: false }
                }
            },

            addFavorite: async (id) => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/favorite/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        },
                    })
                    const data = await resp.json()

                    if (resp.status === 404 || resp.status === 401) {
                        return { success: false }
                    }

                    if (resp.ok) {
                        const favorites = JSON.parse(localStorage.getItem('userFavorites'))
                        favorites.push(id)
                        localStorage.setItem('userFavorites', JSON.stringify(favorites))
                        // setUsuario(prevState => ({
                        //     ...prevState,
                        //     userStore: {
                        //         ...prevState.userStore,
                        //         favorites: data.map(item => item.product_id),
                        //     },
                        // }))
                        return { success: true }
                    }
                }
                catch (error) {
                    return { success: false, error: error.message }
                }
            },

            getFavorite: async () => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/favorites`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        },
                    })
                    const data = await resp.json()

                    if (resp.status === 404 || resp.status === 401) {
                        return []  // check if array is empty ??? we need an empty array if its not loged in
                    }

                    if (resp.ok) {
                        // setUsuario(prevState => ({
                        //     ...prevState,
                        //     userStore: {
                        //         ...prevState.userStore,
                        //         favorites: data.map(item => item.product_id),
                        //     },
                        // }))
                        // check if array is empty
                        return data.map(item => item.product_id)
                    }
                }
                catch (error) {
                    return { success: false }
                }
            },

            deleteFavorite: async (id) => {
                try {
                    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${localStorage.getItem("userId")}/favorite/${id}`, {
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
                        const favorites = JSON.parse(localStorage.getItem('userFavorites'))
                        const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id)
                        localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites))
                        // setUsuario(prevState => ({
                        //     ...prevState,
                        //     userStore: {
                        //         ...prevState.userStore,
                        //         favorites: data.map(item => item.product_id),
                        //     },
                        // }))
                        return { success: true }
                    }
                }
                catch (error) {
                    console.log("Error loading message from backend", error)
                    return { success: false }
                }
            },


        }

    })

    return (
        // We pass the user and setUser to be able to use in the children
        <UserContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UserContext.Provider>
    )

}
import Client from "../baseClient";

const http = new Client()

export const getUserById = async (id) => {
    return http.get(`user/${id}`)
}

export const updateUser = async (id, payload) => {
    return http.patch(`user/${id}`, payload)
}

export const addWishList = async (payload) => {
    return http.post("user/wishList", payload)
}

export const removeWishList = async (payload) => {
    return http.post("user/removeWishList", payload)
}

export const getWishList = async () => {
    return http.get("user/wishList")
}
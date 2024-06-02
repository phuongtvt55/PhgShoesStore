import Client from "../baseClient";

const http = new Client()

export const createAddress = async (payload) => {
    return http.post("address", payload)
}

export const getAll = async () => {
    return http.get("address")
}

export const deleteAddress = async (id) => {
    return http.delete(`address/${id}`)
}

export const setDefault = async (id) => {
    return http.get(`address/${id}`)
}
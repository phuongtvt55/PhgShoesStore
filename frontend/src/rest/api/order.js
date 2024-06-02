import Client from "../baseClient"

const http = new Client()

export const createOrder = async (payload) => {
    return http.post("order", payload)
}

export const getOrder = async () => {
    return http.get("order")
}
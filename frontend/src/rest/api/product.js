import Client from '../baseClient'

const http = new Client()

export const getAll = async () => {
    return http.get('product')
}

export const getById = async (id) => {
    return http.get(`product/${id}`)
}

export const getPriceProducts = async (payload) => {
    return http.post('product/getDiscount', payload)
}
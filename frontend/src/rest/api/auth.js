import Client from "../baseClient"

const http = new Client()

export const login = async (payload) => {
    return http.post("auth/login", payload)
}

export const register = async (payload) => {
    return http.post("auth/register", payload)
}

export const refresh = async () => {
    return http.post("auth/refresh")
}

export const logout = async () => {
    return http.get("auth/logout")
}
import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token) => {
    try {
        return jwtDecode(token)
    } catch (e) {
        console.log(e)
    }
}

export const checkExp = (token) => {
    try {
        if (jwtDecode(token).exp < Date.now() / 1000) return false
        return true
    } catch (e) {
        console.log(e)
    }
}
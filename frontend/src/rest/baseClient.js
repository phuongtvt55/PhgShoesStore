import axios from 'axios'
import { LOCAL_URL } from '../constant'

export default class Client {
    constructor(server = LOCAL_URL) {
        this.baseUrl = server
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })

        this.client.interceptors.request.use(async (config) => {
            let access_token = localStorage.getItem("access_token")
            config.headers.token = `Bearer ${access_token}`
            return config
        })
    }

    async get(url, payload, config) {
        let res = {}
        try {
            res = await this.client.get(url, payload || {}, config)
        } catch (e) {
            throw e
        }
        return res
    }

    async post(url, payload, config) {
        let res = {}
        try {
            res = await this.client.post(url, payload || {}, config)
        } catch (e) {
            throw e
        }
        return res
    }

    async put(url, payload) {
        let res = {}
        try {
            res = await this.client.put(url, payload || {})
        } catch (e) {
            throw e
        }
        return res
    }

    async delete(url, payload) {
        let res = {}
        try {
            res = await this.client.delete(url, payload || {})
        } catch (e) {
            throw e
        }
        return res
    }

    async patch(url, payload, config) {
        let res = {}
        try {
            res = await this.client.patch(url, payload || {}, config)
        } catch (e) {
            throw e
        }
        return res
    }
}

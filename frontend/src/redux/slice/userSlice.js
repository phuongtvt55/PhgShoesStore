import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    name: "",
    wishList: [],
    access_token: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { email, name, wishList,access_token } = action.payload
            state.name = name
            state.email = email
            state.wishList = wishList
            state.access_token = access_token
        },
        clearUser: (state, action) => {
            state.name = ""
            state.email = ""
            state.wishList = []
            state.access_token = ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer
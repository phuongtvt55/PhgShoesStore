import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const { orderItem } = action.payload
            const item = state.orderItems.find((item) => item.name === orderItem.name && item.size === orderItem.size)
            if (!item) {
                state.orderItems.push(orderItem)
            } else {
                orderItem.quantity > 0 ? item.quantity++ : item.quantity--
            }

        },
        removeOrder: (state, action) => {
            const { orderItem } = action.payload
            state.orderItems = state.orderItems.filter((item) => !(item.name === orderItem.name && item.size === orderItem.size))
        },
        updateOrderItems: (state, action) => {
            state.orderItems = action.payload
        },
        clearOrder: (state, action) => {
            state.orderItems = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, updateOrderItems, clearOrder } = orderSlice.actions

export default orderSlice.reducer
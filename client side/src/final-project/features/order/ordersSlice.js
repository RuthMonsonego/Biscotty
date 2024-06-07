import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchOrders, deleteOrder, addOrder, updateOrder } from './ordersApi'

const initialState = {
    arrOrder: [],
    newOrder: {}
}

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async (thunkAPI) => {
        const res = await fetchOrders()
        return res;
    },
)

export const deleteOneOrder = createAsyncThunk(
    'orders/deleteOneOrder',
    async (id, thunkAPI) => {
        const res = await deleteOrder(id)
        return res;
    },
)

export const addOneOrder = createAsyncThunk(
    'orders/addOneOrder',
    async (order, thunkAPI) => {
        debugger;
        const res = await addOrder(order)
        return res;
    },
)

export const updateOneOrder = createAsyncThunk(
    'orders/updateOneOrder',
    async (thunkAPI) => {
        const res = await updateOrder()
        return res;
    },
)

export const ordersSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        startNewOrder: (state, order) => {
            debugger;
            state.newOrder = order.payload;
        },
        fetchNewOrder: (state) => {
            return state.newOrder;
        },
        updateCart: (state, p) => {
            debugger;
            const product = p.payload;
            const existingProductIndex = state.newOrder.cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                let updatedCart = [...state.newOrder.cart];
                if (product.num != 0)
                    updatedCart[existingProductIndex].num = product.num;
                else
                    updatedCart = updatedCart.filter(x => x.id !== product.id);
                state.newOrder = { ...state.newOrder, cart: updatedCart };
            } else {
                state.newOrder = { ...state.newOrder, cart: [...state.newOrder.cart, product] };
            }
        },
        deleteCart: (state) => {
            state.newOrder.cart=[];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
            debugger;
            state.arrOrder = payload;
        })
            .addCase(deleteOneOrder.fulfilled, (state, action) => {
                state.arrOrder = action.payload;
            })
            .addCase(updateOneOrder.fulfilled, (state, action) => {
                let index = state.arrOrder.findIndex(x => x.id === action.payload.id);
                state.arrOrder.splice(index, 1, action.payload);
            })
            .addCase(addOneOrder.fulfilled, (state, action) => {
                state.arrOrder.push(action.payload);
            })
    }
})

export const { startNewOrder, fetchNewOrder, updateCart, deleteCart } = ordersSlice.actions;
export default ordersSlice.reducer
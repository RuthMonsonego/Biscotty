import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts, deleteProduct, addProduct, updateProduct, fetchOneProduct } from './productsApi'

const initialState = {
    arrProduct: []
}

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts', 
    async  (thunkAPI) => {
        const res = await fetchProducts()
        return res;
    },
)

export const fetchProductt = createAsyncThunk(
    'product/fetchOneProduct', 
    async  (id, thunkAPI) => {
        const res = await fetchOneProduct(id);
        return res;
    },
)

export const deleteOneProduct = createAsyncThunk(
    'products/deleteOneProduct', 
    async  (id, thunkAPI) => {
        const res = await deleteProduct(id)
        return res;
    },
)

export const addOneProduct = createAsyncThunk(
    'products/addOneProduct', 
    async  (formData, thunkAPI) => {
        debugger
        const res = await addProduct(formData)
        return res;
    },
)

export const updateOneProduct = createAsyncThunk(
    'products/updateOneProduct', 
    async (formData, thunkAPI) => {
        debugger;
        const res = await updateProduct(formData);
        return res;
    },
);

export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
            state.arrProduct = payload;
        })
        .addCase(deleteOneProduct.fulfilled, (state, action) => {
            state.arrProduct = action.payload;
        })
        .addCase(updateOneProduct.fulfilled, (state, { payload }) => {
            debugger
            let index = state.arrProduct.findIndex(x => x.id == payload.id);
            state.arrProduct.splice(index, 1, payload);
        })
        .addCase(addOneProduct.fulfilled, (state, action) => {
            state.arrProduct.push(action.payload);
        })
    }
})

export default productsSlice.reducer
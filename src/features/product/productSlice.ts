import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAPI";



export const initialState = {
    products: [],
    status: 'ideal'
}
export const fetchAsync = createAsyncThunk(
    'product/fetchprodut',
    async () => {
        const response = await fetchProducts()
        return response.data
    }
)


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAsync.pending, (state) => {

            state.status = 'loading'
        })
        .addCase(fetchAsync.fulfilled, (state, action)=>{
            state.status = 'ideal'
            state.products = action.payload
        })
    },
})

export default productSlice.reducer
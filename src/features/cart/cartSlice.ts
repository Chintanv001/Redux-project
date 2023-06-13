import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems, addItems, updateItems, deleteItems } from "./cartAPI";
import { Product } from "../product/Produtcs";

export type ProductState = {
    items: Product[];
    status: string

}

export type  UpdateItemPayload = {
    id: number;
    updatedItem: object 
  }

export const initialState: ProductState = {
    items: [],
    status: 'ideal'
}

export const fetchAsync = createAsyncThunk(
    'cart/fetchItems',
    async () => {
        const response = await fetchItems()
        return response.data
    }
)
export const addAsync = createAsyncThunk(
    'cart/addItems',
    async (item: Product) => {
        const { id, title, brand, thumbnail, price } = item;
        const response = await addItems({ id, title, brand, thumbnail, price, quantity: 1 })
        return response.data
    }
)
export const deleteAsync = createAsyncThunk(
    'cart/deleteItems',
    async (id: number) => {
        await deleteItems(id)
        return id
    }
)
export const updateAsync = createAsyncThunk(
    'cart/updateItem',
    async ({id , updatedItem } : UpdateItemPayload) => {
        const response = await updateItems(id , updatedItem)
        return response.data
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAsync.pending, (state) => {

            state.status = 'loading'
        })
            .addCase(fetchAsync.fulfilled, (state, action) => {
                state.status = 'ideal'
                state.items = action.payload
            })
            .addCase(addAsync.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'ideal'
                state.items.push(action.payload)
            })
            .addCase(deleteAsync.fulfilled, (state, action) => {
                state.status = 'ideal'
                const index = state.items.findIndex(item => item.id === action.payload)
                state.items.splice(index, 1);
            })
            .addCase(updateAsync.fulfilled, (state, action) => {
                state.status = 'ideal'
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items.splice(index, 1 , action.payload);
            })
    },
})

export default cartSlice.reducer
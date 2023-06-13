import axios from "axios";

export const fetchItems = () => {
    return axios.get('http://localhost:8008/cart')
}
export const addItems = (item : object) => {
    return axios.post('http://localhost:8008/cart' , item)
}
export const updateItems = (id : number, updatedItem : object) => {
    // console.log({id , updatedItem})
    return axios.patch(`http://localhost:8008/cart/${id}` , updatedItem)
}
export const deleteItems = (id : number) => {
    return axios.delete(`http://localhost:8008/cart/${id}`)
}
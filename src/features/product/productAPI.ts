import axios from "axios";

export const fetchProducts = () =>{
    return axios.get('http://localhost:8008/products')
}
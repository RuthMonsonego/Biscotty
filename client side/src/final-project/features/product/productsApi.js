import axios from 'axios'

const baseUrl ="http://localhost:4000/product"

export const fetchProducts=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const fetchOneProduct=async(id)=>{
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const deleteProduct=async(id)=>{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export const addProduct=async(formData)=>{
    debugger
    const response = await axios.post(baseUrl, formData);
    return response.data
}

export const updateProduct = async (formData) => {
    debugger;
    const id = formData.get('id');
    const response = await axios.put(`${baseUrl}/${id}`, formData);
    return response.data;
}


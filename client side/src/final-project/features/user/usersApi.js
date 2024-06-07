import axios from 'axios'

const baseUrl ="http://localhost:4000/user"

export const fetchUsers=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const fetchUser=async(id)=>{
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const deleteUser=async(id)=>{
    const response = await axios.delete(`${baseUrl}/ ${id}`)
    return response.data
}

export const addUser=async(user)=>{
    debugger;
    const response = await axios.post(baseUrl, user)
    return response.data
}

export const updateUser=async(user)=>{
    debugger;
    const response = await axios.put(`${baseUrl}/ ${user.get('id')}`, user);
    return response.data;
}

export const loginUser=async(user)=>{
    debugger
    const response = await axios.post(`${baseUrl}/login`,user)
    console.log(response)
    return response
}

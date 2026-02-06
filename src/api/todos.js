import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:5000' })

export function setBaseUrl(url) {
    client.defaults.baseURL = url
}

export async function getTodos() {
    const res = await client.get('/todos')
    return res.data
}

export async function createTodo(todo) {
    const res = await client.post('/todos', todo)
    return res.data
}

export async function updateTodo(id, patch) {
    const res = await client.patch(`/todos/${id}`, patch)
    return res.data
}

export async function deleteTodo(id) {
    await client.delete(`/todos/${id}`)
}

export default {
    setBaseUrl,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}
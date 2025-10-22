import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL
});

export const tareasService = {
    crearTarea:(data) => api.post('/tasks', data),
    obtenerTareas:() => api.get('/tasks'),
    deleteTarea:(id) => api.delete(`/tasks/${id}`),
    updateTarea:(id, data) => api.put(`/tasks/${id}`, data)
}
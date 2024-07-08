import axios from './axios.js';

export const visitas = async () => {
    try {
        const response = await axios.get('visitas');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const del = async (id) => {
    try {
        const response = await axios.patch(`visitas/cancelar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crear = async (visita) => {
    try {
        const response = await axios.post('visitas', visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
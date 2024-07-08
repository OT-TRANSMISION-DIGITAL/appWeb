import axios from './axios.js';

export const ordenes = async () => {
    try {
        const response = await axios.get('ordenes');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const del = async (id) => {
    try {
        const response = await axios.patch(`ordenes/cancelar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crear = async (visita) => {
    try {
        const response = await axios.post('ordenes', visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
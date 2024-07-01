import axios from './axios.js';

export const usuarios = async () => {
    try {
        const response = await axios.get('usuarios');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(`usuarios/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearUsuario = async (usuario) => {
    try {
        const response = await axios.post('registrar', usuario);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
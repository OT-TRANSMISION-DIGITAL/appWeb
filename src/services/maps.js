import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_GOOGLE_MAPS; // Reemplaza con tu clave API de Google Maps
const base_url = import.meta.env.VITE_API_GOOGLE_MAPS; // Reemplaza con tu clave API de Google Maps

export const getAddress = async (lat, lng) => {
    const url = `${base_url}?latlng=${lat},${lng}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response
    } catch (error) {
        console.error('Error fetching address: ', error);
    }
};
export const getCoords = async (address) => {
    const url = `${base_url}?address=${address}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response
    } catch (error) {
        console.error('Error fetching coordinates: ', error);
    }
}
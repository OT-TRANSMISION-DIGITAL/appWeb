import { user } from '../services/usuarios.js';

async function verifyToken(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token) return location.href = '/login';
    try {
        const userResponse = await user();
        if (userResponse.status < 300) {
            console.log(userResponse.data)
            return next();
        }else{
            console.log(userResponse);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return location.href = '/login';
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return location.href = '/login';   
    }
}




export {
    verifyToken
}
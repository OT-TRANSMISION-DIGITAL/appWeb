import { user } from '../services/usuarios.js';

async function verifyToken(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token) return to.path === '/login' ? next() : location.href = 'login';
    try {
        const userResponse = await user();
        if (userResponse.status < 300) {
            return to.path === '/login' ? location.href = '/' : next();
        }else{
            console.log(userResponse);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return location.href = 'login';
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return location.href = 'login';   
    }
}




export {
    verifyToken
}
async function verifyToken(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token) return next('/login');
    return next();
}




export {
    verifyToken
}

const isEmail=  (correo) => {
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(correo);
};
const isPassword = (password) => {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(password);
}


export {
    isEmail,
    isPassword
}
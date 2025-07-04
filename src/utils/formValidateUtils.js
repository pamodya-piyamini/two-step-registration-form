export const isBlankOrNull = (str) => {
    return str === null || str === undefined || (typeof str === 'string' && str.trim() === '');
}

export const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
}
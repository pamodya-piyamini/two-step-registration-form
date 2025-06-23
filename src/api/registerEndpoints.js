import axiosService from "../services/axiosService";

const endpoints = ({
    register: {
        url: '/register',
        method: 'POST'
    }
})
export const registerUser = async (data) => {
    const {url, method} = endpoints.register;

    const response = await axiosService({
        method: method,
        url: url,
        data: data,
    });

    return response;
}
import UseLocalStorage from '../@hooks/useLocalStorage';

export const isAuthenticated = () => {
    const { getLocalstorage } = UseLocalStorage();
    return !!getLocalstorage('access-token');
};
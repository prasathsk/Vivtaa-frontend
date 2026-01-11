
export default function UseLocalStorage() {
    const setLocalstorage = (key: string, value: string) => {
        switch (key) {
            case 'access-token': localStorage.setItem('access-token', value);
                break;
            case 'refresh-token': localStorage.setItem('refresh-token', value);
                break;
        }
    };

    const getLocalstorage = (key: string) => {
        let currentValue: string | null = ''
        switch (key) {
            case 'access-token':
                currentValue = localStorage.getItem('access-token');
                break;
            case 'refresh-token':
                currentValue = localStorage.getItem('refresh-token');
                break;
        }

        return currentValue;
    };

    return { setLocalstorage, getLocalstorage }
};
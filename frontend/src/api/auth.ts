import axiosInstance from "./axiosInstance";

interface logoutInterface {
    accessToken:string;
    refreshToken:string;
}

export const logoutApi = (body:logoutInterface) => {
    return axiosInstance.post(`/auth/api/logout`, body);
};
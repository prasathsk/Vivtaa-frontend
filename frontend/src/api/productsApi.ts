import axiosInstance from "./axiosInstance";

interface ProductListInterface {
    search?: string;
    page: number;
    limit: number;
}

export const productListApi = (data:ProductListInterface) => {
    return axiosInstance.get(`/api/products?search=${data.search}&page=${data?.page}&limit=${data?.limit}`);
};

export const productDetailPage = (id:string) => {
    return axiosInstance.get(`/api/products/${id}`);
};
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { getApiUrl } from "../../utils/api-helpers";
import { Category } from "../models/category.model";
import { ApiError } from "../models/api-error.model";

export const getCategories = async (): Promise<Category[] | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<Category[], any> = await axios.get(getApiUrl("categories"));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        return e.response.data as ApiError[]
    }
}

export const getCategory = async (categoryId: string): Promise<Category | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<Category, any> = await axios.get(getApiUrl(`categories/${categoryId}`));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        return e.response.data as ApiError[]
    }
}

export const createCategory = async (category: Category): Promise<Category | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<Category, any> = await axios.post(getApiUrl(`categories`), category);
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

export const updateCategory = async (category: Category): Promise<Category | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<Category, any> = await axios.put(getApiUrl(`categories/${category._id}`), category);
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

export const deleteCategory = async (category: Category) :Promise<void | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<Category, any> = await axios.put(getApiUrl(`categories/${category._id}`));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { getApiUrl } from "../../utils/api-helpers";
import { ApiError } from "../models/api-error.model";
import { BaseCategory } from "../models/base-category.model";

export const getBaseCategories = async (): Promise<BaseCategory[] | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<BaseCategory[], any> = await axios.get(getApiUrl("base-categories"));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        return e.response.data as ApiError[]
    }
}

export const getBaseCategory = async (categoryId: string): Promise<BaseCategory | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<BaseCategory, any> = await axios.get(getApiUrl(`base-categories/${categoryId}`));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        return e.response.data as ApiError[]
    }
}

export const createBaseCategory = async (category: BaseCategory): Promise<BaseCategory | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<BaseCategory, any> = await axios.post(getApiUrl(`base-categories`), category);
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

export const updateBaseCategory = async (category: BaseCategory): Promise<BaseCategory | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<BaseCategory, any> = await axios.put(getApiUrl(`base-categories/${category._id}`), category);
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

export const deleteBaseCategory = async (category: BaseCategory) :Promise<void | AxiosError<ApiError[], any> | any> => {
    try {
        const response: AxiosResponse<BaseCategory, any> = await axios.put(getApiUrl(`base-categories/${category._id}`));
        return response.data;
    } catch (e: AxiosError<ApiError[], any> | any) {
        console.log();
        return e.response.data as ApiError[];
    }
}

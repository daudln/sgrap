import axios, { AxiosRequestConfig } from "axios";

export interface APIResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T[];
}

export interface SingeAPIResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN_URL,
});

class APIClient<T> {
  constructor(public endpoint: string) {}
  getAll = async (config: AxiosRequestConfig) => {
    const response = await axiosInstance.get<APIResponse<T>>(
      this.endpoint,
      config
    );
    return response.data;
  };
  get = async (id: number | string) => {
    const response = await axiosInstance.get<SingeAPIResponse<T>>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  };
}

export default APIClient;

import axios from "axios";
import { GLOBAL_CONFIG } from "@/global-config";
import { userStore } from "@/store/userStore";
import { successCode, unLoginCode } from "./code";

const axiosInstance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 5 * 60 * 1000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["x-tenant-id"] = "demo_school_id"; // 学校id
    config.headers["x-auth-refer"] = "cisp-ops";
    config.headers["x-trace-id"] = "uuid";
    config.headers["x-token"] = "token";
    config.headers.Authorization = "Bearer Token";
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => {
    const { statusCode, message } = res.data;
    if (statusCode === successCode) {
      return res.data;
    } else {
      if (unLoginCode.includes(statusCode)) {
        // 未登录
        userStore.clearUserInfoAndToken();
        return Promise.reject(new Error(message || "用户未登录"));
      }
      return Promise.reject(new Error(message || "未知错误"));
    }
  },
  // 超出 2xx 范围的状态码都会触发该函数
  (error) => Promise.reject(error),
);

// class APIClient {
//   get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
//     return this.request<T>({ ...config, method: "GET" });
//   }
//   post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
//     return this.request<T>({ ...config, method: "POST" });
//   }
//   put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
//     return this.request<T>({ ...config, method: "PUT" });
//   }
//   delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
//     return this.request<T>({ ...config, method: "DELETE" });
//   }
//   request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
//     return axiosInstance.request<any, T>(config);
//   }
// }

export const apiClient = axiosInstance;

import type { ReqResult } from "@/types/api";
import { apiClient } from "../apiClient";
import type { IRuntimeConfig } from "../interfaces/runtime";

export class RuntimeModel {
  /**
   * 查询运行时配置
   */
  public async queryRuntimeConfig() {
    return apiClient.request<ReqResult<IRuntimeConfig>>({
      url: "/cisp/runtime/config",
      method: "GET",
    });
  }
}

export const runtimeModel = new RuntimeModel();

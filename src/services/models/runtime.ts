import type { ReqResult } from "#/api";
import { apiClient } from "../apiClient";
import type { IRuntimeConfig } from "../interfaces/runtime";

export class RuntimeModel {
  /** 查询运行时配置 */
  public async queryRuntimeConfig() {
    return apiClient.get<ReqResult<IRuntimeConfig>>("/cisp/runtime/config");
  }
}

export const runtimeModel = new RuntimeModel();

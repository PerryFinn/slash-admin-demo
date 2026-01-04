import type { Menu } from "#/entity";
import { apiClient } from "../apiClient";

export enum MenuApi {
  Menu = "/menu",
}

const getMenuList = () => apiClient.get<Menu[]>(MenuApi.Menu);

export default {
  getMenuList,
};

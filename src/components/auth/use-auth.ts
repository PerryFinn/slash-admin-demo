import { userStore } from "@/store/userStore";

/**
 * permission/role check hook
 * @param baseOn - check type: 'role' or 'permission'
 *
 * @example
 * // permission check
 * const { check, checkAny, checkAll } = useAuthCheck('permission');
 * check('user.create')
 * checkAny(['user.create', 'user.edit'])
 * checkAll(['user.create', 'user.edit'])
 *
 * @example
 * // role check
 * const { check, checkAny, checkAll } = useAuthCheck('role');
 * check('admin')
 * checkAny(['admin', 'editor'])
 * checkAll(['admin', 'editor'])
 */
export const useAuthCheck = (baseOn: "role" | "permission" = "permission") => {
  const getResourcePool = () => {
    const userInfoSnapshot = userStore.userInfoSnapshot;
    return baseOn === "role" ? (userInfoSnapshot.roles ?? []) : (userInfoSnapshot.permissions ?? []);
  };

  const getAccessToken = () => userStore.userTokenSnapshot.accessToken;

  // 检查是否存在某项权限
  const check = (item: string): boolean => {
    // 如果用户未登录，返回 false
    const accessToken = getAccessToken();
    if (!accessToken) {
      return false;
    }
    const resourcePool = getResourcePool();
    return resourcePool.some((p) => p.code === item);
  };

  // 检查是否存在任何一项权限
  const checkAny = (items: string[]) => {
    if (items.length === 0) {
      return true;
    }
    return items.some((item) => check(item));
  };

  // 检查所有权限是否存在
  const checkAll = (items: string[]) => {
    if (items.length === 0) {
      return true;
    }
    return items.every((item) => check(item));
  };

  return { check, checkAny, checkAll };
};

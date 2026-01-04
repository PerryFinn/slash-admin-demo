import type { ReactNode } from "react";
import { useAuthCheck } from "./use-auth";

interface AuthGuardProps {
  /**
   * 如果用户具有所需的权限/角色，则渲染内容
   */
  children: ReactNode;
  /**
   * 如果用户没有所需的权限/角色，则渲染备选内容
   */
  fallback?: ReactNode;
  /**
   * 要检查的权限/角色
   */
  check?: string;
  /**
   * 要检查的权限/角色 (任意一个)
   */
  checkAny?: string[];
  /**
   * 要检查的权限/角色 (全部)
   */
  checkAll?: string[];
  /**
   * 要执行的检查类型: 'role' 或 'permission'
   * @default 'permission'
   */
  baseOn?: "role" | "permission";
}

/**
 * A wrapper component that conditionally renders its children based on user permissions/roles
 *
 * @example
 * // Check single permission
 * <AuthGuard check="user.create">
 *   <button>Create User</button>
 * </AuthGuard>
 *
 * @example
 * // Check multiple permissions (any)
 * <AuthGuard checkAny={["user.create", "user.edit"]}>
 *   <button>Edit User</button>
 * </AuthGuard>
 *
 * @example
 * // Check multiple permissions (all)
 * <AuthGuard checkAll={["user.create", "user.edit"]}>
 *   <button>Advanced Edit</button>
 * </AuthGuard>
 *
 * @example
 * // With fallback content
 * <AuthGuard check="admin" baseOn="role" fallback={<div>Access Denied</div>}>
 *   <AdminPanel />
 * </AuthGuard>
 */
export const AuthGuard = ({
  children,
  fallback = null,
  check,
  checkAny,
  checkAll,
  baseOn = "permission",
}: AuthGuardProps) => {
  const checkFn = useAuthCheck(baseOn);

  const hasAccess = check
    ? checkFn.check(check)
    : checkAny
      ? checkFn.checkAny(checkAny)
      : checkAll
        ? checkFn.checkAll(checkAll)
        : true;

  return hasAccess ? children : fallback;
};

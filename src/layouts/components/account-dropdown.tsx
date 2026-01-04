import { observer } from "mobx-react-lite";
import { NavLink } from "react-router";
import { useLoginStateContext } from "@/pages/sys/login/providers/login-provider";
import { useRouter } from "@/routes/hooks";
import { userStore } from "@/store/userStore";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

/** Account Dropdown */
const AccountDropdown = observer(() => {
  const { replace } = useRouter();
  const userInfo = userStore.userInfoSnapshot;
  const { username, email, avatar } = userInfo;
  const { backToLogin } = useLoginStateContext();
  const logout = () => {
    try {
      userStore.clearUserInfoAndToken();
      backToLogin();
    } catch (error) {
      console.log(error);
    } finally {
      replace("/auth/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img className="h-6 w-6 rounded-full" src={avatar} alt="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex items-center gap-2 p-2">
          <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
          <div className="flex flex-col items-start">
            <div className="text-text-primary text-sm font-medium">{username}</div>
            <div className="text-text-secondary text-xs">{email}</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="https://docs-admin.slashspaces.com/" target="_blank">
            文档
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/management/user/profile">个人资料</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/management/user/account">账户</NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-bold text-warning" onClick={logout}>
          退出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default AccountDropdown;

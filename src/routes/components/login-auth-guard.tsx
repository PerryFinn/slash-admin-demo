import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "@/store/userStore";
import { useRouter } from "../hooks";

type Props = {
  children: React.ReactNode;
};
const LoginAuthGuard = observer(({ children }: Props) => {
  const router = useRouter();
  const { accessToken } = userStore.userTokenSnapshot;

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace("/auth/login");
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
});

export default LoginAuthGuard;

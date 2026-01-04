import { useMutation } from "@tanstack/react-query";
import { action, autorun, makeObservable, observable, toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { toast } from "sonner";
import type { UserInfo, UserToken } from "#/entity";
import { StorageEnum } from "#/enum";
import userService, { type SignInReq } from "@/api/services/userService";

type UserStoreState = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
};

const USER_STORE_KEY = "userStore";
const USER_STORE_VERSION = 0;

class UserStore {
  @observable
  userInfo: Partial<UserInfo> = {};
  @observable
  userToken: UserToken = {};

  actions = {
    setUserInfo: (userInfo: UserInfo) => this.setUserInfo(userInfo),
    setUserToken: (userToken: UserToken) => this.setUserToken(userToken),
    clearUserInfoAndToken: () => this.clearUserInfoAndToken(),
  };

  constructor() {
    makeObservable(this);
    this.hydrateFromStorage();
    this.setupPersistence();
  }

  get snapshot(): UserStoreState {
    return {
      userInfo: this.userInfoSnapshot,
      userToken: this.userTokenSnapshot,
    };
  }

  get userInfoSnapshot(): Partial<UserInfo> {
    return toJS(this.userInfo);
  }

  get userTokenSnapshot(): UserToken {
    return toJS(this.userToken);
  }

  @action
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  @action
  setUserToken(userToken: UserToken) {
    this.userToken = userToken;
  }

  @action
  clearUserInfoAndToken() {
    this.userInfo = {};
    this.userToken = {};
    this.removePersistedUser();
  }

  private hydrateFromStorage() {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(USER_STORE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as { state?: Partial<UserStoreState> };
      if (parsed?.state?.[StorageEnum.UserInfo]) {
        this.userInfo = parsed.state[StorageEnum.UserInfo] as Partial<UserInfo>;
      }
      if (parsed?.state?.[StorageEnum.UserToken]) {
        this.userToken = parsed.state[StorageEnum.UserToken] as UserToken;
      }
    } catch (error) {
      console.error("[UserStore] Failed to hydrate user data", error);
    }
  }

  private setupPersistence() {
    if (typeof window === "undefined") return;

    autorun(() => {
      const payload = {
        state: {
          [StorageEnum.UserInfo]: this.userInfoSnapshot,
          [StorageEnum.UserToken]: this.userTokenSnapshot,
        },
        version: USER_STORE_VERSION,
      };
      window.localStorage.setItem(USER_STORE_KEY, JSON.stringify(payload));
    });
  }

  private removePersistedUser() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(USER_STORE_KEY);
  }
}

const userStore = new UserStore();

export const useUserInfo = () => useObserver(() => userStore.userInfoSnapshot);
export const useUserToken = () => useObserver(() => userStore.userTokenSnapshot);
export const useUserPermissions = () => useObserver(() => userStore.userInfoSnapshot.permissions || []);
export const useUserRoles = () => useObserver(() => userStore.userInfoSnapshot.roles || []);
export const useUserActions = () => userStore.actions;
export const getUserStoreSnapshot = () => userStore.snapshot;
export const userStoreInstance = userStore;

export const useSignIn = () => {
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
    } catch (err) {
      toast.error((err as Error).message, {
        position: "top-center",
      });
      throw err;
    }
  };

  return signIn;
};

export { userStore };
export default userStore;

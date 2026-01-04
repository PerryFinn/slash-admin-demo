import { useMutation } from "@tanstack/react-query";
import { autorun, makeAutoObservable, toJS } from "mobx";
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
  userInfo: Partial<UserInfo> = {};
  userToken: UserToken = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  setUserToken(userToken: UserToken) {
    this.userToken = userToken;
  }

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

export const userStore = new UserStore();

export const useSignIn = () => {
  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res;
      userStore.setUserToken({ accessToken, refreshToken });
      userStore.setUserInfo(user);
    } catch (err) {
      toast.error((err as Error).message, {
        position: "top-center",
      });
      throw err;
    }
  };

  return signIn;
};

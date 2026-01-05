import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";
import { UserApi } from "@/api/services/userService";
import zhCN from "@/locales/lang/zh_CN";
import { StatusCode } from "@/types/enum";
import { DB_PERMISSION, DB_ROLE, DB_ROLE_PERMISSION, DB_USER, DB_USER_ROLE } from "../assets_backup";

const getZh = (key?: string) => {
  if (!key) return key;
  const parts = key.split(".");
  let current: any = zhCN;
  for (const part of parts) {
    current = current?.[part];
  }
  return typeof current === "string" ? current : key;
};

const mapPermission = (item: any): any => {
  const children = item.children?.map(mapPermission);
  return {
    ...item,
    label: item.label ? getZh(item.label) : item.label,
    ...(children ? { children } : {}),
  };
};

const signIn = http.post(`/api${UserApi.SignIn}`, async ({ request }) => {
  const { username, password } = (await request.json()) as Record<string, string>;

  const user = DB_USER.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return HttpResponse.json({
      statusCode: 10001,
      message: "Incorrect username or password.",
    });
  }
  // delete password
  const { password: _, ...userWithoutPassword } = user;

  // user role
  const roles = DB_USER_ROLE.filter((item) => item.userId === user.id).map((item) =>
    DB_ROLE.find((role) => role.id === item.roleId),
  );

  // user permissions
  const permissions = DB_ROLE_PERMISSION.filter((item) => roles.some((role) => role?.id === item.roleId)).map((item) =>
    DB_PERMISSION.find((permission) => permission.id === item.permissionId),
  );

  return HttpResponse.json({
    statusCode: StatusCode.SUCCESS,
    message: "",
    data: {
      user: {
        ...userWithoutPassword,
        roles,
        permissions: permissions.map((item) => (item ? mapPermission(item) : item)),
      },
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
    },
  });
});

const userList = http.get("/api/user", async () => {
  return HttpResponse.json(
    Array.from({ length: 10 }).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: faker.location.streetAddress(),
    })),
    {
      status: 200,
    },
  );
});

export { signIn, userList };

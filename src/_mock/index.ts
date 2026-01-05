import { setupWorker } from "msw/browser";
import { mockTokenExpired } from "./handlers/_demo";
import { signIn, userList } from "./handlers/_user";

const handlers = [signIn, userList, mockTokenExpired];
const worker = setupWorker(...handlers);

export { worker };

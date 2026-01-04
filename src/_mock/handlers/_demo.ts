import { HttpResponse, http } from "msw";
import { DemoApi } from "@/api/services/demoService";
import { StatusCode } from "@/types/enum";

const mockTokenExpired = http.post(`/api${DemoApi.TOKEN_EXPIRED}`, () => {
  return new HttpResponse(null, { status: StatusCode.TIMEOUT });
});

export { mockTokenExpired };

import {
  Application,
  Request,
  Response,
  Middleware,
} from "https://deno.land/x/oak/mod.ts";

export const vhost = (
  hosts: { host: string; app: Application }[],
): Middleware => {
  return async (
    ctx: { request: Request; response: Response },
  ): Promise<void> => {
    const actualHost = await ctx.request.headers.get("host");
    const exist = hosts.find(({ host }) => host === actualHost);
    if (exist) {
      const response = await exist.app.handle(ctx.request.serverRequest);
      if (response) {
        ctx.response.body = response.body;
        ctx.response.headers = response.headers;
        ctx.response.status = response.status;
      }
    }
  };
};

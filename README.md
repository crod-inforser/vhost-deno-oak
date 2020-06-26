# vhost-deno-oak
minimal vhost to manage your oak servers with many domains

# Usage

import { Application } from "https://deno.land/x/oak/mod.ts";
import { vhost } from "./mod.ts";

const app = new Application(),
  app2 = new Application(),
  app3 = new Application();

app2.use((ctx) => {
  ctx.response.body = "Hello from dev.localhost";
});

app3.use((ctx) => {
  ctx.response.body = "Hello from test.dev.localhost";
});

app.use(
  vhost(
    [
      { host: "dev.localhost:8000", app: app2 },
      { host: "test.dev.localhost:8000", app: app3 },
    ],
  ),
);

await app.listen({ port: 8000 });

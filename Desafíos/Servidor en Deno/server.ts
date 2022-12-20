import { serve } from "https://deno.land/std@0.52.0/http/server.ts";
import {
  red,
  bgWhite,
  bold,
} from "https://deno.land/std@0.168.0/fmt/colors.ts";

const PORT = 8080;
const server = serve({ port: PORT });

console.log(bgWhite(bold(red(`RUNNING SERVER ON PORT: ${PORT}/`))));

for await (const req of server) {
  req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html",
    }),
    body: "<h1>Servidor desde Deno </h1>",
  });
}

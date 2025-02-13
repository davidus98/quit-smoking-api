import Fastify from "fastify";
import { OpenAPIBackend } from "openapi-backend";

const fastify = Fastify({
  logger: true,
});

const api = new OpenAPIBackend({
  definition: "./openapi/spec.yml", // Calea către fișierul openapi.yaml
  handlers: {
    // Rutele pentru fiecare operațiune definită în OpenAPI
    getHello: async (_c, _req, _reply) => {
      return { message: "Hello from OpenAPI-Backend!" };
    },
    // Rute pentru 404 sau alte erori
    notFound: async (_c, _req, reply) => {
      reply.code(404).send({ error: "Not Found" });
    },
  },
});

await api.init();

fastify.all("/*", async (req, reply) => {
  return api.handleRequest(
    {
      method: req.method,
      path: req.url,
      body: req.body,
      query: req.query,
      headers: req.headers,
    },
    req,
    reply
  );
});

fastify.listen({ port: 3000 }, (err, _address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

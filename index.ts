import Fastify from "fastify";
import { OpenAPIBackend } from "openapi-backend";
import { connectDB } from "./db"; // Import the connectDB function

const fastify = Fastify({
  logger: true,
});

const api = new OpenAPIBackend({
  definition: "./openapi/spec.yml",
  handlers: {
    getHello: async (_c, _req, _reply) => {
      return { message: "Hello from OpenAPI-Backend!" };
    },
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
      query: req.query as { [key: string]: string | string[] } | undefined, // Assert the correct type here,
      headers: req.headers as { [key: string]: string | string[] },
    },
    req,
    reply
  );
});

await connectDB();

fastify.listen({ port: 3000 }, (err, _address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

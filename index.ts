import Fastify from "fastify"
import { OpenAPIBackend } from "openapi-backend"
import { connectDB } from "./db" // Import the connectDB function

const fastify = Fastify({
  logger: true,
})

const api = new OpenAPIBackend({
  definition: "./openapi/spec.yml", // OpenAPI spec path
  handlers: {
    getHello: async (_c, _req, _reply) => {
      return { message: "Hello from OpenAPI-Backend!" }
    },
    notFound: async (_c, _req, reply) => {
      reply.code(404).send({ error: "Not Found" })
    },
  },
})

await api.init()

await fastify.register(import("@fastify/swagger"))

await fastify.register(import("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next()
    },
    preHandler: function (_request, _reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (_swaggerObject, _request, _reply) => {
    return api.document
  },
  transformSpecificationClone: true,
})

fastify.all("/*", async (req, reply) => {
  return api.handleRequest(
    {
      method: req.method,
      path: req.url,
      body: req.body,
      query: req.query as Record<string, string | string[]> | undefined,
      headers: req.headers as Record<string, string | string[]>,
    },
    req,
    reply
  )
})

// Connect to the database
await connectDB()

// Start the Fastify server
fastify.listen({ port: 3000 }, (err, _address) => {
  if (err) throw err
})

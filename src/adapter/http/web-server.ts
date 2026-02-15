import type { CreateNote } from "@domain/note/create";
import Fastify, { type FastifyInstance } from "fastify";
import z from "zod";

export const SERVER_PORT = 8989;

const fastify: FastifyInstance = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

type UseCases = {
  createNote: CreateNote;
};
export function createFastifyServer({ createNote }: UseCases) {
  fastify.get("/", (_req, _res) => {
    fastify!.log.info("ping");
    return "check health: ok!";
  });

  fastify.post("/note", async (req, res) => {
    // http api schema
    const body = z
      .object({ content: z.string(), title: z.string() })
      .parse(req.body);

    req.log.info(`Here be the request body: ${body}`);

    try {
      const note = await createNote.execute(body);
      res.status(201).send(note);
    } catch (err: unknown) {
      const error = err as Error;
      res.status(400).send({ error: error.message });
    }
  });

  return fastify;
}

export function getLogger() {
  return fastify.log;
}

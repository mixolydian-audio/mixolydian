import { z } from "zod";

export type EndpointIdentifier = string;

export type EndpointType = "value" | "event" | "stream";

export type Endpoint = {
  kind: EndpointType;
  schema: z.ZodSchema;
};

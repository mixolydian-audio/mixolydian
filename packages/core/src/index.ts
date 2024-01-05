import { EmbeddedPatchConnection } from "./cmajor/types";
import { create } from "./patch";
import { Endpoint, EndpointIdentifier } from "./types";
export { patch, Patch } from "./patch";
export { z } from "zod";

type InitOptions = {
  endpoints: Record<EndpointIdentifier, Endpoint>;
};

export const init = (
  connection: EmbeddedPatchConnection,
  { endpoints }: InitOptions
) => {
  create(connection, endpoints);
};

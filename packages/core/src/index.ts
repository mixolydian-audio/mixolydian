import { EmbeddedPatchConnection } from "./cmajor/types";
import { create } from "./patch";
export { patch } from "./patch";

export const init = (connection: EmbeddedPatchConnection) => {
  create(connection);
};

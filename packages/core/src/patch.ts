import { EmbeddedPatchConnection } from "./cmajor/types";

class Patch {
  private _connection: EmbeddedPatchConnection;
  constructor(connection: EmbeddedPatchConnection) {
    this._connection = connection;
    console.log("patch", this._connection);
  }
}

export let patch: Patch;
export const create = (connection: EmbeddedPatchConnection) =>
  (patch = new Patch(connection));

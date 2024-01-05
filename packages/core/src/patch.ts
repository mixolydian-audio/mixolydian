import { EmbeddedPatchConnection } from "./cmajor/types";
import { Endpoint, EndpointIdentifier } from "./types";

export class Patch {
  private connection: EmbeddedPatchConnection;
  private inputs: Record<EndpointIdentifier, Endpoint>;

  constructor(
    connection: EmbeddedPatchConnection,
    inputs: Record<EndpointIdentifier, Endpoint>
  ) {
    this.connection = connection;
    this.inputs = inputs;
    this.connection.addStatusListener((status) => {
      console.log(status.details.inputs);
      // for (const [identifier, input] of Object.entries(this._inputs)) {
      //   input.schema.parse(
      //     status.details.inputs.find((ep) => ep.endpointID === identifier)
      //   );
      // }
    });
    this.connection.requestStatusUpdate();
    this.connection.addAllParameterListener((v) =>
      console.log("all params", v)
    );

    this.connection.requestParameterValue("complexSingle");
    console.log(inputs);
  }

  on<T extends (typeof this.inputs)[string]>(
    endpoint: EndpointIdentifier,
    handler: (value: T) => void
  ) {
    this.connection.addParameterListener(endpoint, handler);
    this.connection.requestParameterValue(endpoint);
  }

  off<T>(endpoint: EndpointIdentifier, handler: (values: T) => void) {
    this.connection.removeParameterListener(endpoint, handler);
  }
}

export let patch: Patch;
export const create = (
  connection: EmbeddedPatchConnection,
  inputs: Record<EndpointIdentifier, Endpoint>
) => (patch = new Patch(connection, inputs));

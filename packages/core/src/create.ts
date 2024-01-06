import { EmbeddedPatchConnection } from "./cmajor/types";
import { createProxyStore } from "./store";

export const createPatch = <T = { [key: string]: any }>() => {
  const store = createProxyStore();

  let $connection: EmbeddedPatchConnection | null = null;

  return {
    parameters: {
      get: (endpoint: keyof T): any => {
        if (!store.has(String(endpoint))) {
          throw new Error(
            `Parameter ${String(
              endpoint
            )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.get().`
          );
        }
        return store.get(String(endpoint));
      },
      set: (endpoint: keyof T, value: any) => {
        if (!$connection) {
          throw new Error(
            `Parameter ${String(
              endpoint
            )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.set().`
          );
        }
        // TODO get rid of string cast
        $connection.sendEventOrValue(String(endpoint), value);
      },
      subscribe: (endpoint: keyof T, handler: (value: any) => void): void => {
        store.subscribe(String(endpoint), handler);
      },
      unsubscribe: (endpoint: keyof T, handler: (value: any) => void): void => {
        store.unsubscribe(String(endpoint), handler);
      },
    },
    connect: (connection: EmbeddedPatchConnection) => {
      $connection = connection;
      $connection.addAllParameterListener(({ endpointID, value }) => {
        store.set(endpointID, value);
      });

      $connection.addStatusListener((status) => {
        status.details.inputs.forEach((input) => {
          $connection?.requestParameterValue(input.endpointID);
        });
      });

      $connection.requestStatusUpdate();
    },
  };
};

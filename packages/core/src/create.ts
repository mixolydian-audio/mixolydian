import { EmbeddedPatchConnection } from './cmajor/types';
import { createProxyStore } from './store';

export const createPatch = <T extends { [key: string]: unknown }>() => {
  type Endpoint = keyof T & string;

  const store = createProxyStore<T>();

  let $connection: EmbeddedPatchConnection | null = null;

  return {
    parameters: {
      get: <K extends Endpoint>(endpoint: K): T[K] => {
        if (!store.has(endpoint)) {
          throw new Error(
            `Parameter ${String(
              endpoint
            )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.get().`
          );
        }
        return store.get(endpoint);
      },
      set: <K extends Endpoint>(endpoint: Endpoint, value: T[K]) => {
        if (!$connection) {
          throw new Error(
            `Parameter ${String(
              endpoint
            )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.set().`
          );
        }
        $connection.sendEventOrValue(endpoint, value);
      },
      subscribe: <K extends Endpoint>(endpoint: K, handler: (value: T[K]) => void): void => {
        store.subscribe(endpoint, handler);
      },
      unsubscribe: <K extends Endpoint>(endpoint: K, handler: (value: T[K]) => void): void => {
        store.unsubscribe(endpoint, handler);
      },
    },
    connect: (connection: EmbeddedPatchConnection) => {
      $connection = connection;
      $connection.addAllParameterListener(({ endpointID, value }) => {
        store.set(endpointID, value as any); // TODO get rid of any
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

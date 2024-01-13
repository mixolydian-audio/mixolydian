import { as } from 'vitest/dist/reporters-qc5Smpt5.js';
import { EmbeddedPatchConnection } from './cmajor/types';
import { Endpoints, GetFunction, PatchInputs, SetFunction, SubscribeFunction, UnsubscribeFunction } from './types';

export const createPatch = <T extends PatchInputs>() => {
  const store: Partial<T> = {};

  type Listener<K extends Endpoints<T>> = (value: T[K]) => void;
  type Listeners = {
    [key in Endpoints<T>]?: Listener<key>[];
  };

  const listeners: Listeners = {};

  let connection: EmbeddedPatchConnection | null = null;

  const has = (endpoint: Endpoints<T>): boolean => {
    return store[endpoint] !== undefined;
  };

  const get: GetFunction<T> = (endpoint) => {
    if (!has(endpoint)) {
      throw new Error(
        `Parameter ${String(
          endpoint
        )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.get().`
      );
    }
    return store[endpoint];
  };

  const set: SetFunction<T> = (endpoint, value) => {
    if (!connection) {
      throw new Error(
        `Parameter ${String(
          endpoint
        )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.set().`
      );
    }
    connection.sendEventOrValue(endpoint, value);
  };

  const subscribe: SubscribeFunction<T> = (endpoint, handler) => {
    const endpointListeners = listeners[endpoint];
    endpointListeners ? endpointListeners.push(handler) : (listeners[endpoint] = [handler]);

    const endpointValue = store[endpoint];
    if (endpointValue) {
      handler(endpointValue);
    }
  };

  const unsubscribe: UnsubscribeFunction<T> = (endpoint, handler) => {
    const endpointListeners = listeners[endpoint];
    if (!endpointListeners) return;

    listeners[endpoint] = endpointListeners.filter((h) => h !== handler);
  };

  return {
    endpoints: {
      get,
      set,
      subscribe,
      unsubscribe,
    },
    connect: (patchConnection: EmbeddedPatchConnection) => {
      connection = patchConnection;
      connection.addAllParameterListener(({ endpointID, value }) => {
        const endpoint = endpointID as Endpoints<T>;
        const updateValue = value as T[Endpoints<T>];
        store[endpoint] = updateValue;

        for (const listener of listeners[endpoint] || []) {
          listener(updateValue);
        }
      });

      connection.addStatusListener((status) => {
        if (!connection) {
          throw new Error('Connection to patch could not be established.');
        }

        for (const input of status.details.inputs) {
          connection.requestParameterValue(input.endpointID);
        }
      });

      connection.requestStatusUpdate();
    },
  };
};

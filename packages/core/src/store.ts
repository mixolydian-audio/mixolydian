export const createProxyStore = <T extends { [key: string]: unknown }>() => {
  type Endpoint = keyof T & string;

  const store: Partial<T> = {};

  type Listener<K extends Endpoint> = (value: T[K]) => void;
  type Listeners = {
    [key in Endpoint]?: Listener<key>[];
  };

  const listeners: Listeners = {};

  return {
    has: (endpoint: Endpoint): boolean => !!store[endpoint],
    get: <K extends Endpoint>(endpoint: K): T[K] => {
      const endpointValue = store[endpoint];
      if (!endpointValue) {
        throw new Error(
          `Parameter ${String(
            endpoint
          )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.get().`
        );
      }
      return endpointValue;
    },
    set: <K extends Endpoint>(endpoint: K, value: T[K]) => {
      store[endpoint] = value;
      listeners[endpoint]?.forEach((handler) => handler(value));
    },
    subscribe: <K extends Endpoint>(endpoint: K, handler: (value: T[K]) => void): void => {
      const endpointListeners = listeners[endpoint];
      endpointListeners ? endpointListeners.push(handler) : (listeners[endpoint] = [handler]);

      const endpointValue = store[endpoint];
      if (endpointValue) {
        handler(endpointValue);
      }
    },
    unsubscribe: <K extends Endpoint>(endpoint: K, handler: (value: T[K]) => void): void => {
      const endpointListeners = listeners[endpoint];
      if (!endpointListeners) return;

      listeners[endpoint] = endpointListeners.filter((h) => h !== handler);
    },
  };
};

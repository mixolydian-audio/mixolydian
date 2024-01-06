export const createProxyStore = <T extends { [key: string]: unknown }>() => {
  type Endpoint = keyof T & string;
  const store = new Map<string, any>();
  const listeners = new Map<string, Array<(value: any) => void>>();

  return {
    has: (endpoint: Endpoint): boolean => store.has(endpoint),
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
    set: <K extends Endpoint>(endpoint: K, value: T[K]) => {
      store.set(endpoint, value);
      listeners.get(endpoint)?.forEach((l) => l(value));
    },
    subscribe: <K extends Endpoint>(
      endpoint: K,
      handler: (value: T[K]) => void
    ): void => {
      if (!listeners.has(endpoint)) {
        listeners.set(endpoint, [handler]);
      } else {
        listeners.get(endpoint)?.push(handler);
      }

      if (store.has(endpoint)) {
        handler(store.get(endpoint));
      }
    },
    unsubscribe: <K extends Endpoint>(
      endpoint: K,
      handler: (value: T[K]) => void
    ): void => {
      if (listeners.has(endpoint)) {
        listeners.set(
          endpoint,
          listeners.get(endpoint)?.filter((h) => h !== handler) || []
        );
      }
    },
  };
};

export const createProxyStore = () => {
  const store = new Map<string, any>();
  const listeners = new Map<string, Array<(value: any) => void>>();

  return {
    has: (endpoint: string): boolean => store.has(endpoint),
    get: (endpoint: string): any => {
      if (!store.has(endpoint)) {
        throw new Error(
          `Parameter ${String(
            endpoint
          )} not found. Make sure you've called createPatch.connect() before calling createPatch.parameters.get().`
        );
      }
      return store.get(endpoint);
    },
    set: (endpoint: string, value: any) => {
      store.set(endpoint, value);
      listeners.get(endpoint)?.forEach((l) => l(value));
    },
    subscribe: (endpoint: string, handler: (value: any) => void): void => {
      if (!listeners.has(endpoint)) {
        listeners.set(endpoint, [handler]);
      } else {
        listeners.get(endpoint)?.push(handler);
      }

      if (store.has(endpoint)) {
        handler(store.get(endpoint));
      }
    },
    unsubscribe: (endpoint: string, handler: (value: any) => void): void => {
      if (listeners.has(endpoint)) {
        listeners.set(
          endpoint,
          listeners.get(endpoint)?.filter((h) => h !== handler) || []
        );
      }
    },
  };
};

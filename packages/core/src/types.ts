export type Parameter<T extends number | boolean> = {
  kind: 'parameter';
  value: T;
};

export type Value<T> = {
  kind: 'value';
  value: T;
};

export type Event<T> = {
  kind: 'event';
  value: T;
};

export type Stream<T> = {
  kind: 'stream';
  value: T;
};

type PatchInput = Parameter<number | boolean> | Value<unknown> | Event<unknown> | Stream<unknown>;

export type PatchInputs = { [key: string]: PatchInput };

export type Endpoints<T extends PatchInputs> = keyof T & string;

export type GetFunction<T extends PatchInputs> = <K extends Endpoints<T>>(endpoint: K) => T[K]['value'];

export type SetFunction<T extends PatchInputs> = <K extends Endpoints<T>>(endpoint: K, value: T[K]['value']) => void;

export type SubscribeFunction<T extends PatchInputs> = <K extends Endpoints<T>>(
  endpoint: K,
  handler: (value: T[K]['value']) => void
) => void;

export type UnsubscribeFunction<T extends PatchInputs> = <K extends Endpoints<T>>(
  endpoint: K,
  handler: (value: T[K]['value']) => void
) => void;

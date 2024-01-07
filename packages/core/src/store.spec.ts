import { assertType, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createStore } from './store';
import exp from 'constants';

type Store = {
  foo: number;
  bar: string;
  foobar: {
    foo: number;
    bar: string;
  };
};

describe('store', () => {
  it('should allow attaching listeners to a key', () => {
    const store = createStore();
    const listener = vi.fn();
    store.subscribe('foo', listener);
    store.set('foo', 1);
    expect(listener).toBeCalledWith(1);
  });
});

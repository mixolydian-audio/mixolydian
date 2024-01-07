import { vi, assertType, describe, expect, expectTypeOf, it } from 'vitest';
import { createProxyStore } from './store';

describe('store types', () => {
  it('should require store keys as endpoint parameters', () => {
    const store = createProxyStore<{
      foo: number;
      bar: string;
      foobar: {
        foo: number;
        bar: string;
      };
    }>();

    expectTypeOf(store.has).parameter(0).toEqualTypeOf<'foo' | 'bar' | 'foobar'>();

    expectTypeOf(store.get).parameter(0).toEqualTypeOf<'foo' | 'bar' | 'foobar'>();

    expectTypeOf(store.set).parameter(0).toEqualTypeOf<'foo' | 'bar' | 'foobar'>();

    expectTypeOf(store.set).parameter(1).toEqualTypeOf<number | string | { foo: number; bar: string }>();
  });

  it('should return the type on get', () => {
    const store = createProxyStore<{ foo: string }>();
    store.set('foo', 'bar');
    const foo = store.get('foo');
    assertType<string>(foo);
  });

  it('should return the type on subscription', () => {
    const store = createProxyStore<{ foo: string }>();
    const listener = vi.fn();
    store.subscribe('foo', listener);
    store.set('foo', 'bar');
    expect(listener).toBeCalledWith('bar');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { createPatch } from './create';
import { EmbeddedPatchConnection, Parameter, createPatch as createPatchCore } from '@mixolydian/core';
import { renderHook } from '@testing-library/react';
import { beforeEach } from 'node:test';

type Patch = {
  frequency: Parameter<number>;
};

vi.mock('@mixolydian/core', () => ({
  createPatch: vi.fn(() => ({
    connect: vi.fn(),
    endpoints: {
      get: vi.fn(),
      set: vi.fn(),
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
    },
  })),
}));

describe('create', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should create a patch', () => {
    const patch = createPatch<Patch>();
    expect(patch.useParameter).toBeDefined();
    expect(patch.connect).toBeDefined();
  });

  it('should connect to a patch', () => {
    const mock = vi.mocked(createPatchCore).mockImplementation( () => ({
      connect: vi.fn(),
      endpoints: {
        get: vi.fn(),
        set: vi.fn(),
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }
    }));

    const patch = createPatch<Patch>();
    patch.connect({} as EmbeddedPatchConnection);
    expect(mock, 'connect').toHaveBeenCalled();
  })

  describe('useParameter', () => {
    it('should return a parameter', () => {
      const getMock = vi.fn(() => 440);
      vi.mocked(createPatchCore).mockImplementation( () => ({
        connect: () => Promise.resolve(),
        endpoints: {
          get: getMock,
          set: vi.fn(),
          subscribe: vi.fn(),
          unsubscribe: vi.fn(),
        }
      }));

      const patch = createPatch<Patch>();   
      patch.connect({} as EmbeddedPatchConnection);

      const { result } = renderHook(() => patch.useParameter('frequency'));
      expect(getMock).toHaveBeenCalled();
      expect(result.current.value).toBeDefined();
      expect(result.current.value).toBe(440);
    });
  });
});

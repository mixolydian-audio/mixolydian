import { describe, it, expect, vi } from 'vitest';
import { createPatch } from './create';
import { EmbeddedPatchConnection, Parameter } from '@mixolydian/core';
import { renderHook } from '@testing-library/react';

type Patch = {
  frequency: Parameter<number>;
};

vi.mock('@mixolydian/core', () => ({
  createPatch: () => ({
    connect: () => {},
    endpoints: {
      get: () => 440,
      set: () => {},
      subscribe: () => {},
      unsubscribe: () => {},
    },
  }),
}));

describe('create', () => {
  it('should create a patch', () => {
    const patch = createPatch<Patch>();
    expect(patch.useParameter).toBeDefined();
    expect(patch.connect).toBeDefined();
  });

  describe('useParameter', () => {
    it('should return a parameter', () => {
      const patch = createPatch<Patch>();
      patch.connect({} as EmbeddedPatchConnection);
      const { result } = renderHook(() => patch.useParameter('frequency'));
      expect(result.current.value).toBeDefined();
      expect(result.current.value).toBe(440);
    });
  });
});

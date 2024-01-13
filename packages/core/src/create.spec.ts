import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createPatch } from './create';
import { mockPatchConnection } from './cmajor/mocks/connection';
import type { Parameter, Value } from './types';

vi.mock('./cmajor/mocks/connection');

type PatchInputs = {
  frequency: Parameter<number>;
  complexSingle: Value<{
    foo: number;
    bar: boolean;
  }>;
};

describe('Patch', () => {
  beforeEach(() => {
    vi.resetAllMocks;
    const listeners: Array<(parameter: { endpointID: string; value: unknown }) => void> = [];
    vi.mocked(mockPatchConnection.addAllParameterListener).mockImplementation((listener) => {
      listeners.push(listener);
    });

    vi.mocked(mockPatchConnection.requestParameterValue).mockImplementation((endpoint) => {
      listeners.forEach((listener) => listener({ endpointID: endpoint, value: 0 }));
    });

    const statusListeners: Array<(status: any) => void> = [];
    vi.mocked(mockPatchConnection.addStatusListener).mockImplementation((listener) => statusListeners.push(listener));

    vi.mocked(mockPatchConnection.requestStatusUpdate).mockImplementation(() =>
      statusListeners.forEach((listener) => listener({ details: { inputs: [{ endpointID: 'frequency' }] } }))
    );

    vi.mocked(mockPatchConnection.sendEventOrValue).mockImplementation((endpoint, value) => {
      setTimeout(() => {
        listeners.forEach((listener) => listener({ endpointID: endpoint, value }));
      }, 10);
    });
  });

  it('should return a patch', () => {
    const patch = createPatch<PatchInputs>();
    expect(patch.endpoints).toBeDefined();
  });

  it('should trigger a listener when a parameter changes', async () => {
    const patch = createPatch<PatchInputs>();

    patch.connect(mockPatchConnection);

    expect(patch.endpoints.get('frequency')).toStrictEqual(0);

    const updateHandler = vi.fn().mockImplementation((value) => {});

    patch.endpoints.subscribe('frequency', updateHandler);

    patch.endpoints.set('frequency', 1);
    await vi.waitFor(() => expect(updateHandler).toBeCalledWith(1));
  });

  it('should return the correct type for a parameter', () => {
    const patch = createPatch<PatchInputs>();
    patch.connect(mockPatchConnection);
    const frequency: number = patch.endpoints.get('frequency');
    expect(frequency).toStrictEqual(0);
  });
});

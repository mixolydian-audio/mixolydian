import { describe, expect, it, vi } from "vitest";
import { createPatch } from "./create";
import { mockPatchConnection } from "./cmajor/mocks/connection";

vi.mock("./cmajor/mocks/connection");

type PatchInputs = {
  frequency: number;
  complexSingle: {
    foo: number;
    bar: boolean;
  };
};

describe("Patch", () => {
  it("should return a patch", () => {
    const patch = createPatch<PatchInputs>();
    expect(patch.parameters).toBeDefined();
  });

  it("should trigger a listener when a parameter changes", async () => {
    const patch = createPatch<PatchInputs>();

    const listeners: Array<
      (parameter: { endpointID: string; value: unknown }) => void
    > = [];
    vi.mocked(mockPatchConnection.addAllParameterListener).mockImplementation(
      (listener) => {
        listeners.push(listener);
      }
    );

    vi.mocked(mockPatchConnection.requestParameterValue).mockImplementation(
      (endpoint) => {
        listeners.forEach((listener) =>
          listener({ endpointID: endpoint, value: 0 })
        );
      }
    );

    const statusListeners: Array<(status: any) => void> = [];
    vi.mocked(mockPatchConnection.addStatusListener).mockImplementation(
      (listener) => statusListeners.push(listener)
    );

    vi.mocked(mockPatchConnection.requestStatusUpdate).mockImplementation(() =>
      statusListeners.forEach((listener) =>
        listener({ details: { inputs: [{ endpointID: "frequency" }] } })
      )
    );

    patch.connect(mockPatchConnection);

    expect(patch.parameters.get("frequency")).toStrictEqual(0);

    vi.mocked(mockPatchConnection.sendEventOrValue).mockImplementation(
      (endpoint, value) => {
        setTimeout(() => {
          listeners.forEach((listener) =>
            listener({ endpointID: endpoint, value })
          );
        }, 10);
      }
    );

    const updateHandler = vi.fn().mockImplementation((value) => {});

    patch.parameters.subscribe("frequency", updateHandler);

    patch.parameters.set("frequency", 1);
    await vi.waitFor(() => expect(updateHandler).toBeCalledWith(1));
  });
});
